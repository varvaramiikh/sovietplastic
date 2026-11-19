import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('register, login, email recovery, reset, session revocation and logout', async () => {
  process.env.NODE_ENV = 'test';
  process.env.SMTP_USER = 'test@example.com'; process.env.SMTP_PASS = 'test-only';
  const dir = mkdtempSync(join(tmpdir(), 'karbolit-auth-')); process.env.AUTH_DATA_DIR = dir;
  const { server, mail } = await import('./server.mjs');
  let sent;
  mail.sendMail = async message => { sent = message; return {}; };
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/auth/`;
  const call = async (path, body, cookie) => { const res = await fetch(url + path, { method: body ? 'POST' : 'GET', headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined }); return { status: res.status, data: await res.json(), cookie: res.headers.get('set-cookie')?.split(';')[0] }; };
  const account = { email: 'person@example.com', password: 'ValidPassword123', login: 'person', name: 'Анна' };
  try {
    assert.equal((await call('login', account)).status, 401);
    const reg = await call('register', account); assert.equal(reg.status, 200); assert.ok(reg.cookie);
    assert.equal(reg.data.user.password, undefined);
    assert.equal((await call('register', account)).status, 409);
    assert.equal((await call('login', { ...account, password: 'WrongPassword' })).status, 401);
    assert.equal((await call('me', undefined, reg.cookie)).status, 200);
    const forgot = await call('forgot', { email: account.email }); assert.equal(forgot.status, 200);
    assert.equal(sent.to, account.email); assert.equal(forgot.data.code, undefined);
    const code = sent.text.match(/\d{6}/)[0];
    assert.equal((await call('forgot', { email: account.email })).status, 429);
    assert.equal((await call('reset', { email: account.email, code: 'invalid', password: 'NewPassword123' })).status, 400);
    assert.equal((await call('reset', { email: account.email, code, password: 'NewPassword123' })).status, 200);
    assert.equal((await call('reset', { email: account.email, code, password: 'NewPassword123' })).status, 400);
    assert.equal((await call('me', undefined, reg.cookie)).status, 401);
    assert.equal((await call('login', account)).status, 401);
    const login = await call('login', { ...account, password: 'NewPassword123' }); assert.equal(login.status, 200);
    assert.equal((await call('logout', {}, login.cookie)).status, 200);
    assert.equal((await call('me', undefined, login.cookie)).status, 401);
    const stored = readFileSync(join(dir, 'users.json'), 'utf8'); assert.ok(!stored.includes('NewPassword123')); assert.ok(!stored.includes('ValidPassword123'));
    const unknown = await call('forgot', { email: 'unknown@example.com' }); assert.equal(unknown.status, 200); assert.deepEqual(unknown.data, forgot.data);
    delete process.env.SMTP_PASS;
    assert.equal((await call('forgot', { email: 'other@example.com' })).status, 503);
  } finally { await new Promise(resolve => server.close(resolve)); rmSync(dir, { recursive: true, force: true }); }
});

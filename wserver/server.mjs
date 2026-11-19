import { createServer } from 'node:http';
import { randomBytes, randomInt, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const dir = process.env.AUTH_DATA_DIR || fileURLToPath(new URL('./data/', import.meta.url));
mkdirSync(dir, { recursive: true });
const dbFile = dir + '/users.json';
const read = () => { try { return JSON.parse(readFileSync(dbFile, 'utf8')); } catch (e) { if(e.code === 'ENOENT') return []; throw e; } };
const save = users => { writeFileSync(dbFile + '.tmp', JSON.stringify(users), { mode: 0o600 }); renameSync(dbFile + '.tmp', dbFile); };
const digest = value => createHash('sha256').update(value).digest('hex');
const hash = password => { const salt = randomBytes(16).toString('hex'); return salt + ':' + scryptSync(password, salt, 64).toString('hex'); };
const verify = (password, stored) => { const [salt, key] = stored.split(':'); return timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(key, 'hex')); };
const publicUser = ({ id, login, name, email }) => ({ id, login, name, email, currency: 'RUB' });
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const sessions = new Map(), codes = new Map(), limits = new Map();
const configured = () => !!(process.env.SMTP_USER && process.env.SMTP_PASS);
export const mail = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.yandex.ru', port: Number(process.env.SMTP_PORT || 465), secure: true, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }, connectionTimeout: 10000, socketTimeout: 15000 });
const cookie = token => `sp_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${process.env.COOKIE_SECURE === 'true' ? '; Secure' : ''}`;
const tokenFrom = req => /(?:^|; )sp_session=([^;]*)/.exec(req.headers.cookie || '')?.[1];
setInterval(() => { const now = Date.now(); for(const map of [sessions, codes, limits]) for(const [key,value] of map) if(value.expires < now) map.delete(key); }, 60000).unref();

export const server = createServer(async (req, res) => {
  const reply = (status, data, headers = {}) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }); res.end(JSON.stringify(data)); };
  try {
    if(req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== process.env.APP_ORIGIN) fail(403, 'Недопустимый источник запроса.');
    const path = req.url?.split('?')[0];
    if(req.method === 'GET' && path === '/api/auth/me') {
      const session = sessions.get(digest(tokenFrom(req) || ''));
      const user = session && session.expires > Date.now() && read().find(u => u.id === session.userId);
      if(!user) fail(401, 'Войдите в аккаунт.');
      return reply(200, { user: publicUser(user) });
    }
    if(req.method !== 'POST') fail(404, 'Адрес не найден.');
    const key = req.socket.remoteAddress;
    const limit = limits.get(key) || { count: 0, expires: Date.now() + 600000 };
    if(limit.expires < Date.now()) { limit.count = 0; limit.expires = Date.now() + 600000; }
    limits.set(key, limit); if(++limit.count > 60) fail(429, 'Слишком много запросов. Попробуйте через 10 минут.');
    let raw = ''; for await (const chunk of req) { raw += chunk; if(Buffer.byteLength(raw) > 16384) fail(413, 'Слишком большой запрос.'); }
    let body; try { body = JSON.parse(raw || '{}'); } catch { fail(400, 'Некорректные данные.'); }
    if(path === '/api/auth/logout') { sessions.delete(digest(tokenFrom(req) || '')); return reply(200, {}, { 'Set-Cookie': 'sp_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' }); }
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    if(!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) fail(400, 'Проверьте электронную почту.');
    const users = read(); let user = users.find(u => u.email === email);
    if(path === '/api/auth/forgot') {
      if(!configured()) fail(503, 'Отправка писем ещё не настроена.');
      const previous = codes.get(email);
      if(previous && Date.now() - previous.created < 60000) fail(429, 'Повторный код можно запросить через минуту.');
      const code = String(randomInt(100000, 1000000));
      const entry = { hash: digest(code), created: Date.now(), expires: Date.now() + 600000, tries: 0 };
      codes.set(email, entry);
      if(user) {
        try { await mail.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: 'Код восстановления — Советский пластик', text: `Код для восстановления пароля: ${code}\nКод действует 10 минут. Если вы не запрашивали восстановление, проигнорируйте письмо.` }); }
        catch { codes.delete(email); fail(502, 'Не удалось отправить письмо. Попробуйте позже.'); }
      }
      return reply(200, { message: 'Если аккаунт с такой почтой существует, код отправлен. Он действует 10 минут.' });
    }
    if(path === '/api/auth/reset') {
      const entry = codes.get(email);
      if(!entry || entry.expires < Date.now() || ++entry.tries > 5 || !user || entry.hash !== digest(String(body.code || ''))) fail(400, 'Код неверен или истёк. Запросите новый код.');
      if(password.length < 8 || password.length > 128) fail(400, 'Пароль должен содержать от 8 до 128 символов.');
      user.password = hash(password); save(users); codes.delete(email);
      for(const [token, session] of sessions) if(session.userId === user.id) sessions.delete(token);
      return reply(200, { message: 'Пароль изменён. Войдите с новым паролем.' });
    }
    if(!['/api/auth/register', '/api/auth/login'].includes(path)) fail(404, 'Адрес не найден.');
    if(password.length < 8 || password.length > 128) fail(400, 'Пароль должен содержать от 8 до 128 символов.');
    if(path.endsWith('/register')) {
      const login = String(body.login || '').trim(), name = String(body.name || '').trim();
      if(!/^[A-Za-z0-9_.-]{3,40}$/.test(login) || !name || name.length > 100) fail(400, 'Укажите имя и логин (3–40 символов, латиница и цифры).');
      if(user || users.some(u => u.login.toLowerCase() === login.toLowerCase())) fail(409, 'Почта или логин уже используются.');
      user = { id: randomBytes(16).toString('hex'), email, login, name, password: hash(password) };
      users.push(user); save(users);
    } else if(!user || !verify(password, user.password)) fail(401, 'Неверная почта или пароль.');
    const token = randomBytes(32).toString('hex'); sessions.set(digest(token), { userId: user.id, expires: Date.now() + 604800000 });
    reply(200, { user: publicUser(user) }, { 'Set-Cookie': cookie(token) });
  } catch(e) { if(!e.status) console.error('Auth request failed:', e.code || 'internal error'); reply(e.status || 500, { message: e.status ? e.message : 'Ошибка сервера. Попробуйте позже.' }); }
});
if(process.env.NODE_ENV !== 'test') server.listen(Number(process.env.AUTH_PORT || 3001), '127.0.0.1', () => console.log('Auth API: http://127.0.0.1:3001'));

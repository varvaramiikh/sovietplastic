export async function authRequest(action: string, body?: Record<string, unknown>) {
  let response: Response;
  try { response = await fetch('/api/auth/' + action, { method: body ? 'POST' : 'GET', credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined }); }
  catch { throw new Error('Сервер недоступен. Запустите npm.cmd run server.'); }
  const data = await response.json().catch(() => ({ message: 'Сервер недоступен. Запустите npm.cmd run server.' }));
  if(!response.ok) throw new Error(data.message || 'Не удалось выполнить запрос.');
  return data;
}
export function cacheUser(user: Record<string, unknown>) {
  const previous = JSON.parse(localStorage.getItem('sp-profile') || '{}');
  if(previous.email !== user.email) {
    localStorage.setItem('sp-want', '{}'); localStorage.setItem('sp-have', '{}');
  }
  localStorage.setItem('sp-profile', JSON.stringify({ ...(previous.email === user.email ? previous : {}), ...user, currency: previous.email === user.email ? previous.currency || 'RUB' : 'RUB' }));
  localStorage.setItem('sp-auth', '1'); localStorage.removeItem('sp-admin');
}
export async function signOut() {
  await authRequest('logout', {});
  localStorage.removeItem('sp-auth'); localStorage.removeItem('sp-admin');
  window.location.assign('/login');
}

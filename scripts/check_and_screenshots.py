"""
Проверка и эталонные скриншоты перенесённого сайта.

Запуск (нужны Python 3 и пакет playwright, браузер Chromium или Google Chrome):
    npm run build && npm run preview          # в одном терминале
    python3 scripts/check_and_screenshots.py  # в другом
Параметры окружения: BASE_URL (по умолчанию http://localhost:4173), CHROME (путь к браузеру, необязательно),
OUT (папка для скриншотов, по умолчанию docs/screenshots).

Что делает: открывает каждый маршрут на трёх ширинах, собирает ошибки консоли, проверяет,
что у страницы нет горизонтальной прокрутки, и снимает скриншоты основных состояний.
"""
import json, os, sys
from playwright.sync_api import sync_playwright

BASE = os.environ.get('BASE_URL', 'http://localhost:4173')
OUT = os.environ.get('OUT', os.path.join(os.path.dirname(__file__), '..', 'docs', 'screenshots'))
CHROME = os.environ.get('CHROME') or ('/usr/bin/google-chrome' if os.path.exists('/usr/bin/google-chrome') else None)
WIDTHS = [(1440, 900), (768, 1024), (390, 844)]
ROUTES = ['/', '/catalog', '/figurine', '/carbolite', '/articles', '/article', '/login', '/account', '/admin', '/_design/site-header', '/_design/site-footer']
SIGNED_IN = {'sp-auth': '1', 'sp-profile': json.dumps({'email': 'admin@karbolit.ru', 'name': 'Мамаа', 'currency': 'RUB'})}

os.makedirs(OUT, exist_ok=True)
report = {'pages': [], 'states': []}

def slug(r):
    return 'main' if r == '/' else r.strip('/').replace('/', '_')

def open_page(browser, w, h, storage=None):
    ctx = browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, locale='ru-RU')
    if storage:
        ctx.add_init_script('(() => { const s = %s; if (!sessionStorage.getItem("__seeded")) { for (const k in s) localStorage.setItem(k, s[k]); sessionStorage.setItem("__seeded", "1"); } })()' % json.dumps(storage))
    page = ctx.new_page()
    errors = []
    page.on('console', lambda m: m.type == 'error' and errors.append(m.text[:300]))
    page.on('pageerror', lambda e: errors.append('uncaught: ' + str(e)[:300]))
    return ctx, page, errors

def overflow(page):
    return page.evaluate('() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })')

with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=CHROME) if CHROME else pw.chromium.launch()
    for r in ROUTES:
        for (w, h) in WIDTHS:
            storage = SIGNED_IN if r in ('/account', '/admin') else None
            ctx, page, errors = open_page(browser, w, h, storage)
            page.goto(BASE + r, wait_until='networkidle')
            page.wait_for_timeout(400)
            o = overflow(page)
            name = f'{slug(r)}_{w}.png'
            page.screenshot(path=os.path.join(OUT, name), full_page=True)
            report['pages'].append({'route': r, 'width': w, 'title': page.title(), 'hscroll': o['sw'] > o['cw'], 'scrollWidth': o['sw'], 'errors': errors})
            ctx.close()

    def state(label, route, actions, storage=None, w=1440, h=900, full=False):
        ctx, page, errors = open_page(browser, w, h, storage)
        page.goto(BASE + route, wait_until='networkidle'); page.wait_for_timeout(300)
        ok = True; note = ''
        try:
            actions(page); page.wait_for_timeout(400)
        except Exception as e:
            ok = False; note = str(e)[:200]
        page.screenshot(path=os.path.join(OUT, f'state_{label}.png'), full_page=full)
        o = overflow(page)
        report['states'].append({'state': label, 'route': route, 'ok': ok, 'note': note, 'hscroll': o['sw'] > o['cw'], 'errors': errors})
        ctx.close()

    # гость нажимает на сердечко -> окно «Войдите в аккаунт»
    state('guest-heart-gate', '/catalog', lambda p: p.locator('button[aria-label="Хочу купить"]').first.click())
    # вошедший пользователь нажимает на сердечко -> окно «Где планирую купить»
    state('signed-heart-plan', '/catalog', lambda p: p.locator('button[aria-label="Хочу купить"]').first.click(), storage=SIGNED_IN)
    # каталог: поиск без результатов
    state('catalog-empty-search', '/catalog', lambda p: p.fill('#cat-search', 'zzzz'))
    # регистрация
    state('login-register', '/login?mode=register', lambda p: None)
    state('login-error', '/login', lambda p: p.locator('a.sp-submit').click())
    # главная: вторая новость в карусели
    state('main-news-2', '/', lambda p: p.locator('button[aria-label="Новость 2"]').click())
    # статуэтка: следующий ракурс
    state('figurine-next-view', '/figurine', lambda p: p.locator('button[aria-label="Следующий ракурс"]').first.click())
    # админка без входа
    state('admin-denied', '/admin?canvasPreview=false', lambda p: None)
    # админка: списки и формы
    def nav(label):
        return lambda p: p.locator('.a-navi', has_text=label).first.click()
    for lbl, key in [('Статуэтки', 'figures'), ('Фотографии', 'photos'), ('Привязка меток', 'bindings'), ('Статьи', 'infos'), ('Типы статуэток', 'kinds'), ('Авторы', 'authors'), ('Метки', 'tags'), ('Пользователи', 'users'), ('Заметки пользователей', 'notes')]:
        state('admin-list-' + key, '/admin', nav(lbl), storage=SIGNED_IN)
    def fig_form(p):
        p.locator('.a-navi', has_text='Статуэтки').first.click(); p.wait_for_timeout(200)
        p.locator('button.a-edit').first.click()
    state('admin-figure-form', '/admin', fig_form, storage=SIGNED_IN)
    def fig_photos(p):
        fig_form(p); p.wait_for_timeout(200); p.locator('.a-tab', has_text='Фотографии').first.click()
    state('admin-figure-photos', '/admin', fig_photos, storage=SIGNED_IN)
    def fig_save_err(p):
        p.locator('button', has_text='+ Добавить статуэтку').first.click(); p.wait_for_timeout(200)
        p.locator('button', has_text='Создать').first.click()
    state('admin-new-figure-errors', '/admin', fig_save_err, storage=SIGNED_IN)
    def row_menu(p):
        p.locator('.a-navi', has_text='Статуэтки').first.click(); p.wait_for_timeout(200)
        p.locator('.a-acts .a-dd-btn').first.click()
    state('admin-row-menu', '/admin', row_menu, storage=SIGNED_IN)
    state('admin-avatar-menu', '/admin', lambda p: p.locator('.a-ava').click(), storage=SIGNED_IN)
    state('admin-mobile', '/admin', lambda p: None, storage=SIGNED_IN, w=390, h=844, full=True)
    browser.close()

json.dump(report, open(os.path.join(OUT, 'report.json'), 'w'), ensure_ascii=False, indent=2)
bad = [x for x in report['pages'] if x['errors'] or x['hscroll']] + [x for x in report['states'] if x['errors'] or not x['ok'] or x['hscroll']]
print(json.dumps(bad, ensure_ascii=False, indent=1)[:6000])
print('pages', len(report['pages']), 'states', len(report['states']), 'problems', len(bad))

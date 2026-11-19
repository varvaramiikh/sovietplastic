# Перечень элементов управления

Собран автоматически из исходной разметки (`original-export/project/*.dc.html`) при экспорте.
Колонки: элемент; подпись (текст, `aria-label`, подсказка в поле или id); ссылка; действие — имя функции из `renderVals()`
(для `onClick` / `onChange`); «показывается, если» — ближайшие условия `<sc-if>`. `{{ … }}` — подстановка из данных.

## Главная `/`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | {{ n.title }} | `{{ n.href }}` |  | `showNews` |
| a | {{ n.cta }} | `{{ n.href }}` |  | `showNews` |
| button | Предыдущая новость |  | `prevNews` | `showNews` |
| button | Следующая новость |  | `nextNews` | `showNews` |
| button | Новость {{ n.num }} |  | `n.pick` | `showNews` |
| a | Смотреть коллекцию | `/catalog` |  | всегда |
| a | Вся коллекция | `/catalog` |  | всегда |
| button | Хочу купить |  | `it.toggleWant` | всегда |
| button | Есть в коллекции |  | `it.toggleHave` | всегда |
| a | {{ it.title }} | `/figurine` | `it.go` | всегда |
| label | Где планирую купить |  |  | `it.planOn` |
| input | Магазин, сайт, барахолка |  | `it.setNote` | `it.planOn` |
| label | Примерная цена{{ it.cur }} |  |  | `it.planOn` |
| input | 0 |  | `it.setPrice` | `it.planOn` |
| a | Подробнее о карболите | `/carbolite` |  | всегда |
| a | Все статьи | `/articles` |  | всегда |
| a | {{ p.title }} | `{{ p.href }}` |  | всегда |
| button | Закрыть окно |  | `gate.close` | `gate.open` |
| button | Закрыть |  | `gate.close` | `gate.open` |
| a | Войти | `/login` |  | `gate.open` |
| a | Зарегистрироваться | `/login` |  | `gate.open` |
| button | Закрыть окно |  | `plan.skip` | `plan.open` |
| button | Закрыть |  | `plan.skip` | `plan.open` |
| label | Где планирую купить |  |  | `plan.open` |
| input | Магазин, сайт, барахолка |  | `plan.setNote` | `plan.open` |
| label | Примерная цена |  |  | `plan.open` |
| input | 0 |  | `plan.setPrice` | `plan.open` |
| button | Сохранить |  | `plan.save` | `plan.open` |
| button | Заполню позже |  | `plan.skip` | `plan.open` |

## Каталог `/catalog`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Главная | `/` |  | всегда |
| button | {{ o.label }}{{ o.count }} |  | `o.toggle` | всегда |
| button | Сбросить фильтры |  | `reset` | `hasFilters` |
| button | Закрыть список |  | `closeSort` | `sortOpen` |
| button | {{ sortLabel }} |  | `toggleSort` | всегда |
| button | {{ so.label }} |  | `so.pick` | `sortOpen` |
| label | Поиск по коллекции |  |  | всегда |
| input | Поиск по названию, категории или тегу |  | `setQ` | всегда |
| button | Хочу купить |  | `it.toggleWant` | всегда |
| button | Есть в коллекции |  | `it.toggleHave` | всегда |
| a | {{ it.title }} | `/figurine` | `it.go` | всегда |
| label | Где планирую купить |  |  | `it.planOn` |
| input | Магазин, сайт, барахолка |  | `it.setNote` | `it.planOn` |
| label | Примерная цена{{ it.cur }} |  |  | `it.planOn` |
| input | 0 |  | `it.setPrice` | `it.planOn` |
| button | Предыдущая страница |  | `prev` | `hasPages` |
| button | {{ p.n }} |  | `p.pick` | `hasPages` |
| button | Следующая страница |  | `next` | `hasPages` |
| button | Закрыть окно |  | `gate.close` | `gate.open` |
| button | Закрыть |  | `gate.close` | `gate.open` |
| a | Войти | `/login` |  | `gate.open` |
| a | Зарегистрироваться | `/login` |  | `gate.open` |
| button | Закрыть окно |  | `plan.skip` | `plan.open` |
| button | Закрыть |  | `plan.skip` | `plan.open` |
| label | Где планирую купить |  |  | `plan.open` |
| input | Магазин, сайт, барахолка |  | `plan.setNote` | `plan.open` |
| label | Примерная цена |  |  | `plan.open` |
| input | 0 |  | `plan.setPrice` | `plan.open` |
| button | Сохранить |  | `plan.save` | `plan.open` |
| button | Заполню позже |  | `plan.skip` | `plan.open` |

## Статуэтка `/figurine`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Главная | `/` |  | всегда |
| a | Коллекция | `/catalog` |  | всегда |
| button | Хочу купить |  | `itemMark.toggleWant` | всегда |
| button | Есть в коллекции |  | `itemMark.toggleHave` | всегда |
| button | Предыдущий ракурс |  | `prevView` | всегда |
| button | Следующий ракурс |  | `nextView` | всегда |
| button | {{ v.label }} |  | `v.pick` | всегда |
| a | {{ tag.label }} | `/catalog` | `tag.go` | всегда |
| button | Изменить |  | `itemPlan.edit` | `itemPlan.on` |
| a | Вся коллекция | `/catalog` |  | всегда |
| button | Хочу купить |  | `it.toggleWant` | всегда |
| button | Есть в коллекции |  | `it.toggleHave` | всегда |
| a | {{ it.title }} | `#top` | `it.go` | всегда |
| label | Где планирую купить |  |  | `it.planOn` |
| input | Магазин, сайт, барахолка |  | `it.setNote` | `it.planOn` |
| label | Примерная цена{{ it.cur }} |  |  | `it.planOn` |
| input | 0 |  | `it.setPrice` | `it.planOn` |
| button | Закрыть окно |  | `closeTags` | `tagsOpen` |
| button | Закрыть |  | `closeTags` | `tagsOpen` |
| a | {{ tag.label }} | `/catalog` | `tag.go` | `tagsOpen` |
| button | Закрыть окно |  | `gate.close` | `gate.open` |
| button | Закрыть |  | `gate.close` | `gate.open` |
| a | Войти | `/login` |  | `gate.open` |
| a | Зарегистрироваться | `/login` |  | `gate.open` |
| button | Закрыть окно |  | `plan.skip` | `plan.open` |
| button | Закрыть |  | `plan.skip` | `plan.open` |
| label | Где планирую купить |  |  | `plan.open` |
| input | Магазин, сайт, барахолка |  | `plan.setNote` | `plan.open` |
| label | Примерная цена |  |  | `plan.open` |
| input | 0 |  | `plan.setPrice` | `plan.open` |
| button | Сохранить |  | `plan.save` | `plan.open` |
| button | Заполню позже |  | `plan.skip` | `plan.open` |

## О карболите `/carbolite`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Главная | `/` |  | всегда |

## Статьи `/articles`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Главная | `/` |  | всегда |
| a | {{ m.title }} {{ m.text }} {{ m.date }} | `/article` |  | всегда |

## Статья `/article`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Главная | `/` |  | всегда |
| a | Статьи | `/articles` |  | всегда |
| a | предметы из коллекции | `/catalog` |  | всегда |
| a | Все статьи | `/articles` |  | всегда |

## Вход и регистрация `/login`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| button | Вход |  | `toLogin` | всегда |
| button | Регистрация |  | `toReg` | всегда |
| label | Логин |  |  | `isReg` |
| input | Латиница и цифры |  | `setLogin` | `isReg` |
| label | Имя |  |  | `isReg` |
| input | Как к вам обращаться |  | `setName` | `isReg` |
| label | Электронная почта |  |  | всегда |
| input | name@example.ru |  | `setEmail` | всегда |
| label | Пароль |  |  | всегда |
| input | {{ passHint }} |  | `setPass` | всегда |
| label | Повторите пароль |  |  | `isReg` |
| input | f-pass2 |  | `setPass2` | `isReg` |
| a | {{ submitLabel }} | `/account` | `submit` | всегда |
| button | {{ switchLink }} |  | `switchMode` | всегда |

## Личный кабинет `/account`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Войти | `/login` |  | `guest` |
| button | Редактировать профиль |  | `openEdit` | `signed` |
| a | Админ-панель | `/admin` | `goAdmin` | `signed › isAdmin` |
| button | Хочу купить{{ budgetText }} {{ wantCount }} |  | `toWant` | `signed` |
| button | Есть в коллекции{{ haveText }} {{ haveCount }} |  | `toHave` | `signed` |
| a | Перейти в коллекцию | `/catalog` |  | `signed › isEmpty` |
| button | Хочу купить |  | `it.toggleWant` | `signed` |
| button | Есть в коллекции |  | `it.toggleHave` | `signed` |
| a | {{ it.title }} | `/figurine` | `it.go` | `signed` |
| label | Где планирую купить |  |  | `signed › it.showNote` |
| input | Магазин, сайт, барахолка |  | `it.setNote` | `signed › it.showNote` |
| label | Примерная цена{{ cur }} |  |  | `signed › it.showNote` |
| input | 0 |  | `it.setPrice` | `signed › it.showNote` |
| button | Закрыть окно |  | `closeEdit` | `editOpen` |
| button | Закрыть |  | `closeEdit` | `editOpen` |
| label | {{ avatarLabel }} |  |  | `editOpen` |
| input | Загрузить аватар |  | `pickAvatar` | `editOpen` |
| button | Удалить фото |  | `dropAvatar` | `editOpen › dHasAvatar` |
| label | Логин |  |  | `editOpen` |
| input | Латиница и цифры |  | `setLogin` | `editOpen` |
| label | Имя |  |  | `editOpen` |
| input | p-name |  | `setName` | `editOpen` |
| label | Электронная почта |  |  | `editOpen` |
| input | p-email |  | `setEmail` | `editOpen` |
| button | {{ c.label }} |  | `c.pick` | `editOpen` |
| label | Новый пароль |  |  | `editOpen` |
| input | Оставьте пустым, чтобы не менять |  | `setPass` | `editOpen` |
| label | Повторите пароль |  |  | `editOpen` |
| input | p-pass2 |  | `setPass2` | `editOpen` |
| button | Сохранить |  | `save` | `editOpen` |
| a | Выйти из аккаунта | `/` | `signOut` | `editOpen` |

## Админ-панель `/admin`

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Войти на сайте | `/login` |  | `denied` |
| a | Личный кабинет | `/account` |  | `denied` |
| button | Закрыть список |  | `ddClose` | `ready › ddOpen` |
| button | КарболитЪАдмин-панель |  | `goHome` | `ready` |
| button | Профиль |  | `me.toggle` | `ready` |
| a | Личный кабинет | `/account` |  | `ready › me.open` |
| a | Открыть сайт | `/` |  | `ready › me.open` |
| button | Выйти |  | `logout` | `ready › me.open` |
| a | Открыть сайт | `/` |  | `ready` |
| button | {{ n.label }}{{ n.count }} |  | `n.go` | `ready › n.item` |
| button | + Добавить статуэтку |  | `dash.addFigure` | `ready › s.dash` |
| button | {{ t.n }}{{ t.l }} |  | `t.go` | `ready › s.dash` |
| button | {{ r.title }} |  | `r.go` | `ready › s.dash` |
| button | Показать |  | `t.go` | `s.dash › t.has` |
| button | Экспорт в Excel |  | `L.export` | `ready › s.list` |
| button | {{ L.addText }} |  | `L.add` | `s.list › L.hasAdd` |
| label | — |  |  | `ready › s.list` |
| input | {{ L.searchHint }} |  | `L.setQ` | `ready › s.list` |
| button | {{ fl.dd.label }} |  | `fl.dd.toggle` | `ready › s.list` |
| input | Поиск в списке |  | `fl.dd.setQ` | `fl.dd.open › fl.dd.searchable` |
| button | {{ o.l }} |  | `o.pick` | `s.list › fl.dd.open` |
| button | Колонки |  | `L.cols.toggle` | `s.list › L.hasCols` |
| label | {{ ci.l }} |  |  | `L.hasCols › L.cols.open` |
| input | — |  | `ci.toggle` | `L.hasCols › L.cols.open` |
| button | Сбросить |  | `L.reset` | `s.list › L.filtered` |
| button | {{ ch.l }} × |  | `ch.remove` | `s.list › L.filtered` |
| button | Сбросить фильтры |  | `L.reset` | `s.list › L.noMatch` |
| button | {{ h.l }} {{ h.ind }} |  | `h.go` | `L.isTable › h.sortable` |
| button | {{ c.t }} |  | `c.go` | `L.isTable › c.isLink` |
| button | {{ c.editText }} |  | `c.edit` | `L.isTable › c.isMenu` |
| button | {{ c.dd.label }} |  | `c.dd.toggle` | `L.isTable › c.isMenu` |
| input | Поиск в списке |  | `c.dd.setQ` | `c.dd.open › c.dd.searchable` |
| button | {{ o.l }} |  | `o.pick` | `c.isMenu › c.dd.open` |
| button | Главное |  | `p.viewer` | `s.list › L.isGrid` |
| button | {{ p.fig }} |  | `p.openFig` | `s.list › L.isGrid` |
| button | Изменить |  | `p.edit` | `s.list › L.isGrid` |
| button | {{ p.dd.label }} |  | `p.dd.toggle` | `s.list › L.isGrid` |
| input | Поиск в списке |  | `p.dd.setQ` | `p.dd.open › p.dd.searchable` |
| button | {{ o.l }} |  | `o.pick` | `L.isGrid › p.dd.open` |
| button | « |  | `L.first` | `s.list › L.has` |
| button | ← |  | `L.prev` | `s.list › L.has` |
| button | {{ pg.n }} |  | `pg.go` | `s.list › L.has` |
| button | → |  | `L.next` | `s.list › L.has` |
| button | » |  | `L.last` | `s.list › L.has` |
| button | {{ L.perDD.label }} |  | `L.perDD.toggle` | `s.list › L.has` |
| input | Поиск в списке |  | `L.perDD.setQ` | `L.perDD.open › L.perDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `L.has › L.perDD.open` |
| button | {{ c.l }} |  | `c.go` | `s.figure › c.link` |
| a | Открыть на сайте ↗ | `{{ F.viewHref }}` | `F.view` | `s.figure › F.hasView` |
| button | Отмена |  | `F.cancel` | `ready › s.figure` |
| button | {{ F.saveText }} |  | `F.save` | `ready › s.figure` |
| button | {{ tb.l }}{{ tb.n }} |  | `tb.go` | `ready › s.figure` |
| label | Название* |  |  | `s.figure › F.t.main` |
| input | f-name |  | `F.set.name` | `s.figure › F.t.main` |
| label | Тип статуэтки* |  |  | `s.figure › F.t.main` |
| button | {{ F.kindDD.label }} |  | `F.kindDD.toggle` | `s.figure › F.t.main` |
| input | Поиск в списке |  | `F.kindDD.setQ` | `F.kindDD.open › F.kindDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `F.t.main › F.kindDD.open` |
| button | + |  | `F.quickKind` | `s.figure › F.t.main` |
| label | Автор |  |  | `s.figure › F.t.main` |
| button | {{ F.authorDD.label }} |  | `F.authorDD.toggle` | `s.figure › F.t.main` |
| input | Поиск в списке |  | `F.authorDD.setQ` | `F.authorDD.open › F.authorDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `F.t.main › F.authorDD.open` |
| button | + |  | `F.quickAuthor` | `s.figure › F.t.main` |
| input | {{ F.q.label }} |  | `F.q.setName` | `F.t.main › F.q.on` |
| button | Добавить |  | `F.q.add` | `F.t.main › F.q.on` |
| button | Отмена |  | `F.q.cancel` | `F.t.main › F.q.on` |
| label | Производитель |  |  | `s.figure › F.t.main` |
| input | Не указан |  | `F.set.factoryName` | `s.figure › F.t.main` |
| label | Высота, см |  |  | `s.figure › F.t.main` |
| input | Не указана |  | `F.set.height` | `s.figure › F.t.main` |
| label | Длина, см |  |  | `s.figure › F.t.main` |
| input | Не указана |  | `F.set.length` | `s.figure › F.t.main` |
| button | {{ tg.l }} × |  | `tg.remove` | `s.figure › F.t.main` |
| button | {{ F.tagDD.label }} |  | `F.tagDD.toggle` | `s.figure › F.t.main` |
| input | Поиск в списке |  | `F.tagDD.setQ` | `F.tagDD.open › F.tagDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `F.t.main › F.tagDD.open` |
| button | + Новая метка |  | `F.quickTag` | `s.figure › F.t.main` |
| label | Показывать на сайте{{ F.visHint }} |  |  | `s.figure › F.t.main` |
| input | — |  | `F.set.visibleBox` | `s.figure › F.t.main` |
| label | Комментарий |  |  | `s.figure › F.t.main` |
| textarea | f-comment |  | `F.set.comment` | `s.figure › F.t.main` |
| label | Добавить фотографииВыберите несколько файлов или перетащите их сюда |  |  | `s.figure › F.t.photos` |
| input | Добавить фотографии |  | `F.addPhotos` | `s.figure › F.t.photos` |
| button | Главное |  | `p.viewer` | `s.figure › F.t.photos` |
| button | ← |  | `p.up` | `s.figure › F.t.photos` |
| button | → |  | `p.down` | `s.figure › F.t.photos` |
| button | {{ p.dd.label }} |  | `p.dd.toggle` | `s.figure › F.t.photos` |
| button | {{ o.l }} |  | `o.pick` | `F.t.photos › p.dd.open` |
| label | Выбрать файл |  |  | `F.t.photos › F.hasReplace` |
| input | Файл для замены |  | `F.replaceFile` | `F.t.photos › F.hasReplace` |
| button | Отмена |  | `F.cancelReplace` | `F.t.photos › F.hasReplace` |
| label | Источник |  |  | `s.figure › F.t.links` |
| input | Название или описание источника |  | `F.set.sourceText` | `s.figure › F.t.links` |
| label | Ссылка на источник |  |  | `s.figure › F.t.links` |
| input | https:// |  | `F.set.sourceUrl` | `s.figure › F.t.links` |
| a | Открыть ссылку ↗ | `{{ F.d.sourceUrl }}` |  | `F.t.links › F.urlOk` |
| label | Оригинал (OriginalID) |  |  | `s.figure › F.t.links` |
| button | {{ F.origDD.label }} |  | `F.origDD.toggle` | `s.figure › F.t.links` |
| input | Поиск в списке |  | `F.origDD.setQ` | `F.origDD.open › F.origDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `F.t.links › F.origDD.open` |
| button | {{ v.l }} |  | `v.go` | `s.figure › F.t.links` |
| button | + Добавить заметку |  | `F.addNote` | `s.figure › F.t.notes` |
| button | {{ nt.dd.label }} |  | `nt.dd.toggle` | `s.figure › F.t.notes` |
| input | Поиск в списке |  | `nt.dd.setQ` | `nt.dd.open › nt.dd.searchable` |
| button | {{ o.l }} |  | `o.pick` | `F.t.notes › nt.dd.open` |
| label | final — старое свойство записи. Назначение уточняется. |  |  | `s.figure › F.t.svc` |
| input | — |  | `F.set.finalBox` | `s.figure › F.t.svc` |
| button | Удалить статуэтку |  | `F.del` | `F.t.svc › F.canDelete` |
| button | {{ c.l }} |  | `c.go` | `s.info › c.link` |
| a | Открыть на сайте ↗ | `{{ F.viewHref }}` | `F.view` | `s.info › F.hasView` |
| button | Отмена |  | `F.cancel` | `ready › s.info` |
| button | {{ F.saveText }} |  | `F.save` | `ready › s.info` |
| button | Редактор |  | `F.toEdit` | `ready › s.info` |
| button | Предпросмотр |  | `F.toPrev` | `ready › s.info` |
| label | Название* |  |  | `s.info › F.editing` |
| input | i-name |  | `F.set.name` | `s.info › F.editing` |
| label | Дата материала* |  |  | `s.info › F.editing` |
| input | i-date |  | `F.set.infoDate` | `s.info › F.editing` |
| label | Основной текст |  |  | `s.info › F.editing` |
| button | Заголовок |  | `F.fmt.h` | `s.info › F.editing` |
| button | Жирный |  | `F.fmt.b` | `s.info › F.editing` |
| button | Курсив |  | `F.fmt.i` | `s.info › F.editing` |
| button | Список |  | `F.fmt.ul` | `s.info › F.editing` |
| button | Цитата |  | `F.fmt.q` | `s.info › F.editing` |
| button | Ссылка |  | `F.fmt.a` | `s.info › F.editing` |
| textarea | a-body |  | `F.set.text` | `s.info › F.editing` |
| label | Источник |  |  | `s.info › F.editing` |
| input | i-st |  | `F.set.sourceText` | `s.info › F.editing` |
| label | Ссылка на источник |  |  | `s.info › F.editing` |
| input | https:// |  | `F.set.sourceUrl` | `s.info › F.editing` |
| button | Удалить статью |  | `F.del` | `F.editing › F.canDelete` |
| a | {{ g.t }} | `{{ g.href }}` |  | `b.p › g.isLink` |
| a | {{ F.sourceLabel }} | `{{ F.d.sourceUrl }}` |  | `F.preview › F.hasSource` |
| button | {{ c.l }} |  | `c.go` | `s.dict › c.link` |
| a | Открыть на сайте ↗ | `{{ F.viewHref }}` | `F.view` | `s.dict › F.hasView` |
| button | Отмена |  | `F.cancel` | `ready › s.dict` |
| button | {{ F.saveText }} |  | `F.save` | `ready › s.dict` |
| label | {{ F.nameLabel }}* |  |  | `ready › s.dict` |
| input | d-name |  | `F.set.name` | `ready › s.dict` |
| label | Показывать на сайтеСкрытый тип убирает с сайта и все статуэтки этого типа. |  |  | `s.dict › F.isKind` |
| input | — |  | `F.set.visibleBox` | `s.dict › F.isKind` |
| label | Текст об авторе |  |  | `s.dict › F.isAuthor` |
| textarea | d-text |  | `F.set.text` | `s.dict › F.isAuthor` |
| label | Источник |  |  | `s.dict › F.isAuthor` |
| input | d-st |  | `F.set.sourceText` | `s.dict › F.isAuthor` |
| label | Ссылка на источник |  |  | `s.dict › F.isAuthor` |
| input | https:// |  | `F.set.sourceUrl` | `s.dict › F.isAuthor` |
| button | {{ v.l }} |  | `v.go` | `s.dict › F.showLinked` |
| button | Показать все в списке статуэток |  | `F.allLinked` | `F.showLinked › F.moreLinked` |
| button | {{ F.delText }} |  | `F.del` | `s.dict › F.canDelete` |
| button | {{ c.l }} |  | `c.go` | `s.user › c.link` |
| a | Открыть на сайте ↗ | `{{ F.viewHref }}` | `F.view` | `s.user › F.hasView` |
| button | Отмена |  | `F.cancel` | `ready › s.user` |
| button | {{ F.saveText }} |  | `F.save` | `ready › s.user` |
| label | Логин* |  |  | `ready › s.user` |
| input | u-login |  | `F.set.login` | `ready › s.user` |
| label | Имя |  |  | `ready › s.user` |
| input | u-name |  | `F.set.name` | `ready › s.user` |
| label | Электронная почта* |  |  | `ready › s.user` |
| input | u-email |  | `F.set.email` | `ready › s.user` |
| label | Валюта по умолчанию |  |  | `ready › s.user` |
| button | {{ F.curDD.label }} |  | `F.curDD.toggle` | `ready › s.user` |
| input | Поиск в списке |  | `F.curDD.setQ` | `F.curDD.open › F.curDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `s.user › F.curDD.open` |
| label | Новый пароль |  |  | `ready › s.user` |
| input | u-p1 |  | `F.set.p1` | `ready › s.user` |
| label | Повторите пароль |  |  | `ready › s.user` |
| input | u-p2 |  | `F.set.p2` | `ready › s.user` |
| label | Доступ к админ-панели (isAdmin){{ F.adminHint }} |  |  | `ready › s.user` |
| input | — |  | `F.set.adminBox` | `ready › s.user` |
| button | Открыть в «Заметках пользователей» |  | `F.openNotes` | `F.showNotes › F.hasNotes` |
| button | Удалить пользователя |  | `F.del` | `s.user › F.canDelete` |
| button | Закрыть окно |  | `M.cancel` | `ready › M.open` |
| label | Пользователь* |  |  | `M.open › M.isNote` |
| button | {{ M.userDD.label }} |  | `M.userDD.toggle` | `M.open › M.isNote` |
| input | Поиск в списке |  | `M.userDD.setQ` | `M.userDD.open › M.userDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `M.isNote › M.userDD.open` |
| label | Статуэтка* |  |  | `M.open › M.isNote` |
| button | {{ M.figDD.label }} |  | `M.figDD.toggle` | `M.open › M.isNote` |
| input | Поиск в списке |  | `M.figDD.setQ` | `M.figDD.open › M.figDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `M.isNote › M.figDD.open` |
| label | Enable — назначение уточняется |  |  | `M.open › M.isNote` |
| input | — |  | `M.set.enableBox` | `M.open › M.isNote` |
| label | Комментарий 1 |  |  | `M.open › M.isNote` |
| textarea | m-c1 |  | `M.set.comment1` | `M.open › M.isNote` |
| label | Комментарий 2 |  |  | `M.open › M.isNote` |
| textarea | m-c2 |  | `M.set.comment2` | `M.open › M.isNote` |
| label | Комментарий 3 |  |  | `M.open › M.isNote` |
| textarea | m-c3 |  | `M.set.comment3` | `M.open › M.isNote` |
| label | Цена |  |  | `M.open › M.isNote` |
| input | Цена неизвестна |  | `M.set.price` | `M.open › M.isNote` |
| label | Валюта |  |  | `M.open › M.isNote` |
| button | {{ M.curDD.label }} |  | `M.curDD.toggle` | `M.open › M.isNote` |
| input | Поиск в списке |  | `M.curDD.setQ` | `M.curDD.open › M.curDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `M.isNote › M.curDD.open` |
| label | {{ M.fileLabel }} |  |  | `M.open › M.isPhoto` |
| input | Выбрать файл |  | `M.pickFile` | `M.open › M.isPhoto` |
| label | Статуэтка* |  |  | `M.open › M.isPhoto` |
| button | {{ M.figDD.label }} |  | `M.figDD.toggle` | `M.open › M.isPhoto` |
| button | {{ o.l }} |  | `o.pick` | `M.isPhoto › M.figDD.open` |
| label | Главное фото — у статуэтки будет только одно главное фото |  |  | `M.open › M.isPhoto` |
| input | — |  | `M.set.mainBox` | `M.open › M.isPhoto` |
| label | Статуэтка* |  |  | `M.open › M.isBind` |
| button | {{ M.figDD.label }} |  | `M.figDD.toggle` | `M.open › M.isBind` |
| button | {{ o.l }} |  | `o.pick` | `M.isBind › M.figDD.open` |
| button | {{ tg.l }} × |  | `tg.remove` | `M.open › M.isBind` |
| button | {{ M.tagDD.label }} |  | `M.tagDD.toggle` | `M.open › M.isBind` |
| input | Поиск в списке |  | `M.tagDD.setQ` | `M.tagDD.open › M.tagDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `M.isBind › M.tagDD.open` |
| button | Отмена |  | `M.cancel` | `ready › M.open` |
| button | {{ M.saveText }} |  | `M.save` | `ready › M.open` |
| button | Закрыть просмотр |  | `V.close` | `ready › V.open` |
| button | Закрыть |  | `V.close` | `ready › V.open` |
| button | Закрыть окно |  | `confirm.no` | `confirm.open` |
| label | {{ confirm.replLabel }} |  |  | `confirm.hasLinked › confirm.hasRepl` |
| button | {{ confirm.replDD.label }} |  | `confirm.replDD.toggle` | `confirm.hasLinked › confirm.hasRepl` |
| input | Поиск в списке |  | `confirm.replDD.setQ` | `confirm.replDD.open › confirm.replDD.searchable` |
| button | {{ o.l }} |  | `o.pick` | `confirm.hasRepl › confirm.replDD.open` |
| button | {{ confirm.noText }} |  | `confirm.no` | `confirm.open` |
| button | {{ confirm.altText }} |  | `confirm.alt` | `confirm.open › confirm.hasAlt` |
| button | {{ confirm.yesText }} |  | `confirm.yes` | `confirm.open › confirm.hasYes` |

## Шапка (компонент)

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Советский пластик | `/` |  | всегда |
| a | {{ link.label }} | `{{ link.href }}` |  | всегда |
| a | Войти | `/login` |  | `signedOut` |
| button | Профиль |  | `toggleMenu` | `signedIn` |
| a | Личный кабинет | `/account` |  | `signedIn › menuOpen` |
| button | Выйти |  | `signOut` | `signedIn › menuOpen` |

## Подвал (компонент)

| Элемент | Подпись | Ссылка | Действие | Показывается, если |
|---|---|---|---|---|
| a | Советский пластик | `/` |  | всегда |
| a | Коллекция | `/catalog` |  | всегда |
| a | Статьи | `/articles` |  | всегда |

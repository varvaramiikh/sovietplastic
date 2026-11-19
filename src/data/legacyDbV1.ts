/* Сгенерировано из original-export/project/Login.dc.html (spHash, spSeed, spReadDb) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
/** Старая демонстрационная база v1, которую создаёт страница входа, если базы ещё нет. Админка переводит её в v2 при первом открытии. */
export function spHash(s) {
  var h = 5381;
  s = String(s || '');
  for (var i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return 'h' + (h >>> 0).toString(36);
}

export function seedLegacyDbV1() {
  var now = Date.now(),
    day = 86400000;
  var iso = function (t) {
    return new Date(t).toISOString();
  };
  var TAGS = [
    'Фигурное катание',
    'Спорт',
    'Балет',
    'Детство',
    'Зима',
    'Цирк',
    'Танец',
    'Музыка',
    'Женский образ',
    'Пионеры',
  ];
  var KINDS = ['Статуэтка', 'Шкатулка', 'Животные', 'Бюст', 'Пепельница', 'Чернильный прибор'];
  var IMG = ['/images/placeholder-ballerina.svg', '/images/placeholder-boxer.svg', '/images/placeholder-skater.svg'];
  var titles = [
    'Название статуэтки',
    'Название статуэтки средней длины',
    'Длинное название статуэтки, которое переносится на несколько строк без многоточия',
  ];
  var db = { v: 1, seq: 1000, users: [], categories: [], tags: [], authors: [], figurines: [], articles: [] };
  KINDS.forEach(function (k, i) {
    db.categories.push({ id: 'c' + (i + 1), name: k, order: i + 1, visible: true });
  });
  TAGS.forEach(function (t, i) {
    db.tags.push({ id: 't' + (i + 1), name: t });
  });
  [1, 2, 3].forEach(function (n) {
    db.authors.push({ id: 'a' + n, name: 'Автор ' + n, bio: '', sourceName: '', sourceUrl: '' });
  });
  for (var i = 0; i < 24; i++) {
    var idx = [
      i % 10,
      (i * 3 + 1) % 10,
      (i * 7 + 4) % 10,
      (i * 9 + 2) % 10,
      (i + 5) % 10,
      (i * 3 + 6) % 10,
      (i + 3) % 10,
      (i * 7 + 8) % 10,
      (i + 1) % 10,
      (i + 7) % 10,
    ];
    var want = (i % 5) + 4,
      seen = {},
      tags = [];
    for (var k = 0; k < idx.length && tags.length < want; k++) {
      var t = idx[k];
      if (seen[t]) continue;
      seen[t] = 1;
      tags.push({ t: t, w: ((i * 37 + k * 53 + t * 11) % 85) + 15 });
    }
    tags.sort(function (a, b) {
      return b.w - a.w;
    });
    var made = now - (40 - i) * day;
    db.figurines.push({
      id: i + 1,
      title: titles[i % 3],
      categoryId: 'c' + ([0, 0, 1, 2, 0, 3, 0, 4, 2, 0, 5, 1][i % 12] + 1),
      authorId: i % 4 === 1 ? 'a' + ((i % 3) + 1) : '',
      factory: i % 3 === 0 ? 'Фабрика ' + ((i % 2) + 1) : '',
      height: { value: i % 2 === 0 ? String(12 + (i % 9)) : '', unit: 'см' },
      length: { value: i % 4 === 0 ? String(6 + (i % 5)) : '', unit: 'см' },
      description: '',
      comment: '',
      sourceName: '',
      sourceUrl: '',
      tagIds: tags.map(function (x) {
        return 't' + (x.t + 1);
      }),
      photos: [{ id: 'p' + (i + 1), src: IMG[i % 3], caption: '', source: '', name: 'Заглушка' }],
      mainPhotoId: 'p' + (i + 1),
      variantIds: [],
      status: 'published',
      createdAt: iso(made),
      updatedAt: iso(made + day),
      updatedBy: 'Мамаа',
    });
  }
  var arts = [
    ['Название статьи', 'Краткое описание: о чём статья и зачем её читать.'],
    ['Название статьи средней длины', 'Краткое описание в одно-два предложения.'],
    [
      'Длинное название статьи, которое занимает две строки в списке статей',
      'Краткое описание: о чём статья и зачем её читать.',
    ],
    ['Название статьи', 'Краткое описание в одно-два предложения.'],
    ['Название статьи средней длины', 'Краткое описание: о чём статья и зачем её читать.'],
  ];
  arts.forEach(function (a, n) {
    var d = now - (n * 9 + 2) * day;
    db.articles.push({
      id: 'r' + (n + 1),
      title: a[0],
      summary: a[1],
      body: '## Заголовок раздела\nАбзац основного текста. **Важная мысль** выделяется жирным.\n\n- Первый пункт\n- Второй пункт',
      images: [],
      date: iso(d).slice(0, 10),
      sourceName: '',
      sourceUrl: '',
      status: 'published',
      createdAt: iso(d),
      updatedAt: iso(d),
      updatedBy: 'Мамаа',
    });
  });
  db.users.push({
    id: 'u1',
    name: 'Мамаа',
    email: 'admin@karbolit.ru',
    role: 'admin',
    isAdmin: true,
    status: 'active',
    pass: spHash('karbolit'),
    createdAt: iso(now - 60 * day),
  });
  db.users.push({
    id: 'u2',
    name: 'Анна',
    email: 'anna@example.ru',
    role: 'user',
    isAdmin: false,
    status: 'active',
    pass: spHash('anna123'),
    createdAt: iso(now - 12 * day),
  });
  db.users.push({
    id: 'u3',
    name: 'Павел',
    email: 'pavel@example.ru',
    role: 'user',
    isAdmin: false,
    status: 'blocked',
    pass: spHash('pavel123'),
    createdAt: iso(now - 5 * day),
  });
  return db;
}

export function readOrSeedLegacyDb() {
  var db = null;
  try {
    db = JSON.parse(window.localStorage.getItem('sp-db') || 'null');
  } catch (e) {
    db = null;
  }
  if (!db || (!db.figurines && !db.figures)) {
    db = seedLegacyDbV1();
    try {
      window.localStorage.setItem('sp-db', JSON.stringify(db));
    } catch (e) {}
  }
  return db;
}

/* Сгенерировано из original-export/project/Admin.dc.html (spHash, spSeed, spMigrate, spReadDb) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
/** Демонстрационная база v2 (схема из karbolit-admin-structure.md): заполнение, перевод из v1, чтение из localStorage "sp-db". Только для демо-режима без сервера. */
export function spHash(s) {
  var h = 5381;
  s = String(s || '');
  for (var i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return 'h' + (h >>> 0).toString(36);
}

export function seedDemoDb() {
  var now = Date.now(),
    day = 86400000,
    who = 'Мамаа';
  var iso = function (t) {
    return new Date(t).toISOString();
  };
  var svc = function (t) {
    return { createDate: iso(t), createdBy: who, modifyDate: iso(t + day), modifiedBy: who };
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
  var t0 = now - 90 * day;
  var db = {
    v: 2,
    seq: 1000,
    figures: [],
    photos: [],
    figureTags: [],
    infos: [],
    kinds: [],
    authors: [],
    tags: [],
    users: [],
    userNotes: [],
  };
  KINDS.forEach(function (k, i) {
    db.kinds.push(Object.assign({ id: i + 1, name: k, visible: true }, svc(t0)));
  });
  TAGS.forEach(function (t, i) {
    db.tags.push(Object.assign({ id: i + 1, tagText: t }, svc(t0)));
  });
  [1, 2, 3].forEach(function (n) {
    db.authors.push(Object.assign({ id: n, name: 'Автор ' + n, text: '', sourceText: '', sourceUrl: '' }, svc(t0)));
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
    var made = now - (40 - i) * day,
      id = i + 1;
    db.photos.push(
      Object.assign(
        {
          id: id,
          figureId: id,
          isMain: true,
          picture: IMG[i % 3],
          pictureCompressed: IMG[i % 3],
          sort: 1,
          fileName: 'Заглушка',
        },
        svc(made),
      ),
    );
    db.figures.push(
      Object.assign(
        {
          id: id,
          name: titles[i % 3],
          kindId: [0, 0, 1, 2, 0, 3, 0, 4, 2, 0, 5, 1][i % 12] + 1,
          authorId: i % 4 === 1 ? (i % 3) + 1 : null,
          factoryName: i % 3 === 0 ? 'Фабрика ' + ((i % 2) + 1) : '',
          height: i % 2 === 0 ? 12 + (i % 9) : null,
          length: i % 4 === 0 ? 6 + (i % 5) : null,
          visible: true,
          sourceText: '',
          sourceUrl: '',
          final: false,
          comment: '',
          originalId: null,
          pictureMainId: id,
        },
        svc(made),
      ),
    );
    tags.forEach(function (x) {
      db.figureTags.push({ figureId: id, tagId: x.t + 1 });
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
    db.infos.push(
      Object.assign(
        {
          id: n + 1,
          infoDate: iso(d).slice(0, 10),
          name: a[0],
          text:
            a[1] +
            '\n\n## Заголовок раздела\nАбзац основного текста. **Важная мысль** выделяется жирным.\n\n- Первый пункт\n- Второй пункт',
          sourceText: '',
          sourceUrl: '',
        },
        svc(d),
      ),
    );
  });
  db.users.push(
    Object.assign(
      {
        id: 1,
        login: 'mamaa',
        name: 'Мамаа',
        email: 'admin@karbolit.ru',
        defaultCurrency: 'RUB',
        isAdmin: true,
        pass: spHash('karbolit'),
      },
      svc(now - 60 * day),
    ),
  );
  db.users.push(
    Object.assign(
      {
        id: 2,
        login: 'anna',
        name: 'Анна',
        email: 'anna@example.ru',
        defaultCurrency: 'RUB',
        isAdmin: false,
        pass: spHash('anna123'),
      },
      svc(now - 12 * day),
    ),
  );
  db.userNotes.push(
    Object.assign(
      {
        id: 1,
        userId: 2,
        figureId: 3,
        enable: true,
        comment1: 'Видела на барахолке',
        comment2: '',
        comment3: '',
        price: 3500,
        currency: 'RUB',
      },
      svc(now - 3 * day),
    ),
  );
  return db;
}

export function migrateV1ToV2(o) {
  var who = 'Мамаа',
    now = new Date().toISOString();
  var db = {
    v: 2,
    seq: o.seq || 1000,
    figures: [],
    photos: [],
    figureTags: [],
    infos: [],
    kinds: [],
    authors: [],
    tags: [],
    users: [],
    userNotes: [],
  };
  var map = { c: {}, a: {}, t: {}, u: {} },
    n = 0;
  var svc = function (x) {
    return {
      createDate: x.createdAt || now,
      createdBy: x.updatedBy || who,
      modifyDate: x.updatedAt || x.createdAt || now,
      modifiedBy: x.updatedBy || who,
    };
  };
  (o.categories || []).forEach(function (c, i) {
    map.c[c.id] = i + 1;
    db.kinds.push(Object.assign({ id: i + 1, name: c.name, visible: c.visible !== false }, svc({})));
  });
  (o.authors || []).forEach(function (a, i) {
    map.a[a.id] = i + 1;
    db.authors.push(
      Object.assign(
        { id: i + 1, name: a.name, text: a.bio || '', sourceText: a.sourceName || '', sourceUrl: a.sourceUrl || '' },
        svc({}),
      ),
    );
  });
  (o.tags || []).forEach(function (t, i) {
    map.t[t.id] = i + 1;
    db.tags.push(Object.assign({ id: i + 1, tagText: t.name }, svc({})));
  });
  var num = function (v) {
    var x = parseFloat(String(v == null ? '' : v).replace(',', '.'));
    return isFinite(x) && x > 0 ? x : null;
  };
  (o.figurines || []).forEach(function (f) {
    var mainId = null;
    (f.photos || []).forEach(function (p, k) {
      n++;
      var pid = n;
      if (p.id === f.mainPhotoId || (!f.mainPhotoId && k === 0)) mainId = pid;
      db.photos.push(
        Object.assign(
          {
            id: pid,
            figureId: f.id,
            isMain: false,
            picture: p.src,
            pictureCompressed: p.src,
            sort: k + 1,
            fileName: p.name || '',
          },
          svc(f),
        ),
      );
    });
    db.photos.forEach(function (p) {
      if (p.id === mainId) p.isMain = true;
    });
    db.figures.push(
      Object.assign(
        {
          id: f.id,
          name: f.title,
          kindId: map.c[f.categoryId] || null,
          authorId: map.a[f.authorId] || null,
          factoryName: f.factory || '',
          height: num(f.height && f.height.value),
          length: num(f.length && f.length.value),
          visible: f.status === 'published',
          sourceText: f.sourceName || '',
          sourceUrl: f.sourceUrl || '',
          final: false,
          comment: [f.description, f.comment].filter(Boolean).join('\n\n'),
          originalId: null,
          pictureMainId: mainId,
        },
        svc(f),
      ),
    );
    (f.tagIds || []).forEach(function (t) {
      if (map.t[t]) db.figureTags.push({ figureId: f.id, tagId: map.t[t] });
    });
  });
  (o.articles || []).forEach(function (a, i) {
    db.infos.push(
      Object.assign(
        {
          id: i + 1,
          infoDate: a.date || now.slice(0, 10),
          name: a.title,
          text: [a.summary, a.body].filter(Boolean).join('\n\n'),
          sourceText: a.sourceName || '',
          sourceUrl: a.sourceUrl || '',
        },
        svc(a),
      ),
    );
  });
  (o.users || []).forEach(function (u, i) {
    map.u[u.id] = i + 1;
    db.users.push(
      Object.assign(
        {
          id: i + 1,
          login: u.login || String(u.email || '').split('@')[0],
          name: u.name || '',
          email: u.email || '',
          defaultCurrency: 'RUB',
          isAdmin: !!u.isAdmin,
          pass: u.pass || '',
          status: u.status === 'blocked' ? 'blocked' : undefined,
        },
        svc(u),
      ),
    );
  });
  db.seq = Math.max(db.seq, n + 1000);
  return db;
}

export function readDemoDb() {
  var db = null;
  try {
    db = JSON.parse(window.localStorage.getItem('sp-db') || 'null');
  } catch (e) {
    db = null;
  }
  if (db && db.v === 2 && db.figures) return db;
  db = db && db.figurines ? migrateV1ToV2(db) : seedDemoDb();
  try {
    window.localStorage.setItem('sp-db', JSON.stringify(db));
  } catch (e) {}
  return db;
}

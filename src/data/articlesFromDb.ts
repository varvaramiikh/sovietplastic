/* Сгенерировано из original-export/project/Materials.dc.html (spArticles) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
/** Статьи из демонстрационной базы (db.infos в v2, db.articles в v1). null — базы нет, показываются демонстрационные карточки. */
export function readArticlesFromDb() {
  var db = null;
  try {
    db = JSON.parse(window.localStorage.getItem('sp-db') || 'null');
  } catch (e) {
    db = null;
  }
  var m = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  var fd = function (s) {
    var p = String(s || '')
      .slice(0, 10)
      .split('-');
    return p.length === 3 ? parseInt(p[2], 10) + ' ' + m[parseInt(p[1], 10) - 1] + ' ' + p[0] : '';
  };
  if (db && db.v === 2 && db.infos) {
    var first = function (t) {
      var ps = String(t || '')
        .split(/\n\s*\n/)
        .map(function (x) {
          return x.trim();
        })
        .filter(function (x) {
          return x && !/^(#|-|>)/.test(x);
        });
      return (ps[0] || '')
        .replace(/\*\*|__|\*|_/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .slice(0, 220);
    };
    return db.infos
      .slice()
      .sort(function (a, b) {
        return (a.infoDate || '') < (b.infoDate || '') ? 1 : -1;
      })
      .map(function (a, n) {
        return {
          type: '',
          title: a.name,
          text: first(a.text),
          date: fd(a.infoDate),
          cover: '',
          bg: n % 2 ? '#C9D5E5' : '#DBE2EA',
          h: '82%',
          mb: '-6px',
        };
      });
  }
  if (!db || !db.articles) return null;
  return db.articles
    .filter(function (a) {
      return a.status === 'published';
    })
    .sort(function (a, b) {
      return (a.date || '') < (b.date || '') ? 1 : -1;
    })
    .map(function (a, n) {
      return {
        type: '',
        title: a.title,
        text: a.summary || '',
        date: fd(a.date),
        cover: a.images && a.images[0] ? a.images[0].src : '',
        bg: n % 2 ? '#C9D5E5' : '#DBE2EA',
        h: '82%',
        mb: '-6px',
      };
    });
}

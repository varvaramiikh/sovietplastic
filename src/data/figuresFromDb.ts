/* Сгенерировано из original-export/project/Main.dc.html (метод spFromDb, одинаковый на страницах Main, Catalog, Figurine, Account) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
/**
 * Читает статуэтки из демонстрационной базы в localStorage (ключ "sp-db"), схемы v2 (админка) и v1 (старая).
 * Возвращает null, если базы нет — тогда страница показывает свои демонстрационные карточки.
 * Здесь будет вызов API, когда появится сервер.
 */
export function readFiguresFromDb() {
  var db = null;
  try {
    db = JSON.parse(window.localStorage.getItem('sp-db') || 'null');
  } catch (e) {
    db = null;
  }
  if (db && db.v === 2 && db.figures) {
    var fx = function (arr, id) {
      for (var i = 0; i < (arr || []).length; i++) if (String(arr[i].id) === String(id)) return arr[i];
      return null;
    };
    var dm = function (n) {
      return n == null || n === '' ? '' : String(n).replace('.', ',') + ' см';
    };
    return db.figures
      .filter(function (f) {
        var k = fx(db.kinds, f.kindId);
        return f.visible && (!k || k.visible !== false);
      })
      .map(function (f) {
        var k = fx(db.kinds, f.kindId),
          a = fx(db.authors, f.authorId);
        var tags = (db.figureTags || [])
          .filter(function (b) {
            return String(b.figureId) === String(f.id);
          })
          .map(function (b, i) {
            var x = fx(db.tags, b.tagId);
            return x ? { label: x.tagText, weight: 100 - i } : null;
          })
          .filter(Boolean);
        var ph = (db.photos || [])
          .filter(function (p) {
            return String(p.figureId) === String(f.id);
          })
          .sort(function (x, y) {
            return (y.isMain ? 1 : 0) - (x.isMain ? 1 : 0) || (x.sort || 0) - (y.sort || 0);
          });
        var main = fx(ph, f.pictureMainId) || ph[0];
        return {
          id: f.id,
          title: f.name,
          category: k ? k.name : '',
          kind: k ? k.name : '',
          author: a ? a.name : '',
          factory: f.factoryName || '',
          height: dm(f.height),
          length: dm(f.length),
          tags: tags,
          mainTag: tags[0] ? tags[0].label : '',
          added: (f.createDate || '').slice(0, 10),
          scale: 76,
          img: main ? main.picture || main.pictureCompressed : '/images/placeholder-ballerina.svg',
          meta: '',
        };
      });
  }
  if (!db || !db.figurines) return null;
  var by = function (arr, id) {
    for (var i = 0; i < (arr || []).length; i++) if (arr[i].id === id) return arr[i];
    return null;
  };
  var dim = function (d) {
    return d && d.value !== '' && d.value != null ? String(d.value).replace('.', ',') + ' ' + (d.unit || 'см') : '';
  };
  return db.figurines
    .filter(function (f) {
      var c = by(db.categories, f.categoryId);
      return f.status === 'published' && (!c || c.visible !== false);
    })
    .map(function (f) {
      var c = by(db.categories, f.categoryId),
        a = by(db.authors, f.authorId);
      var tags = (f.tagIds || [])
        .map(function (t, i) {
          var x = by(db.tags, t);
          return x ? { label: x.name, weight: 100 - i } : null;
        })
        .filter(Boolean);
      var ph =
        (f.photos || []).filter(function (p) {
          return p.id === f.mainPhotoId;
        })[0] || (f.photos || [])[0];
      return {
        id: f.id,
        title: f.title,
        category: c ? c.name : '',
        kind: c ? c.name : '',
        author: a ? a.name : '',
        factory: f.factory || '',
        height: dim(f.height),
        length: dim(f.length),
        tags: tags,
        mainTag: tags[0] ? tags[0].label : '',
        added: (f.createdAt || '').slice(0, 10),
        scale: 76,
        img: ph ? ph.src : '/images/placeholder-ballerina.svg',
        meta: '',
      };
    });
}

/* Сгенерировано из original-export/project/Catalog.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { WishlistLogic } from '../../features/wishlist/WishlistLogic';
import { readFiguresFromDb } from '../../data/figuresFromDb';
import { demoCatalogFigures } from '../../data/demo/demoCatalogFigures';

export default class CatalogLogic extends WishlistLogic {
  constructor(props) {
    super(props);
    this.state = { q: '', sel: { kind: {}, tag: {} }, sort: 'default', page: 1 };
  }
  componentDidMount() {
    this.spInit();
    try {
      var v = window.localStorage.getItem('sp-tag');
      if (v) {
        var t = {};
        t[v] = true;
        this.setState({ sel: { kind: {}, tag: t }, page: 1 });
        window.localStorage.removeItem('sp-tag');
      }
    } catch (e) {}
  }
  spFromDb() {
    return readFiguresFromDb();
  }
  spItems() {
    var fromDb = this.spFromDb();
    if (fromDb) return fromDb;
    return demoCatalogFigures();
  }
  plural(n, forms) {
    var a = n % 100,
      b = n % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b === 1) return forms[0];
    if (b >= 2 && b <= 4) return forms[1];
    return forms[2];
  }
  renderVals() {
    var self = this,
      st = this.state;
    var all = this.spItems();
    var valuesOf = function (it, key) {
      return key === 'tag'
        ? it.tags.map(function (t) {
            return t.label;
          })
        : [it.kind];
    };
    var q = st.q.trim().toLowerCase();
    var filtered = all.filter(function (it) {
      var keysF = ['kind', 'tag'];
      for (var f = 0; f < keysF.length; f++) {
        var s = st.sel[keysF[f]];
        var keys = Object.keys(s).filter(function (x) {
          return s[x];
        });
        if (keys.length) {
          var vals = valuesOf(it, keysF[f]);
          if (
            !vals.some(function (x) {
              return keys.indexOf(x) >= 0;
            })
          )
            return false;
        }
      }
      if (q) {
        var hay = (
          it.title +
          ' ' +
          it.kind +
          ' ' +
          it.tags
            .map(function (t) {
              return t.label;
            })
            .join(' ')
        ).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    if (st.sort === 'title')
      filtered.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : a.id - b.id;
      });
    if (st.sort === 'added')
      filtered.sort(function (a, b) {
        return a.added < b.added ? 1 : a.added > b.added ? -1 : a.id - b.id;
      });
    var size = 12;
    var pageCount = Math.max(1, Math.ceil(filtered.length / size));
    var page = Math.min(st.page, pageCount);
    var setSel = function (field, value, on) {
      var next = { kind: Object.assign({}, st.sel.kind), tag: Object.assign({}, st.sel.tag) };
      next[field][value] = on;
      self.setState({ sel: next, page: 1 });
    };
    var optsFor = function (key, order, limit, open) {
      var counts = {};
      all.forEach(function (it) {
        valuesOf(it, key).forEach(function (v) {
          counts[v] = (counts[v] || 0) + 1;
        });
      });
      var list = Object.keys(counts);
      list.sort(function (a, b) {
        return a.localeCompare(b, 'ru');
      });
      var total = list.length;
      var res = list.map(function (v) {
        var on = !!st.sel[key][v];
        return {
          label: v,
          count: counts[v],
          cls: on ? 'sp-chip-on' : '',
          pressed: on ? 'true' : 'false',
          toggle: function () {
            setSel(key, v, !on);
          },
        };
      });
      res.total = total;
      return res;
    };
    var kinds = optsFor(
      'kind',
      ['Статуэтка', 'Шкатулка', 'Животные', 'Бюст', 'Пепельница', 'Чернильный прибор'],
      4,
      !!st.kindsOpen,
    );
    var tagOpts = optsFor(
      'tag',
      [
        'Фигурное катание',
        'Балет',
        'Спорт',
        'Танец',
        'Цирк',
        'Музыка',
        'Детство',
        'Пионеры',
        'Женский образ',
        'Животные',
      ],
      6,
      !!st.tagsOpen,
    );
    var anySel = ['kind', 'tag'].some(function (k) {
      return Object.keys(st.sel[k]).some(function (v) {
        return st.sel[k][v];
      });
    });
    var pageItems = filtered.slice((page - 1) * size, page * size).map(function (it) {
      return Object.assign(
        {},
        it,
        {
          go: function () {
            self.spStore('sp-item', it.id);
          },
          mainTag: it.tags[0] ? it.tags[0].label : '',
        },
        self.spMark(it),
      );
    });
    var pages = [];
    for (var p = 1; p <= pageCount; p++) {
      (function (n) {
        pages.push({
          n: n,
          cls: n === page ? 'sp-page-on' : '',
          current: n === page ? 'page' : 'false',
          pick: function () {
            self.setState({ page: n });
          },
        });
      })(p);
    }
    var SORTS = [
      ['default', 'По порядку'],
      ['added', 'По дате добавления'],
      ['title', 'По названию'],
    ];
    return {
      q: st.q,
      setQ: function (e) {
        self.setState({ q: e.target.value, page: 1 });
      },
      sortOpen: !!st.sortOpen,
      sortExpanded: st.sortOpen ? 'true' : 'false',
      sortArrow: st.sortOpen ? 'rotate(180deg)' : 'none',
      toggleSort: function () {
        self.setState({ sortOpen: !st.sortOpen });
      },
      closeSort: function () {
        self.setState({ sortOpen: false });
      },
      sortLabel: SORTS.filter(function (o) {
        return o[0] === st.sort;
      })[0][1],
      sortOptions: SORTS.map(function (o) {
        var on = st.sort === o[0];
        return {
          label: o[1],
          on: on,
          selected: on ? 'true' : 'false',
          cls: on ? 'sp-opt-on' : '',
          pick: function () {
            self.setState({ sort: o[0], page: 1, sortOpen: false });
          },
        };
      }),
      kinds: kinds,
      tagOpts: tagOpts,
      hasFilters: anySel || !!q,
      reset: function () {
        self.setState({ q: '', sel: { kind: {}, tag: {} }, page: 1 });
      },
      foundText: filtered.length + ' ' + this.plural(filtered.length, ['предмет', 'предмета', 'предметов']),
      isEmpty: filtered.length === 0,
      plan: this.spPlan(),
      gate: this.spGate(),
      pageItems: pageItems,
      pages: pages,
      hasPages: pageCount > 1,
      noPrev: page <= 1,
      noNext: page >= pageCount,
      prev: function () {
        self.setState({ page: Math.max(1, page - 1) });
      },
      next: function () {
        self.setState({ page: Math.min(pageCount, page + 1) });
      },
    };
  }
}

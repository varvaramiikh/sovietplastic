/* Сгенерировано из original-export/project/Figurine.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { WishlistLogic } from '../../features/wishlist/WishlistLogic';
import { readFiguresFromDb } from '../../data/figuresFromDb';
import { demoFigurineFigures } from '../../data/demo/demoFigurineFigures';

export default class FigurineLogic extends WishlistLogic {
  constructor(props) {
    super(props);
    this.state = { id: 2, view: 0, tagsOpen: false, seed: Math.floor(Math.random() * 200) + 1 };
  }
  componentDidMount() {
    this.spInit();
    try {
      var v = parseInt(window.localStorage.getItem('sp-item'), 10);
      if (v >= 1) this.setState({ id: v });
    } catch (e) {}
  }
  spFromDb() {
    return readFiguresFromDb();
  }
  spItems() {
    var fromDb = this.spFromDb();
    if (fromDb) return fromDb;
    return demoFigurineFigures();
  }
  tagCls(w) {
    return w >= 70 ? 'sp-tag-hi' : w >= 40 ? 'sp-tag-mid' : 'sp-tag-lo';
  }
  renderVals() {
    var self = this,
      st = this.state;
    var all = this.spItems();
    var item =
      all.filter(function (x) {
        return x.id === st.id;
      })[0] || all[0];
    var VIEWS = [
      { label: 'Главный ракурс — предмет целиком', h: '84%', mt: '0px' },
      { label: 'Вид сбоку', h: '74%', mt: '0px' },
      { label: 'Верхняя часть крупно', h: '170%', mt: '60%' },
      { label: 'Основание и клеймо', h: '190%', mt: '-95%' },
      { label: 'Общий вид в витрине', h: '58%', mt: '0px' },
    ];
    var vi = st.view % VIEWS.length;
    var mkTags = function (tags) {
      return tags.map(function (t) {
        return Object.assign({}, t, {
          cls: self.tagCls(t.weight),
          go: function () {
            self.spStore('sp-tag', t.label);
          },
        });
      });
    };
    var seed = (st.seed || 1) * 1000 + item.id;
    var rnd = function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    var mine = item.tags.map(function (t) {
      return t.label;
    });
    var pool = all.filter(function (o) {
      return o.id !== item.id;
    });
    for (var s1 = pool.length - 1; s1 > 0; s1--) {
      var r1 = Math.floor(rnd() * (s1 + 1));
      var tmp = pool[s1];
      pool[s1] = pool[r1];
      pool[r1] = tmp;
    }
    var shared = function (o) {
      return o.tags.some(function (t) {
        return mine.indexOf(t.label) >= 0;
      });
    };
    var picked = pool
      .filter(shared)
      .concat(
        pool.filter(function (o) {
          return !shared(o);
        }),
      )
      .slice(0, 4);
    var others = [];
    for (var j = 0; j < picked.length; j++) {
      var o = picked[j];
      (function (o) {
        others.push(
          Object.assign(
            {},
            o,
            {
              mainTag: o.tags[0] ? o.tags[0].label : '',
              year: '[год]',
              tags: mkTags(o.tags),
              go: function () {
                self.spStore('sp-item', o.id);
                self.setState({ id: o.id, view: 0, tagsOpen: false });
              },
            },
            self.spMark(o),
          ),
        );
      })(o);
    }
    var specList = [
      { k: 'Категория', v: item.category },
      { k: 'Высота', v: item.height },
      { k: 'Длина', v: item.length },
      { k: 'Фабрика', v: item.factory },
      { k: 'Автор', v: item.author },
    ].filter(function (s) {
      return !!s.v;
    });
    return {
      item: item,
      plan: this.spPlan(),
      gate: this.spGate(),
      itemPlan: (function () {
        var w = self.state.spAuth ? self.state.want || {} : {};
        var on = Object.prototype.hasOwnProperty.call(w, item.id);
        var e = self.spEntry(w[item.id]);
        return {
          on: on,
          note: e.note || 'Не указано',
          price: e.price ? Number(e.price).toLocaleString('ru-RU') + ' ' + self.spCurSign() : 'Не указана',
          edit: function () {
            self.spEditPlan(item.id, item.title);
          },
        };
      })(),
      itemMark: self.spMark(item),
      specs: specList,
      tags: mkTags(item.tags),
      shownTags: mkTags(item.tags.slice(0, 6)),
      hasMoreTags: item.tags.length > 6,
      tagCount: item.tags.length,
      tagsOpen: st.tagsOpen,
      openTags: function () {
        self.setState({ tagsOpen: true });
      },
      closeTags: function () {
        self.setState({ tagsOpen: false });
      },
      view: VIEWS[vi],
      viewAlt: item.title + ': ' + VIEWS[vi].label.toLowerCase(),
      viewLabel: VIEWS[vi].label,
      viewNo: vi + 1,
      viewCount: VIEWS.length,
      views: VIEWS.map(function (v, n) {
        return Object.assign({}, v, {
          img: item.img,
          cls: n === vi ? 'sp-thumb-on' : '',
          pick: function () {
            self.setState({ view: n });
          },
        });
      }),
      prevView: function () {
        self.setState({ view: (vi + VIEWS.length - 1) % VIEWS.length });
      },
      nextView: function () {
        self.setState({ view: (vi + 1) % VIEWS.length });
      },
      others: others,
    };
  }
}

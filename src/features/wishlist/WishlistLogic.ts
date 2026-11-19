/* Сгенерировано из original-export/project/Main.dc.html, Catalog.dc.html, Figurine.dc.html (одинаковые методы) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { DCLogic } from '../../runtime/DCLogic';

/**
 * Общая логика «Хочу купить» / «Есть в коллекции» для карточек статуэток.
 * Данные хранятся в localStorage: sp-want, sp-have, sp-profile, sp-auth.
 */
export class WishlistLogic extends DCLogic {
  spInit() {
    var self = this;
    this.spLoad();
    this._spSync = function () {
      self.spLoad();
    };
    try {
      window.addEventListener('storage', this._spSync);
      window.addEventListener('focus', this._spSync);
    } catch (e) {}
  }
  spLoad() {
    var g = function (k) {
      try {
        return JSON.parse(window.localStorage.getItem(k) || '{}') || {};
      } catch (e) {
        return {};
      }
    };
    var pr = g('sp-profile');
    var auth = false;
    try {
      auth = window.localStorage.getItem('sp-auth') === '1';
    } catch (e) {}
    this.setState({ want: g('sp-want'), have: g('sp-have'), spCur: pr.currency || 'RUB', spAuth: auth });
  }
  spToggle(kind, id, title) {
    if (!this.state.spAuth) {
      this.setState({ gate: kind, plan: null });
      return;
    }
    var cur = Object.assign({}, this.state[kind] || {});
    var had = Object.prototype.hasOwnProperty.call(cur, id);
    if (had) delete cur[id];
    else cur[id] = kind === 'want' ? { note: '', price: '' } : true;
    try {
      window.localStorage.setItem(kind === 'want' ? 'sp-want' : 'sp-have', JSON.stringify(cur));
    } catch (e) {}
    var s = {};
    s[kind] = cur;
    if (kind === 'want' && !had) s.plan = { id: id, title: title || '', note: '', price: '' };
    this.setState(s);
  }
  spEntry(v) {
    return v && typeof v === 'object'
      ? { note: v.note || '', price: v.price || '' }
      : { note: typeof v === 'string' ? v : '', price: '' };
  }
  spEditPlan(id, title) {
    var e = this.spEntry((this.state.want || {})[id]);
    this.setState({ plan: { id: id, title: title || '', note: e.note, price: e.price } });
  }
  spSetWant(id, patch) {
    var w = Object.assign({}, this.state.want || {});
    w[id] = Object.assign(this.spEntry(w[id]), patch);
    try {
      window.localStorage.setItem('sp-want', JSON.stringify(w));
    } catch (e) {}
    this.setState({ want: w });
  }
  spCurSign() {
    return { RUB: '₽', USD: '$', EUR: '€' }[this.state.spCur] || '₽';
  }
  spGate() {
    var self = this,
      g = this.state.gate;
    return {
      open: !!g,
      text:
        g === 'have'
          ? 'Чтобы отмечать статуэтки в «Есть в коллекции», войдите в аккаунт или зарегистрируйтесь.'
          : 'Чтобы добавлять статуэтки в «Хочу купить», войдите в аккаунт или зарегистрируйтесь.',
      close: function () {
        self.setState({ gate: null });
      },
    };
  }
  spPlan() {
    var self = this,
      p = this.state.plan;
    var upd = function (k, v) {
      var q = Object.assign({}, self.state.plan);
      q[k] = v;
      self.setState({ plan: q });
    };
    return {
      open: !!p,
      title: p ? p.title : '',
      note: p ? p.note : '',
      price: p ? p.price : '',
      cur: this.spCurSign(),
      setNote: function (e) {
        upd('note', e.target.value);
      },
      setPrice: function (e) {
        upd(
          'price',
          String(e.target.value || '')
            .replace(/[^0-9]/g, '')
            .slice(0, 9),
        );
      },
      save: function () {
        var q = self.state.plan;
        if (!q) return;
        var w = Object.assign({}, self.state.want || {});
        w[q.id] = { note: q.note, price: q.price };
        try {
          window.localStorage.setItem('sp-want', JSON.stringify(w));
        } catch (e) {}
        self.setState({ want: w, plan: null });
      },
      skip: function () {
        self.setState({ plan: null });
      },
    };
  }
  spMark(it) {
    var self = this,
      au = !!this.state.spAuth,
      w = au ? this.state.want || {} : {},
      h = au ? this.state.have || {} : {};
    var wo = Object.prototype.hasOwnProperty.call(w, it.id),
      ho = !!h[it.id];
    return {
      wantCls: wo ? 'sp-on' : '',
      wantPressed: wo ? 'true' : 'false',
      haveCls: ho ? 'sp-on' : '',
      havePressed: ho ? 'true' : 'false',
      toggleWant: function () {
        self.spToggle('want', it.id, it.title);
      },
      toggleHave: function () {
        self.spToggle('have', it.id);
      },
      planOn: wo,
      note: self.spEntry(w[it.id]).note,
      price: self.spEntry(w[it.id]).price,
      cur: self.spCurSign(),
      setNote: function (e) {
        self.spSetWant(it.id, { note: e.target.value });
      },
      setPrice: function (e) {
        self.spSetWant(it.id, {
          price: String(e.target.value || '')
            .replace(/[^0-9]/g, '')
            .slice(0, 9),
        });
      },
    };
  }
  spStore(key, val) {
    try {
      window.localStorage.setItem(key, String(val));
    } catch (e) {}
  }
}

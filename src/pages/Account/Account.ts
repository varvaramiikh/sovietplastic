/* Сгенерировано из original-export/project/Account.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { signOut as serverSignOut } from '../../features/auth/auth';
import { DCLogic } from '../../runtime/DCLogic';
import { readFiguresFromDb } from '../../data/figuresFromDb';
import { demoAccountFigures } from '../../data/demo/demoAccountFigures';

export default class AccountLogic extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      prof: {},
      want: {},
      have: {},
      tab: 'want',
      edit: null,
      draft: {},
      pass: '',
      pass2: '',
      error: '',
      toast: '',
    };
  }
  componentDidMount() {
    var self = this;
    this.spLoad();
    this._sync = function () {
      self.spLoad();
    };
    try {
      window.addEventListener('storage', this._sync);
    } catch (e) {}
  }
  componentWillUnmount() {
    try {
      window.removeEventListener('storage', this._sync);
    } catch (e) {}
    if (this._t) clearTimeout(this._t);
  }
  spGet(k) {
    try {
      return JSON.parse(window.localStorage.getItem(k) || '{}') || {};
    } catch (e) {
      return {};
    }
  }
  spLoad() {
    var auth = null;
    try {
      auth = window.localStorage.getItem('sp-auth') === '1' ? true : null;
    } catch (e) {}
    var want = this.spGet('sp-want'),
      have = this.spGet('sp-have');
    var demo = true;
    try {
      demo = window.localStorage.getItem('sp-want') === null && window.localStorage.getItem('sp-have') === null;
    } catch (e) {}
    if (demo) {
      want = {
        3: { note: 'Барахолка на Удельной', price: '3500' },
        8: { note: '', price: '' },
        14: { note: 'Авито, продавец из Твери', price: '5200' },
      };
      have = { 1: true, 5: true, 11: true, 20: true };
    }
    var prof = this.spGet('sp-profile'),
      adminId = '';
    try {
      var sdb = JSON.parse(window.localStorage.getItem('sp-db') || 'null');
      var em = String(prof.email || '').toLowerCase();
      var au =
        sdb && sdb.users
          ? sdb.users.filter(function (u) {
              return em && String(u.email).toLowerCase() === em && u.isAdmin && u.status !== 'blocked';
            })[0]
          : null;
      if (au && auth) adminId = au.id;
    } catch (e) {}
    this.setState({ auth: auth, prof: prof, want: want, have: have, adminId: adminId });
  }
  spSave(k, v) {
    try {
      window.localStorage.setItem(k, JSON.stringify(v));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  }
  spFromDb() {
    return readFiguresFromDb();
  }
  spItems() {
    var fromDb = this.spFromDb();
    if (fromDb) return fromDb;
    return demoAccountFigures();
  }
  wantEntry(v) {
    return v && typeof v === 'object'
      ? { note: v.note || '', price: v.price || '' }
      : { note: typeof v === 'string' ? v : '', price: '' };
  }
  setWant(id, patch) {
    var w = Object.assign({}, this.state.want);
    w[id] = Object.assign(this.wantEntry(w[id]), patch);
    this.spSave('sp-want', w);
    this.setState({ want: w });
  }
  spToggle(kind, id) {
    var cur = Object.assign({}, this.state[kind]);
    if (Object.prototype.hasOwnProperty.call(cur, id)) delete cur[id];
    else cur[id] = kind === 'want' ? { note: '', price: '' } : true;
    var s = {};
    s[kind] = cur;
    this.spSave('sp-want', kind === 'want' ? cur : this.state.want);
    this.spSave('sp-have', kind === 'have' ? cur : this.state.have);
    this.setState(s);
  }
  flash(text) {
    var self = this;
    if (this._t) clearTimeout(this._t);
    this.setState({ toast: text });
    this._t = setTimeout(function () {
      self.setState({ toast: '' });
    }, 2600);
  }
  pickAvatar(e) {
    var self = this;
    var f = e && e.target && e.target.files && e.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var img = new Image();
      img.onload = function () {
        var size = 240,
          c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        var s = Math.min(img.width, img.height);
        c.getContext('2d').drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        self.setState({ draft: Object.assign({}, self.state.draft, { avatar: c.toDataURL('image/jpeg', 0.85) }) });
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  }
  renderVals() {
    var self = this,
      st = this.state;
    var signed = st.auth === null ? !!this.props.signedIn : st.auth;
    var p = st.prof || {};
    var name = p.name || p.firstName || '';
    var login = p.login || (p.email ? p.email.split('@')[0] : '');
    var CUR = { RUB: '₽', USD: '$', EUR: '€' };
    var curCode = p.currency || 'RUB';
    var cur = CUR[curCode] || '₽';
    var editOpen = st.edit === null ? !!this.props.editOpen : st.edit;
    var d = Object.assign(
      { login: login, name: name, email: p.email || '', currency: curCode, avatar: p.avatar || '' },
      st.draft,
    );
    var setD = function (k) {
      return function (e) {
        var x = Object.assign({}, self.state.draft);
        x[k] = e.target.value;
        self.setState({ draft: x, error: '' });
      };
    };
    var all = this.spItems();
    var has = function (o, id) {
      return Object.prototype.hasOwnProperty.call(o, id);
    };
    var wantList = all.filter(function (it) {
      return has(st.want, it.id);
    });
    var haveList = all.filter(function (it) {
      return !!st.have[it.id];
    });
    var budget = wantList.reduce(function (s, it) {
      var v = parseFloat(self.wantEntry(st.want[it.id]).price);
      return s + (isFinite(v) ? v : 0);
    }, 0);
    var isWant = st.tab === 'want';
    var shown = (isWant ? wantList : haveList).map(function (it) {
      var w = has(st.want, it.id),
        h = !!st.have[it.id],
        we = self.wantEntry(st.want[it.id]);
      return Object.assign({}, it, {
        wantCls: w ? 'sp-on' : '',
        wantPressed: w ? 'true' : 'false',
        haveCls: h ? 'sp-on' : '',
        havePressed: h ? 'true' : 'false',
        toggleWant: function () {
          self.spToggle('want', it.id);
        },
        toggleHave: function () {
          self.spToggle('have', it.id);
        },
        go: function () {
          try {
            window.localStorage.setItem('sp-item', String(it.id));
          } catch (e) {}
        },
        showNote: isWant,
        note: we.note,
        price: we.price,
        setNote: function (e) {
          self.setWant(it.id, { note: e.target.value });
        },
        setPrice: function (e) {
          self.setWant(it.id, {
            price: String(e.target.value || '')
              .replace(/[^0-9]/g, '')
              .slice(0, 9),
          });
        },
      });
    });
    var plural = function (n, f) {
      var a = n % 100,
        b = n % 10;
      if (a > 10 && a < 20) return f[2];
      if (b === 1) return f[0];
      if (b >= 2 && b <= 4) return f[1];
      return f[2];
    };
    return {
      signed: signed,
      guest: !signed,
      isAdmin: !!st.adminId,
      goAdmin: function () {
        try {
          window.localStorage.setItem('sp-admin', st.adminId);
        } catch (e) {}
      },
      greeting: name ? 'Здравствуйте, ' + name : 'Личный кабинет',
      displayName: name || 'Без имени',
      displayLogin: login ? '@' + login : p.email || 'Логин не указан',
      avatar: p.avatar || '',
      hasAvatar: !!p.avatar,
      noAvatar: !p.avatar,
      openEdit: function () {
        self.setState({ edit: true, draft: {}, pass: '', pass2: '', error: '' });
      },
      closeEdit: function () {
        self.setState({ edit: false, draft: {}, pass: '', pass2: '', error: '' });
      },
      editOpen: editOpen,
      draft: d,
      setLogin: setD('login'),
      setName: setD('name'),
      setEmail: setD('email'),
      currencies: [
        ['RUB', '₽ Рубль'],
        ['USD', '$ Доллар'],
        ['EUR', '€ Евро'],
      ].map(function (c) {
        var on = d.currency === c[0];
        return {
          label: c[1],
          cls: on ? 'sp-chip-on' : '',
          checked: on ? 'true' : 'false',
          pick: function () {
            self.setState({ draft: Object.assign({}, self.state.draft, { currency: c[0] }) });
          },
        };
      }),
      dAvatar: d.avatar,
      dHasAvatar: !!d.avatar,
      dNoAvatar: !d.avatar,
      avatarLabel: d.avatar ? 'Заменить фото' : 'Загрузить фото',
      pickAvatar: function (e) {
        self.pickAvatar(e);
      },
      dropAvatar: function () {
        self.setState({ draft: Object.assign({}, self.state.draft, { avatar: '' }) });
      },
      pass: st.pass,
      pass2: st.pass2,
      setPass: function (e) {
        self.setState({ pass: e.target.value, error: '' });
      },
      setPass2: function (e) {
        self.setState({ pass2: e.target.value, error: '' });
      },
      hasError: !!st.error,
      error: st.error,
      save: function () {
        var err = '';
        if (d.login && !/^[A-Za-z0-9_.-]{3,}$/.test(d.login))
          err = 'Логин: не меньше 3 символов, латиница, цифры, точка, дефис или подчёркивание.';
        else if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) err = 'Проверьте адрес электронной почты.';
        else if (st.pass) err = 'Для смены пароля используйте «Забыли пароль?» на странице входа.';
        else if (st.pass !== st.pass2) err = 'Пароли не совпадают.';
        if (err) {
          self.setState({ error: err });
          return;
        }
        var np = Object.assign({}, self.state.prof, {
          login: d.login,
          name: d.name,
          email: d.email,
          currency: d.currency,
          avatar: d.avatar,
        });
        if (!np.avatar) delete np.avatar;
        delete np.firstName;
        self.spSave('sp-profile', np);
        self.setState({ prof: np, edit: false, draft: {}, pass: '', pass2: '' });
        self.flash(st.pass ? 'Профиль и пароль обновлены' : 'Профиль обновлён');
      },
      signOut: function () { serverSignOut().catch(() => alert('Не удалось выйти. Проверьте сервер и повторите.')); },
      toast: !!st.toast,
      toastText: st.toast,
      cur: cur,
      wantTabCls: isWant ? 'sp-stat-on' : '',
      haveTabCls: isWant ? '' : 'sp-stat-on',
      wantSel: isWant ? 'true' : 'false',
      haveSel: isWant ? 'false' : 'true',
      toWant: function () {
        self.setState({ tab: 'want' });
      },
      toHave: function () {
        self.setState({ tab: 'have' });
      },
      wantCount: wantList.length,
      haveCount: haveList.length,
      budgetText:
        budget > 0 ? 'Примерный бюджет: ' + budget.toLocaleString('ru-RU') + ' ' + cur : 'Укажите цены, чтобы посчитать примерный бюджет',
      haveText: haveList.length
        ? haveList.length + ' ' + plural(haveList.length, ['предмет', 'предмета', 'предметов']) + ' на ваших полках'
        : 'Отмечайте галочкой то, что уже есть',
      shown: shown,
      isEmpty: shown.length === 0,
      emptyTitle: isWant ? 'Здесь пока пусто' : 'Коллекция пока пуста',
      emptyText: isWant
        ? 'Нажмите на сердечко на карточке статуэтки, чтобы добавить её в «Хочу купить».'
        : 'Нажмите на галочку на карточке статуэтки, чтобы отметить, что она уже есть у вас.',
    };
  }
}

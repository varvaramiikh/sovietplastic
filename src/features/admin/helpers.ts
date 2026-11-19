/* Сгенерировано из original-export/project/Admin.dc.html (часть класса Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { DCLogic } from '../../runtime/DCLogic';

/** Сессия, общие помощники, выпадающие списки, загрузка фото, выгрузка CSV, справочные функции. */
export class AdminHelpers extends DCLogic {
  boot() {
    var db,
      sid = null;
    try {
      db = this.spReadDb();
    } catch (e) {
      this.setState({
        loadErr: 'Хранилище браузера недоступно. Разрешите сайту сохранять данные и обновите страницу.',
      });
      return;
    }
    var prof = {},
      auth = false;
    try {
      sid = window.localStorage.getItem('sp-admin');
      prof = JSON.parse(window.localStorage.getItem('sp-profile') || '{}') || {};
      auth = window.localStorage.getItem('sp-auth') === '1';
    } catch (e) {}
    var me =
      (db.users || []).filter(function (u) {
        return String(u.id) === String(sid);
      })[0] || null;
    if (!me && auth && prof.email) {
      var em = String(prof.email).toLowerCase();
      me =
        (db.users || []).filter(function (u) {
          return String(u.email || '').toLowerCase() === em;
        })[0] || null;
      if (me) sid = me.id;
    }
    var ok = me && me.isAdmin && me.status !== 'blocked',
      denied = '',
      preview = false;
    if (!ok) {
      if (this.props.canvasPreview && !sid) {
        me =
          (db.users || []).filter(function (u) {
            return u.isAdmin;
          })[0] || null;
        preview = !!me;
      }
      if (!preview) {
        if (!me) denied = 'Войдите на сайте под учётной записью администратора и откройте панель из личного кабинета.';
        else if (me.status === 'blocked') denied = 'Аккаунт «' + me.email + '» заблокирован.';
        else
          denied =
            'У аккаунта «' +
            me.email +
            '» нет прав администратора. Панель открыта только пользователям с отметкой isAdmin.';
        me = null;
      }
    }
    this.setState({ db: db, me: me, preview: preview, denied: denied, loadErr: '', avatar: prof.avatar || '' });
  }
  isDirty() {
    var f = this.state.form;
    return !!(f && JSON.stringify(f.d) !== f.orig);
  }
  nowIso() {
    return new Date().toISOString();
  }
  fmt(iso, t) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
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
    var s = d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
    if (t) s += ', ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    return s;
  }
  num(v) {
    return v == null || v === '' ? '' : String(v).replace('.', ',');
  }
  plural(n, f) {
    var a = n % 100,
      b = n % 10;
    if (a > 10 && a < 20) return f[2];
    if (b === 1) return f[0];
    if (b >= 2 && b <= 4) return f[1];
    return f[2];
  }
  norm(s) {
    return String(s || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }
  clone(x) {
    return JSON.parse(JSON.stringify(x));
  }
  find(arr, id) {
    for (var i = 0; i < (arr || []).length; i++) if (String(arr[i].id) === String(id)) return arr[i];
    return null;
  }
  nextId(arr) {
    return (
      (arr || []).reduce(function (m, x) {
        return Math.max(m, Number(x.id) || 0);
      }, 0) + 1
    );
  }
  stamp(rec, isNew) {
    var now = this.nowIso(),
      who = this.state.me ? this.state.me.name || this.state.me.login : '';
    if (isNew) {
      rec.createDate = now;
      rec.createdBy = who;
    }
    rec.modifyDate = now;
    rec.modifiedBy = who;
    return rec;
  }
  svc(r) {
    r = r || {};
    return {
      created: r.createDate ? this.fmt(r.createDate, true) : 'появится после сохранения',
      createdBy: r.createdBy || '—',
      modified: r.modifyDate ? this.fmt(r.modifyDate, true) : '—',
      modifiedBy: r.modifiedBy || '—',
    };
  }
  toast(text, err) {
    var self = this;
    if (this._tt) clearTimeout(this._tt);
    this.setState({ toast: { text: text, err: !!err } });
    this._tt = setTimeout(
      function () {
        self.setState({ toast: null });
      },
      err ? 5500 : 3000,
    );
  }
  persist(db, msg) {
    db.lastSave = this.nowIso();
    try {
      window.localStorage.setItem('sp-db', JSON.stringify(db));
    } catch (e) {
      this.toast(
        'Не удалось сохранить: в хранилище браузера не хватило места. Уменьшите число или размер фотографий. Введённые данные не потеряны.',
        true,
      );
      return false;
    }
    this.setState({ db: db });
    if (msg) this.toast(msg);
    return true;
  }
  ask(c) {
    this.setState({
      confirm: Object.assign(
        { yesText: 'Удалить', noText: 'Отмена', danger: true, linked: [], repl: '', hasYes: true },
        c,
      ),
      dd: null,
    });
  }
  guard(fn) {
    var self = this;
    if (!this.isDirty()) {
      fn();
      return;
    }
    this.ask({
      title: 'Есть несохранённые изменения',
      text: 'Сохранить изменения перед уходом со страницы?',
      yesText: 'Выйти без сохранения',
      noText: 'Остаться',
      danger: false,
      altText: 'Сохранить и выйти',
      alt: function () {
        if (self.saveForm()) fn();
      },
      onYes: function () {
        self.setState({ form: null });
        fn();
      },
    });
  }
  go(sec, extra) {
    var self = this;
    this.guard(function () {
      self.setState(Object.assign({ sec: sec, form: null, modal: null, dd: null }, extra || {}));
      try {
        window.scrollTo(0, 0);
      } catch (e) {}
    });
  }
  dd(key, opts, cur, onPick, more) {
    var self = this,
      open = this.state.dd === key,
      q = this.state.ddq[key] || '';
    more = more || {};
    var searchable = more.searchable != null ? more.searchable : opts.length > 8;
    var curL = '';
    opts.forEach(function (o) {
      if (String(o[0]) === String(cur)) curL = o[1];
    });
    var shown =
      !searchable || !q
        ? opts
        : opts.filter(function (o) {
            return self.norm(o[1]).indexOf(self.norm(q)) >= 0;
          });
    return {
      label: more.label || curL || (opts[0] ? opts[0][1] : ''),
      open: open,
      exp: open ? 'true' : 'false',
      wCls: open ? 'a-dd-up' : '',
      inv: more.inv || 'false',
      disabled: !!more.disabled,
      searchable: searchable,
      q: q,
      none: shown.length === 0,
      setQ: function (e) {
        var x = Object.assign({}, self.state.ddq);
        x[key] = e.target.value;
        self.setState({ ddq: x });
      },
      toggle: function () {
        var x = Object.assign({}, self.state.ddq);
        x[key] = '';
        self.setState({ dd: open ? null : key, ddq: x });
      },
      opts: shown.map(function (o) {
        var on = cur != null && String(o[0]) === String(cur);
        return {
          l: o[1],
          img: o[2] || '',
          hasImg: !!o[2],
          sel: on ? 'true' : 'false',
          cls: on ? 'a-dd-on' : '',
          pick: function () {
            self.setState({ dd: null });
            onPick(o[0]);
          },
        };
      }),
    };
  }
  menu(key, items) {
    return this.dd(
      key,
      items.map(function (it, i) {
        return [i, it[0]];
      }),
      null,
      function (i) {
        items[i][1]();
      },
      { label: '⋯', searchable: false },
    );
  }
  readImages(files, done) {
    var ok = ['image/jpeg', 'image/png', 'image/webp'],
      errs = [],
      out = [],
      left = 0;
    var shrink = function (img, max, q) {
      var k = Math.min(1, max / Math.max(img.width, img.height));
      var c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * k));
      c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', q);
    };
    Array.prototype.slice.call(files || []).forEach(function (f) {
      if (ok.indexOf(f.type) < 0) {
        errs.push({ t: '«' + f.name + '»: формат не поддерживается. Подойдут JPG, PNG или WEBP.' });
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        errs.push({ t: '«' + f.name + '»: файл больше 10 МБ.' });
        return;
      }
      left++;
      var fin = function () {
        if (--left === 0) done(out, errs);
      };
      var rd = new FileReader();
      rd.onerror = function () {
        errs.push({ t: '«' + f.name + '»: не удалось прочитать файл.' });
        fin();
      };
      rd.onload = function () {
        var img = new Image();
        img.onerror = function () {
          errs.push({ t: '«' + f.name + '»: файл повреждён или не является изображением.' });
          fin();
        };
        img.onload = function () {
          out.push({ name: f.name, picture: shrink(img, 1600, 0.85), pictureCompressed: shrink(img, 420, 0.72) });
          fin();
        };
        img.src = rd.result;
      };
      rd.readAsDataURL(f);
    });
    if (left === 0) done(out, errs);
    return left;
  }
  download(name, rows) {
    var csv =
      '﻿' +
      rows
        .map(function (r) {
          return r
            .map(function (v) {
              var s = v == null ? '' : String(v);
              return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
            })
            .join(';');
        })
        .join('\r\n');
    try {
      var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4000);
      this.toast(
        'Файл «' +
          name +
          '» сформирован: ' +
          (rows.length - 1) +
          ' ' +
          this.plural(rows.length - 1, ['строка', 'строки', 'строк']) +
          '.',
      );
    } catch (e) {
      this.toast('Не удалось скачать файл в этом окне.', true);
    }
  }
  kindName(db, id) {
    var k = this.find(db.kinds, id);
    return k ? k.name : '';
  }
  authorName(db, id) {
    var a = this.find(db.authors, id);
    return a ? a.name : '';
  }
  userName(db, id) {
    var u = this.find(db.users, id);
    return u ? u.name || u.login : 'Удалённый пользователь';
  }
  figLabel(db, id) {
    var f = this.find(db.figures, id);
    return f ? f.name + ' · ID ' + f.id : 'ID ' + id;
  }
  figPhotos(db, id) {
    return (db.photos || [])
      .filter(function (p) {
        return String(p.figureId) === String(id);
      })
      .sort(function (a, b) {
        return (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0) || (a.sort || 0) - (b.sort || 0) || a.id - b.id;
      });
  }
  mainThumb(db, f) {
    var p = this.find(db.photos, f.pictureMainId) || this.figPhotos(db, f.id)[0];
    return p ? p.pictureCompressed || p.picture : '';
  }
  figTags(db, id) {
    return (db.figureTags || [])
      .filter(function (x) {
        return String(x.figureId) === String(id);
      })
      .map(function (x) {
        return x.tagId;
      });
  }
  syncMain(db, figureId, preferId) {
    var ps = (db.photos || []).filter(function (p) {
      return String(p.figureId) === String(figureId);
    });
    var main = preferId != null ? this.find(ps, preferId) : null;
    if (!main)
      main =
        ps.filter(function (p) {
          return p.isMain;
        })[0] || null;
    if (!main)
      main =
        ps.slice().sort(function (a, b) {
          return (a.sort || 0) - (b.sort || 0) || a.id - b.id;
        })[0] || null;
    ps.forEach(function (p) {
      p.isMain = !!main && p.id === main.id;
    });
    var f = this.find(db.figures, figureId);
    if (f) f.pictureMainId = main ? main.id : null;
  }
  curName(c) {
    return { RUB: '₽ Рубль', USD: '$ Доллар', EUR: '€ Евро' }[c] || 'Не указана';
  }
  curOpts() {
    return [
      ['', 'Не указана'],
      ['RUB', '₽ Рубль'],
      ['USD', '$ Доллар'],
      ['EUR', '€ Евро'],
    ];
  }
  secTitle(s) {
    return {
      figures: 'Статуэтки',
      photos: 'Фотографии',
      bindings: 'Привязка меток',
      infos: 'Статьи',
      kinds: 'Типы статуэток',
      authors: 'Авторы',
      tags: 'Метки',
      users: 'Пользователи',
      notes: 'Заметки пользователей',
    }[s];
  }
  ls(sec) {
    return Object.assign({ q: '', f: {}, page: 1, per: 25, sort: '', dir: 1 }, this.state.lists[sec] || {});
  }
  setLs(sec, patch, keepPage) {
    var x = Object.assign({}, this.state.lists);
    x[sec] = Object.assign(this.ls(sec), patch, keepPage ? {} : { page: 1 });
    this.setState({ lists: x });
  }
  openList(sec, f) {
    var x = Object.assign({}, this.state.lists);
    if (f) x[sec] = Object.assign(this.ls(sec), { f: f, q: '', page: 1 });
    this.go(sec, { lists: x });
  }
}

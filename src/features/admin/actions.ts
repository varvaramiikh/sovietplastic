/* Сгенерировано из original-export/project/Admin.dc.html (часть класса Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { AdminHelpers } from './helpers';

/** Формы, сохранение с проверками, фотографии, удаление с последствиями, модальные окна, разметка статей. */
export class AdminActions extends AdminHelpers {
  openForm(type, id, tab) {
    var db = this.state.db,
      r = id == null ? null : this.find(this.coll(type), id),
      d;
    if (type === 'figure')
      d = r
        ? {
            name: r.name,
            kindId: r.kindId,
            authorId: r.authorId,
            factoryName: r.factoryName || '',
            height: this.num(r.height),
            length: this.num(r.length),
            tagIds: this.figTags(db, r.id),
            visible: !!r.visible,
            comment: r.comment || '',
            sourceText: r.sourceText || '',
            sourceUrl: r.sourceUrl || '',
            originalId: r.originalId,
            final: !!r.final,
          }
        : {
            name: '',
            kindId: null,
            authorId: null,
            factoryName: '',
            height: '',
            length: '',
            tagIds: [],
            visible: true,
            comment: '',
            sourceText: '',
            sourceUrl: '',
            originalId: null,
            final: false,
          };
    else if (type === 'info')
      d = r
        ? {
            name: r.name,
            infoDate: r.infoDate || '',
            text: r.text || '',
            sourceText: r.sourceText || '',
            sourceUrl: r.sourceUrl || '',
          }
        : { name: '', infoDate: new Date().toISOString().slice(0, 10), text: '', sourceText: '', sourceUrl: '' };
    else if (type === 'kind') d = r ? { name: r.name, visible: r.visible !== false } : { name: '', visible: true };
    else if (type === 'author')
      d = r
        ? { name: r.name, text: r.text || '', sourceText: r.sourceText || '', sourceUrl: r.sourceUrl || '' }
        : { name: '', text: '', sourceText: '', sourceUrl: '' };
    else if (type === 'tag') d = r ? { name: r.tagText } : { name: '' };
    else if (type === 'user')
      d = r
        ? {
            login: r.login || '',
            name: r.name || '',
            email: r.email || '',
            defaultCurrency: r.defaultCurrency || '',
            isAdmin: !!r.isAdmin,
            p1: '',
            p2: '',
          }
        : { login: '', name: '', email: '', defaultCurrency: 'RUB', isAdmin: false, p1: '', p2: '' };
    this.go(type, {
      form: {
        type: type,
        id: r ? r.id : null,
        d: d,
        orig: JSON.stringify(d),
        err: {},
        tab: tab || 'main',
        prev: tab === 'preview',
        quick: null,
        photoErr: [],
        upl: 0,
        replaceId: null,
      },
    });
  }
  coll(type) {
    var db = this.state.db;
    return { figure: db.figures, info: db.infos, kind: db.kinds, author: db.authors, tag: db.tags, user: db.users }[
      type
    ];
  }
  setD(patch) {
    var f = this.state.form;
    this.setState({ form: Object.assign({}, f, { d: Object.assign({}, f.d, patch), err: {} }) });
  }
  setF(patch) {
    this.setState({ form: Object.assign({}, this.state.form, patch) });
  }
  validUrl(u) {
    return !u || /^https?:\/\/[^\s]+\.[^\s]+/i.test(u);
  }
  parseNum(s) {
    s = String(s || '')
      .trim()
      .replace(',', '.');
    if (!s) return { ok: true, v: null };
    if (!/^\d+(\.\d+)?$/.test(s)) return { ok: false };
    var v = parseFloat(s);
    return v > 0 ? { ok: true, v: v } : { ok: false };
  }
  saveForm() {
    var self = this,
      f = this.state.form;
    if (!f || this.state.saving) return false;
    var d = f.d,
      e = {},
      db = this.clone(this.state.db),
      isNew = f.id == null,
      rec,
      list,
      name;
    var err = function (k, m) {
      e[k] = m;
    };
    if (f.type === 'figure') {
      if (!d.name.trim()) err('name', 'Укажите название.');
      if (!d.kindId) err('kind', 'Выберите тип статуэтки.');
      var h = this.parseNum(d.height),
        l = this.parseNum(d.length);
      if (!h.ok) err('height', 'Введите положительное число, например 14 или 14,5.');
      if (!l.ok) err('length', 'Введите положительное число, например 8 или 8,5.');
      if (!this.validUrl(d.sourceUrl.trim())) err('sourceUrl', 'Ссылка должна начинаться с http:// или https://');
      if (Object.keys(e).length) return this.formFail(e);
      list = db.figures;
      rec = isNew ? { id: this.nextId(list), pictureMainId: null } : this.find(list, f.id);
      Object.assign(rec, {
        name: d.name.trim(),
        kindId: d.kindId,
        authorId: d.authorId || null,
        factoryName: d.factoryName.trim(),
        height: h.v,
        length: l.v,
        visible: !!d.visible,
        comment: d.comment,
        sourceText: d.sourceText.trim(),
        sourceUrl: d.sourceUrl.trim(),
        originalId: d.originalId || null,
        final: !!d.final,
      });
      this.stamp(rec, isNew);
      if (isNew) list.unshift(rec);
      db.figureTags = db.figureTags.filter(function (x) {
        return String(x.figureId) !== String(rec.id);
      });
      d.tagIds.forEach(function (t) {
        if (
          !db.figureTags.some(function (x) {
            return String(x.figureId) === String(rec.id) && String(x.tagId) === String(t);
          })
        )
          db.figureTags.push({ figureId: rec.id, tagId: t });
      });
      name = rec.name;
    } else if (f.type === 'info') {
      if (!d.name.trim()) err('name', 'Укажите название.');
      if (!d.infoDate) err('infoDate', 'Укажите дату материала.');
      if (!this.validUrl(d.sourceUrl.trim())) err('sourceUrl', 'Ссылка должна начинаться с http:// или https://');
      if (Object.keys(e).length) return this.formFail(e);
      list = db.infos;
      rec = isNew ? { id: this.nextId(list) } : this.find(list, f.id);
      Object.assign(rec, {
        name: d.name.trim(),
        infoDate: d.infoDate,
        text: d.text,
        sourceText: d.sourceText.trim(),
        sourceUrl: d.sourceUrl.trim(),
      });
      this.stamp(rec, isNew);
      if (isNew) list.unshift(rec);
      name = rec.name;
    } else if (f.type === 'kind' || f.type === 'author' || f.type === 'tag') {
      var key = f.type === 'kind' ? 'kinds' : f.type === 'author' ? 'authors' : 'tags',
        fld = f.type === 'tag' ? 'tagText' : 'name';
      list = db[key];
      if (!d.name.trim()) err('name', f.type === 'author' ? 'Укажите имя.' : 'Укажите название.');
      else if (
        list.some(function (x) {
          return String(x.id) !== String(f.id) && self.norm(x[fld]) === self.norm(d.name);
        })
      )
        err('name', 'Такое значение уже есть в справочнике — повторы и лишние пробелы не учитываются.');
      if (f.type === 'author' && !this.validUrl(d.sourceUrl.trim()))
        err('sourceUrl', 'Ссылка должна начинаться с http:// или https://');
      if (Object.keys(e).length) return this.formFail(e);
      rec = isNew ? { id: this.nextId(list) } : this.find(list, f.id);
      rec[fld] = d.name.replace(/\s+/g, ' ').trim();
      if (f.type === 'kind') rec.visible = !!d.visible;
      if (f.type === 'author') {
        rec.text = d.text;
        rec.sourceText = d.sourceText.trim();
        rec.sourceUrl = d.sourceUrl.trim();
      }
      this.stamp(rec, isNew);
      if (isNew) list.push(rec);
      name = rec[fld];
    } else if (f.type === 'user') {
      list = db.users;
      var login = d.login.trim(),
        email = d.email.trim().toLowerCase();
      if (!/^[A-Za-z0-9_.-]{3,}$/.test(login))
        err('login', 'Логин: не меньше 3 символов — латиница, цифры, точка, дефис, подчёркивание.');
      else if (
        list.some(function (u) {
          return String(u.id) !== String(f.id) && self.norm(u.login) === self.norm(login);
        })
      )
        err('login', 'Такой логин уже занят.');
      if (!/^\S+@\S+\.\S+$/.test(email)) err('email', 'Проверьте адрес электронной почты.');
      else if (
        list.some(function (u) {
          return String(u.id) !== String(f.id) && self.norm(u.email) === email;
        })
      )
        err('email', 'Эта почта уже используется.');
      if (isNew && !d.p1) err('p1', 'Задайте пароль для нового пользователя.');
      else if (d.p1 && d.p1.length < 6) err('p1', 'Пароль — не короче 6 символов.');
      if (d.p1 && d.p1 !== d.p2) err('p2', 'Пароли не совпадают.');
      var admins = list.filter(function (u) {
        return u.isAdmin && u.status !== 'blocked' && String(u.id) !== String(f.id);
      }).length;
      if (!d.isAdmin && !admins) err('login', 'Должен остаться хотя бы один администратор.');
      if (Object.keys(e).length) return this.formFail(e);
      rec = isNew ? { id: this.nextId(list) } : this.find(list, f.id);
      Object.assign(rec, {
        login: login,
        name: d.name.trim(),
        email: email,
        defaultCurrency: d.defaultCurrency || '',
        isAdmin: !!d.isAdmin,
      });
      if (d.p1) rec.pass = this.spHash(d.p1);
      this.stamp(rec, isNew);
      if (isNew) list.push(rec);
      name = rec.name || rec.login;
    }
    this.setState({ saving: true });
    var ok = this.persist(db, (isNew ? 'Создано: «' : 'Сохранено: «') + name + '»');
    if (!ok) {
      this.setState({ saving: false });
      return false;
    }
    var nd = Object.assign({}, d);
    if (f.type === 'user') {
      nd.p1 = '';
      nd.p2 = '';
    }
    if (f.type === 'kind' || f.type === 'author' || f.type === 'tag') nd.name = name;
    this.setState({
      saving: false,
      form: Object.assign({}, f, { id: rec.id, d: nd, orig: JSON.stringify(nd), err: {} }),
    });
    return true;
  }
  formFail(e) {
    var f = this.state.form,
      tab = f.tab;
    if (f.type === 'figure') {
      if (e.name || e.kind || e.height || e.length) tab = 'main';
      else if (e.sourceUrl) tab = 'links';
    }
    this.setState({ form: Object.assign({}, f, { err: e, tab: tab, prev: false }) });
    this.toast('Не сохранено: проверьте отмеченные поля. Введённые данные остались в форме.', true);
    return false;
  }
  quickAdd() {
    var self = this,
      f = this.state.form,
      q = f.quick,
      nm = (q.name || '').replace(/\s+/g, ' ').trim();
    if (!nm) {
      this.setF({ quick: Object.assign({}, q, { err: 'Введите название.' }) });
      return;
    }
    var db = this.clone(this.state.db),
      key = q.kind === 'kind' ? 'kinds' : q.kind === 'author' ? 'authors' : 'tags',
      fld = q.kind === 'tag' ? 'tagText' : 'name';
    var ex = db[key].filter(function (x) {
        return self.norm(x[fld]) === self.norm(nm);
      })[0],
      id;
    if (ex) {
      id = ex.id;
      this.toast('«' + ex[fld] + '» уже есть в справочнике — выбрано существующее значение.');
    } else {
      var rec = { id: this.nextId(db[key]) };
      rec[fld] = nm;
      if (q.kind === 'kind') rec.visible = true;
      if (q.kind === 'author') {
        rec.text = '';
        rec.sourceText = '';
        rec.sourceUrl = '';
      }
      this.stamp(rec, true);
      db[key].push(rec);
      id = rec.id;
      if (!this.persist(db, 'Добавлено в справочник: «' + nm + '». Данные карточки не потеряны.')) return;
    }
    var p = {};
    if (q.kind === 'kind') p.kindId = id;
    else if (q.kind === 'author') p.authorId = id;
    else if (f.d.tagIds.indexOf(id) < 0) p.tagIds = f.d.tagIds.concat([id]);
    var nf = this.state.form;
    this.setState({ form: Object.assign({}, nf, { quick: null, d: Object.assign({}, nf.d, p) }) });
  }
  addPhotos(figureId, files, cb) {
    var self = this;
    var n = this.readImages(files, function (list, errs) {
      var db = self.clone(self.state.db),
        maxSort = self.figPhotos(db, figureId).reduce(function (m, p) {
          return Math.max(m, p.sort || 0);
        }, 0);
      list.forEach(function (x, i) {
        var p = self.stamp(
          {
            id: self.nextId(db.photos),
            figureId: figureId,
            isMain: false,
            picture: x.picture,
            pictureCompressed: x.pictureCompressed,
            sort: maxSort + i + 1,
            fileName: x.name,
          },
          true,
        );
        db.photos.push(p);
      });
      self.syncMain(db, figureId, null);
      var ok = list.length
        ? self.persist(
            db,
            'Загружено фото: ' + list.length + (errs.length ? '. Часть файлов не загружена — см. ошибки.' : ''),
          )
        : true;
      if (cb) cb(errs, ok);
    });
    return n;
  }
  setMainPhoto(p) {
    var self = this;
    this.ask({
      title: 'Сделать фото главным?',
      text:
        'Это фото будет показываться в карточке на сайте для «' +
        this.figLabel(this.state.db, p.figureId) +
        '». Предыдущее главное фото останется среди дополнительных.',
      yesText: 'Сделать главным',
      danger: false,
      onYes: function () {
        var db = self.clone(self.state.db);
        self.syncMain(db, p.figureId, p.id);
        var f = self.find(db.figures, p.figureId);
        if (f) self.stamp(f, false);
        self.persist(db, 'Главное фото назначено');
      },
    });
  }
  delPhoto(p) {
    var self = this,
      db0 = this.state.db,
      others = this.figPhotos(db0, p.figureId).filter(function (x) {
        return x.id !== p.id;
      });
    this.ask({
      title: 'Удалить фото' + (p.fileName ? ' «' + p.fileName + '»' : '') + '?',
      text:
        'Фото будет удалено у статуэтки «' +
        this.figLabel(db0, p.figureId) +
        '».' +
        (p.isMain
          ? others.length
            ? ' Это главное фото: главным станет следующее по порядку.'
            : ' Это единственное фото: на сайте появится заглушка.'
          : ''),
      onYes: function () {
        var db = self.clone(self.state.db);
        db.photos = db.photos.filter(function (x) {
          return x.id !== p.id;
        });
        self.syncMain(db, p.figureId, null);
        self.persist(db, 'Фото удалено');
      },
    });
  }
  movePhoto(p, dir) {
    var db = this.clone(this.state.db),
      list = this.figPhotos(db, p.figureId).filter(function (x) {
        return !x.isMain;
      });
    list.forEach(function (x, i) {
      x.sort = i + 1;
    });
    var i = -1;
    list.forEach(function (x, k) {
      if (x.id === p.id) i = k;
    });
    var j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    var t = list[i].sort;
    list[i].sort = list[j].sort;
    list[j].sort = t;
    this.persist(db, 'Порядок фото изменён');
  }
  replacePhoto(id, files) {
    var self = this;
    this.readImages(files, function (list, errs) {
      if (errs.length) {
        self.toast(errs[0].t, true);
        return;
      }
      if (!list.length) return;
      var db = self.clone(self.state.db),
        p = self.find(db.photos, id);
      if (!p) return;
      p.picture = list[0].picture;
      p.pictureCompressed = list[0].pictureCompressed;
      p.fileName = list[0].name;
      self.stamp(p, false);
      if (self.persist(db, 'Фото заменено')) self.setF({ replaceId: null });
    });
  }
  delRecord(type, id) {
    var self = this,
      db = this.state.db,
      r = this.find(this.coll(type), id);
    if (!r) return;
    var after = function () {
      var f = self.state.form;
      if (f && f.type === type && String(f.id) === String(id))
        self.setState({
          form: null,
          sec: { figure: 'figures', info: 'infos', kind: 'kinds', author: 'authors', tag: 'tags', user: 'users' }[type],
        });
    };
    var figsOf = function (fn) {
      return db.figures.filter(fn);
    };
    var lk = function (arr) {
      return arr.slice(0, 8).map(function (f) {
        return { t: f.name + ' · ID ' + f.id };
      });
    };
    if (type === 'figure') {
      var ph = this.figPhotos(db, id).length,
        bt = this.figTags(db, id).length,
        nt = db.userNotes.filter(function (n) {
          return String(n.figureId) === String(id);
        }).length,
        vr = figsOf(function (f) {
          return String(f.originalId) === String(id);
        });
      this.ask({
        title: 'Удалить статуэтку «' + r.name + '»?',
        text:
          'Вместе с ней будут удалены: фото — ' +
          ph +
          ', привязки меток — ' +
          bt +
          ', заметки пользователей — ' +
          nt +
          '.' +
          (vr.length ? ' У вариантов (' + vr.length + ') пропадёт ссылка на оригинал.' : '') +
          ' Если нужно только убрать запись с сайта, выключите «Показывать на сайте».',
        onYes: function () {
          var d = self.clone(self.state.db),
            s = String(id);
          d.figures = d.figures.filter(function (f) {
            return String(f.id) !== s;
          });
          d.figures.forEach(function (f) {
            if (String(f.originalId) === s) f.originalId = null;
          });
          d.photos = d.photos.filter(function (p) {
            return String(p.figureId) !== s;
          });
          d.figureTags = d.figureTags.filter(function (x) {
            return String(x.figureId) !== s;
          });
          d.userNotes = d.userNotes.filter(function (n) {
            return String(n.figureId) !== s;
          });
          if (self.persist(d, 'Статуэтка «' + r.name + '» удалена')) after();
        },
      });
    } else if (type === 'kind') {
      var used = figsOf(function (f) {
          return String(f.kindId) === String(id);
        }),
        others = db.kinds.filter(function (k) {
          return String(k.id) !== String(id);
        });
      if (used.length && !others.length) {
        this.ask({
          title: 'Нельзя удалить тип «' + r.name + '»',
          text:
            'Тип используется в ' +
            used.length +
            ' ' +
            this.plural(used.length, ['статуэтке', 'статуэтках', 'статуэтках']) +
            ', а другого типа для переноса нет. Сначала создайте другой тип.',
          hasYes: false,
          noText: 'Понятно',
          linked: lk(used),
          linkedCount: used.length,
        });
        return;
      }
      this.ask({
        title: 'Удалить тип «' + r.name + '»?',
        text: used.length
          ? 'Тип используется. Выберите, в какой тип перенести статуэтки — без типа запись сохранить нельзя.'
          : 'Тип не используется ни в одной статуэтке.',
        linked: lk(used),
        linkedCount: used.length,
        hasRepl: used.length > 0,
        replLabel: 'Перенести статуэтки в тип',
        replList: others.map(function (k) {
          return [k.id, k.name];
        }),
        needRepl: used.length > 0,
        onYes: function (repl) {
          var d = self.clone(self.state.db);
          d.figures.forEach(function (f) {
            if (String(f.kindId) === String(id)) {
              f.kindId = repl;
              self.stamp(f, false);
            }
          });
          d.kinds = d.kinds.filter(function (k) {
            return String(k.id) !== String(id);
          });
          if (self.persist(d, 'Тип «' + r.name + '» удалён' + (used.length ? ', статуэтки перенесены' : ''))) after();
        },
      });
    } else if (type === 'author') {
      var ua = figsOf(function (f) {
        return String(f.authorId) === String(id);
      });
      this.ask({
        title: 'Удалить автора «' + r.name + '»?',
        text: ua.length
          ? 'Автор указан у статуэток. Выберите замену или оставьте «Не указан» — сами статуэтки не удаляются.'
          : 'Автор не указан ни у одной статуэтки.',
        linked: lk(ua),
        linkedCount: ua.length,
        hasRepl: ua.length > 0,
        replLabel: 'Заменить автора на',
        replList: [['', 'Не указан']].concat(
          db.authors
            .filter(function (a) {
              return String(a.id) !== String(id);
            })
            .map(function (a) {
              return [a.id, a.name];
            }),
        ),
        onYes: function (repl) {
          var d = self.clone(self.state.db);
          d.figures.forEach(function (f) {
            if (String(f.authorId) === String(id)) {
              f.authorId = repl || null;
              self.stamp(f, false);
            }
          });
          d.authors = d.authors.filter(function (a) {
            return String(a.id) !== String(id);
          });
          if (self.persist(d, 'Автор «' + r.name + '» удалён')) after();
        },
      });
    } else if (type === 'tag') {
      var bf = db.figureTags
        .filter(function (x) {
          return String(x.tagId) === String(id);
        })
        .map(function (x) {
          return self.find(db.figures, x.figureId);
        })
        .filter(Boolean);
      this.ask({
        title: 'Удалить метку «' + r.tagText + '»?',
        text: bf.length
          ? 'Будут удалены привязки к ' +
            bf.length +
            ' ' +
            this.plural(bf.length, ['статуэтке', 'статуэткам', 'статуэткам']) +
            '. Сами статуэтки останутся. Можно перенести привязки на другую метку.'
          : 'Метка ни к чему не привязана.',
        linked: lk(bf),
        linkedCount: bf.length,
        hasRepl: bf.length > 0,
        replLabel: 'Перенести привязки на метку',
        replList: [['', 'Не переносить, удалить привязки']].concat(
          db.tags
            .filter(function (t) {
              return String(t.id) !== String(id);
            })
            .map(function (t) {
              return [t.id, t.tagText];
            }),
        ),
        onYes: function (repl) {
          var d = self.clone(self.state.db),
            out = [];
          d.figureTags.forEach(function (x) {
            if (String(x.tagId) !== String(id)) {
              out.push(x);
              return;
            }
            if (
              repl &&
              !d.figureTags.some(function (y) {
                return String(y.figureId) === String(x.figureId) && String(y.tagId) === String(repl);
              }) &&
              !out.some(function (y) {
                return String(y.figureId) === String(x.figureId) && String(y.tagId) === String(repl);
              })
            )
              out.push({ figureId: x.figureId, tagId: repl });
          });
          d.figureTags = out;
          d.tags = d.tags.filter(function (t) {
            return String(t.id) !== String(id);
          });
          if (self.persist(d, 'Метка «' + r.tagText + '» удалена')) after();
        },
      });
    } else if (type === 'info') {
      this.ask({
        title: 'Удалить статью «' + r.name + '»?',
        text: 'Статья будет удалена с сайта без возможности восстановления.',
        onYes: function () {
          var d = self.clone(self.state.db);
          d.infos = d.infos.filter(function (x) {
            return String(x.id) !== String(id);
          });
          if (self.persist(d, 'Статья удалена')) after();
        },
      });
    } else if (type === 'user') {
      if (this.state.me && String(this.state.me.id) === String(id)) {
        this.ask({
          title: 'Нельзя удалить свой аккаунт',
          text: 'Вы сейчас работаете под этим пользователем.',
          hasYes: false,
          noText: 'Понятно',
        });
        return;
      }
      if (
        r.isAdmin &&
        db.users.filter(function (u) {
          return u.isAdmin;
        }).length <= 1
      ) {
        this.ask({
          title: 'Нельзя удалить последнего администратора',
          text: 'Сначала выдайте доступ к админ-панели другому пользователю.',
          hasYes: false,
          noText: 'Понятно',
        });
        return;
      }
      var un = db.userNotes.filter(function (n) {
        return String(n.userId) === String(id);
      }).length;
      this.ask({
        title: 'Удалить пользователя «' + (r.name || r.login) + '»?',
        text: 'Аккаунт будет удалён' + (un ? ' вместе с заметками (' + un + ')' : '') + '.',
        onYes: function () {
          var d = self.clone(self.state.db);
          d.users = d.users.filter(function (u) {
            return String(u.id) !== String(id);
          });
          d.userNotes = d.userNotes.filter(function (n) {
            return String(n.userId) !== String(id);
          });
          if (self.persist(d, 'Пользователь удалён')) after();
        },
      });
    }
  }
  toggleVisible(type, id) {
    var db = this.clone(this.state.db),
      r = this.find(type === 'figure' ? db.figures : db.kinds, id);
    if (!r) return;
    r.visible = !r.visible;
    this.stamp(r, false);
    this.persist(db, '«' + r.name + '» ' + (r.visible ? 'показывается на сайте' : 'скрыто с сайта'));
  }
  openModal(type, mode, d, rec) {
    this.setState({ modal: { type: type, mode: mode, d: d, id: rec ? rec.id : null, err: '', busy: false }, dd: null });
  }
  setM(patch) {
    var m = this.state.modal;
    this.setState({ modal: Object.assign({}, m, { d: Object.assign({}, m.d, patch), err: '' }) });
  }
  noteModal(rec, preset) {
    var d = rec
      ? {
          userId: rec.userId,
          figureId: rec.figureId,
          enable: !!rec.enable,
          comment1: rec.comment1 || '',
          comment2: rec.comment2 || '',
          comment3: rec.comment3 || '',
          price: this.num(rec.price),
          currency: rec.currency || '',
        }
      : Object.assign(
          {
            userId: null,
            figureId: null,
            enable: false,
            comment1: '',
            comment2: '',
            comment3: '',
            price: '',
            currency: '',
          },
          preset || {},
        );
    this.openModal('note', rec ? 'edit' : 'add', d, rec);
  }
  photoModal(rec, preset) {
    var d = rec
      ? {
          figureId: rec.figureId,
          isMain: !!rec.isMain,
          picture: rec.picture,
          pictureCompressed: rec.pictureCompressed,
          fileName: rec.fileName || '',
        }
      : Object.assign(
          { figureId: null, isMain: false, picture: '', pictureCompressed: '', fileName: '' },
          preset || {},
        );
    this.openModal('photo', rec ? 'edit' : 'add', d, rec);
  }
  bindModal(mode, preset) {
    this.openModal('bind', mode, Object.assign({ figureId: null, tagIds: [], oldTagId: null }, preset || {}), null);
  }
  saveModal() {
    var self = this,
      m = this.state.modal,
      d = m.d,
      db = this.clone(this.state.db),
      rec;
    var fail = function (t) {
      self.setState({ modal: Object.assign({}, m, { err: t }) });
    };
    if (m.type === 'note') {
      if (!d.userId) return fail('Выберите пользователя.');
      if (!d.figureId) return fail('Выберите статуэтку.');
      var pr = String(d.price || '')
        .trim()
        .replace(',', '.');
      if (pr && !/^\d+(\.\d+)?$/.test(pr))
        return fail('Цена: введите число или оставьте поле пустым, если цена неизвестна.');
      rec = m.id != null ? this.find(db.userNotes, m.id) : { id: this.nextId(db.userNotes) };
      Object.assign(rec, {
        userId: d.userId,
        figureId: d.figureId,
        enable: !!d.enable,
        comment1: d.comment1,
        comment2: d.comment2,
        comment3: d.comment3,
        price: pr ? parseFloat(pr) : null,
        currency: d.currency || '',
      });
      this.stamp(rec, m.id == null);
      if (m.id == null) db.userNotes.unshift(rec);
      if (this.persist(db, 'Заметка сохранена')) this.setState({ modal: null });
    } else if (m.type === 'photo') {
      if (!d.picture) return fail('Выберите файл изображения.');
      if (!d.figureId) return fail('Выберите статуэтку.');
      var oldFig = null;
      if (m.id != null) {
        rec = this.find(db.photos, m.id);
        oldFig = rec.figureId;
      } else rec = { id: this.nextId(db.photos), sort: this.figPhotos(db, d.figureId).length + 1 };
      Object.assign(rec, {
        figureId: d.figureId,
        picture: d.picture,
        pictureCompressed: d.pictureCompressed || d.picture,
        fileName: d.fileName,
        isMain: !!d.isMain,
      });
      this.stamp(rec, m.id == null);
      if (m.id == null) db.photos.push(rec);
      if (oldFig != null && String(oldFig) !== String(d.figureId)) this.syncMain(db, oldFig, null);
      this.syncMain(db, d.figureId, d.isMain ? rec.id : null);
      if (this.persist(db, m.id == null ? 'Фото добавлено' : 'Фото сохранено')) this.setState({ modal: null });
    } else if (m.type === 'bind') {
      if (!d.figureId) return fail('Выберите статуэтку.');
      var has = function (t) {
        return db.figureTags.some(function (x) {
          return String(x.figureId) === String(d.figureId) && String(x.tagId) === String(t);
        });
      };
      if (m.mode === 'replace') {
        if (!d.tagIds.length) return fail('Выберите новую метку.');
        var nt = d.tagIds[0];
        if (String(nt) === String(d.oldTagId)) {
          this.setState({ modal: null });
          return;
        }
        if (has(nt)) return fail('Такая привязка уже есть — повтор пары «статуэтка + метка» не создаётся.');
        db.figureTags = db.figureTags.map(function (x) {
          return String(x.figureId) === String(d.figureId) && String(x.tagId) === String(d.oldTagId)
            ? { figureId: x.figureId, tagId: nt }
            : x;
        });
        if (this.persist(db, 'Привязка заменена')) this.setState({ modal: null });
      } else {
        if (!d.tagIds.length) return fail('Выберите хотя бы одну метку.');
        var add = d.tagIds.filter(function (t) {
            return !has(t);
          }),
          skip = d.tagIds.length - add.length;
        add.forEach(function (t) {
          db.figureTags.push({ figureId: d.figureId, tagId: t });
        });
        if (!add.length) return fail('Все выбранные метки уже привязаны к этой статуэтке.');
        if (this.persist(db, 'Привязано меток: ' + add.length + (skip ? ', пропущено повторов: ' + skip : '')))
          this.setState({ modal: null });
      }
    }
  }
  fmtBody(kind) {
    var f = this.state.form;
    if (!f) return;
    var el = document.getElementById('a-body'),
      v = f.d.text || '',
      s = el ? el.selectionStart : v.length,
      e = el ? el.selectionEnd : v.length,
      sel = v.slice(s, e),
      ins;
    if (kind === 'b') ins = '**' + (sel || 'жирный текст') + '**';
    else if (kind === 'i') ins = '_' + (sel || 'курсив') + '_';
    else if (kind === 'a') ins = '[' + (sel || 'текст ссылки') + '](https://)';
    else {
      var pre = kind === 'h' ? '## ' : kind === 'ul' ? '- ' : '> ';
      ins = (sel || (kind === 'h' ? 'Заголовок раздела' : kind === 'ul' ? 'Пункт списка' : 'Цитата'))
        .split('\n')
        .map(function (l) {
          return pre + l.replace(/^(## |- |> )/, '');
        })
        .join('\n');
      if (s > 0 && v[s - 1] !== '\n') ins = '\n' + ins;
    }
    this.setD({ text: v.slice(0, s) + ins + v.slice(e) });
  }
  parseBody(txt) {
    var blocks = [],
      para = [],
      list = null;
    var segs = function (t) {
      var out = [],
        re = /(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)\s]+\))/g,
        last = 0,
        m;
      while ((m = re.exec(t))) {
        if (m.index > last) out.push({ t: t.slice(last, m.index), plain: true, isLink: false, fw: 400, fs: 'normal' });
        var x = m[0];
        if (x[0] === '[') {
          var mm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(x);
          out.push({ t: mm[1], href: /^https?:\/\//i.test(mm[2]) ? mm[2] : '#', isLink: true, plain: false });
        } else if (x[0] === '*') out.push({ t: x.slice(2, -2), plain: true, isLink: false, fw: 600, fs: 'normal' });
        else out.push({ t: x.slice(1, -1), plain: true, isLink: false, fw: 400, fs: 'italic' });
        last = m.index + x.length;
      }
      if (last < t.length) out.push({ t: t.slice(last), plain: true, isLink: false, fw: 400, fs: 'normal' });
      return out;
    };
    var flush = function () {
      if (para.length) {
        blocks.push({ p: true, segs: segs(para.join(' ')) });
        para = [];
      }
      if (list) {
        blocks.push({ ul: true, items: list });
        list = null;
      }
    };
    String(txt || '')
      .split('\n')
      .forEach(function (l) {
        var t = l.trim();
        if (!t) {
          flush();
          return;
        }
        if (t.indexOf('## ') === 0) {
          flush();
          blocks.push({ h: true, text: t.slice(3) });
          return;
        }
        if (t.indexOf('- ') === 0) {
          if (para.length) {
            blocks.push({ p: true, segs: segs(para.join(' ')) });
            para = [];
          }
          list = list || [];
          list.push({ t: t.slice(2).replace(/\*\*|_/g, '') });
          return;
        }
        if (t.indexOf('> ') === 0) {
          flush();
          blocks.push({ q: true, text: t.slice(2) });
          return;
        }
        if (list) {
          blocks.push({ ul: true, items: list });
          list = null;
        }
        para.push(t);
      });
    flush();
    return blocks.map(function (b) {
      return Object.assign({ h: false, p: false, q: false, ul: false, text: '', segs: [], items: [] }, b);
    });
  }
}

/* Сгенерировано из original-export/project/Admin.dc.html (класс Component, разбит на части в ./logic) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { AdminLists } from '../../features/admin/lists';
import { spHash, seedDemoDb, migrateV1ToV2, readDemoDb } from '../../data/demoDb';

/** Админ-панель: конструктор, жизненный цикл и сбор значений для разметки. Цепочка: DCLogic → AdminHelpers → AdminActions → AdminLists → AdminLogic. */
export default class AdminLogic extends AdminLists {
  constructor(props) {
    super(props);
    this.state = {
      db: null,
      me: null,
      preview: false,
      denied: '',
      loadErr: '',
      sec: 'dash',
      lists: {},
      cols: {},
      form: null,
      modal: null,
      viewer: null,
      dd: null,
      ddq: {},
      confirm: null,
      toast: null,
      saving: false,
    };
  }
  componentDidMount() {
    var self = this;
    this.boot();
    this._sync = function (e) {
      if (!e || !e.key || e.key === 'sp-db' || e.key === 'sp-admin') self.boot();
    };
    this._leave = function (e) {
      if (self.isDirty()) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    try {
      window.addEventListener('storage', this._sync);
      window.addEventListener('beforeunload', this._leave);
    } catch (e) {}
  }
  componentWillUnmount() {
    try {
      window.removeEventListener('storage', this._sync);
      window.removeEventListener('beforeunload', this._leave);
    } catch (e) {}
    if (this._tt) clearTimeout(this._tt);
  }
  spHash(s) {
    return spHash(s);
  }
  spSeed() {
    return seedDemoDb();
  }
  spMigrate(o) {
    return migrateV1ToV2(o);
  }
  spReadDb() {
    return readDemoDb();
  }
  formVals() {
    var self = this,
      db = this.state.db,
      fm = this.state.form;
    if (!fm) return {};
    var d = fm.d,
      e = fm.err || {},
      isNew = fm.id == null,
      dirty = this.isDirty();
    var rec = isNew ? null : this.find(this.coll(fm.type), fm.id);
    var set = {};
    Object.keys(d).forEach(function (k) {
      set[k] = function (ev) {
        var p = {};
        p[k] = ev.target.value;
        self.setD(p);
      };
    });
    set.visibleBox = function (ev) {
      self.setD({ visible: !!ev.target.checked });
    };
    set.finalBox = function (ev) {
      self.setD({ final: !!ev.target.checked });
    };
    set.adminBox = function (ev) {
      self.setD({ isAdmin: !!ev.target.checked });
    };
    var inv = {},
      em = {},
      eb = {};
    ['name', 'kind', 'height', 'length', 'sourceUrl', 'infoDate', 'login', 'email', 'p1', 'p2'].forEach(function (k) {
      inv[k] = e[k] ? 'true' : 'false';
      eb[k] = !!e[k];
      em[k] = e[k] || '';
    });
    var secOf = { figure: 'figures', info: 'infos', kind: 'kinds', author: 'authors', tag: 'tags', user: 'users' }[
      fm.type
    ];
    var newTitle = {
      figure: 'Новая статуэтка',
      info: 'Новая статья',
      kind: 'Новый тип статуэтки',
      author: 'Новый автор',
      tag: 'Новая метка',
      user: 'Новый пользователь',
    }[fm.type];
    var recName = rec ? (fm.type === 'tag' ? rec.tagText : fm.type === 'user' ? rec.name || rec.login : rec.name) : '';
    var F = {
      heading: isNew ? newTitle : recName,
      hasSub: !isNew,
      sub: '',
      svc: this.svc(rec),
      d: d,
      set: set,
      e: eb,
      em: em,
      inv: inv,
      hasErrors: Object.keys(e).length > 0,
      errorText: 'Не удалось сохранить. Исправьте отмеченные поля — введённые данные сохранились.',
      dirtyCls: dirty ? 'a-dirty' : 'a-hint',
      dirtyText: dirty ? 'Есть несохранённые изменения' : isNew ? 'Ещё не сохранено' : 'Всё сохранено',
      saveText: isNew ? 'Создать' : 'Сохранить',
      save: function () {
        self.saveForm();
      },
      cancel: function () {
        self.go(secOf);
      },
      canDelete: !isNew,
      del: function () {
        self.delRecord(fm.type, fm.id);
      },
      hasView: false,
    };
    if (fm.type === 'figure') {
      var tab = isNew ? 'main' : fm.tab,
        ph = isNew ? [] : this.figPhotos(db, fm.id),
        notes = isNew
          ? []
          : db.userNotes.filter(function (n) {
              return String(n.figureId) === String(fm.id);
            });
      var kind = this.find(db.kinds, d.kindId);
      F.sub =
        'ID ' +
        fm.id +
        ' · ' +
        (rec && rec.visible
          ? kind && kind.visible === false
            ? 'отмечена для сайта, но её тип скрыт'
            : 'показывается на сайте'
          : 'скрыта с сайта');
      F.hasView = !isNew && !!(rec && rec.visible && (!kind || kind.visible !== false));
      F.viewHref = '/figurine';
      F.view = function () {
        try {
          window.localStorage.setItem('sp-item', String(fm.id));
        } catch (x) {}
      };
      F.isNew = isNew;
      F.tabs = [
        ['main', 'Основное'],
        ['photos', 'Фотографии', ph.length],
        ['links', 'Источники и связи'],
        ['notes', 'Заметки пользователей', notes.length],
        ['svc', 'Служебное'],
      ].map(function (t) {
        var on = tab === t[0],
          dis = isNew && t[0] !== 'main' && t[0] !== 'svc' && t[0] !== 'links';
        return {
          l: t[1],
          n: t[2],
          hasN: t[2] != null,
          cls: on ? 'a-tab-on' : '',
          sel: on ? 'true' : 'false',
          disabled: dis && t[0] !== 'links',
          title: dis ? 'Доступно после первого сохранения' : '',
          go: function () {
            self.setF({ tab: t[0] });
          },
        };
      });
      F.t = {
        main: tab === 'main',
        photos: tab === 'photos' && !isNew,
        links: tab === 'links',
        notes: tab === 'notes' && !isNew,
        svc: tab === 'svc',
      };
      F.kindDD = this.dd(
        'f-kind',
        db.kinds.map(function (k) {
          return [k.id, k.name + (k.visible === false ? ' (скрыт)' : '')];
        }),
        d.kindId,
        function (v) {
          self.setD({ kindId: v });
        },
        { label: d.kindId ? null : 'Выберите тип', inv: e.kind ? 'true' : 'false', searchable: true },
      );
      F.authorDD = this.dd(
        'f-author',
        [['', 'Не указан']].concat(
          db.authors.map(function (a) {
            return [a.id, a.name];
          }),
        ),
        d.authorId || '',
        function (v) {
          self.setD({ authorId: v || null });
        },
        { searchable: true },
      );
      var qk = fm.quick;
      F.q = {
        on: !!qk,
        label: qk ? { kind: 'Новый тип', author: 'Новый автор', tag: 'Новая метка' }[qk.kind] : '',
        name: qk ? qk.name : '',
        hasErr: !!(qk && qk.err),
        err: qk ? qk.err : '',
        setName: function (ev) {
          self.setF({ quick: Object.assign({}, self.state.form.quick, { name: ev.target.value, err: '' }) });
        },
        add: function () {
          self.quickAdd();
        },
        cancel: function () {
          self.setF({ quick: null });
        },
      };
      F.quickKind = function () {
        self.setF({ quick: { kind: 'kind', name: '' } });
      };
      F.quickAuthor = function () {
        self.setF({ quick: { kind: 'author', name: '' } });
      };
      F.quickTag = function () {
        self.setF({ quick: { kind: 'tag', name: '' } });
      };
      F.tagChips = d.tagIds.map(function (t) {
        var g = self.find(db.tags, t);
        return {
          l: g ? g.tagText : 'ID ' + t,
          remove: function () {
            self.setD({
              tagIds: self.state.form.d.tagIds.filter(function (x) {
                return String(x) !== String(t);
              }),
            });
          },
        };
      });
      F.noTags = !d.tagIds.length;
      F.tagDD = this.dd(
        'f-tags',
        db.tags
          .filter(function (t) {
            return d.tagIds.map(String).indexOf(String(t.id)) < 0;
          })
          .sort(function (a, b) {
            return a.tagText.localeCompare(b.tagText, 'ru');
          })
          .map(function (t) {
            return [t.id, t.tagText];
          }),
        null,
        function (v) {
          self.setD({ tagIds: self.state.form.d.tagIds.concat([v]) });
        },
        { label: 'Добавить метку…', searchable: true },
      );
      F.visHint = d.visible
        ? kind && kind.visible === false
          ? 'Тип статуэтки скрыт — пока он скрыт, запись на сайте не видна.'
          : 'Статуэтка видна в каталоге и на главной.'
        : 'Запись хранится в базе, но посетители её не видят.';
      F.urlOk = !!d.sourceUrl && this.validUrl(d.sourceUrl) && /^https?:/i.test(d.sourceUrl);
      F.origDD = this.dd(
        'f-orig',
        [['', 'Не указан']].concat(
          db.figures
            .filter(function (x) {
              return String(x.id) !== String(fm.id);
            })
            .map(function (x) {
              return [x.id, x.name + ' · ID ' + x.id, self.mainThumb(db, x)];
            }),
        ),
        d.originalId || '',
        function (v) {
          self.setD({ originalId: v || null });
        },
        { searchable: true },
      );
      var vars = isNew
        ? []
        : db.figures.filter(function (x) {
            return String(x.originalId) === String(fm.id);
          });
      F.variantCount = vars.length;
      F.noVariants = !vars.length;
      F.variants = vars.map(function (x) {
        return {
          l: x.name + ' · ID ' + x.id,
          src: self.mainThumb(db, x),
          go: function () {
            self.openForm('figure', x.id, 'links');
          },
        };
      });
      F.noPhotos = !ph.length;
      F.uploading = fm.upl > 0;
      F.uploadLeft = fm.upl;
      F.photoErrors = fm.photoErr || [];
      F.addPhotos = function (ev) {
        var n = self.addPhotos(fm.id, ev.target.files, function (errs) {
          self.setF({ upl: 0, photoErr: errs });
        });
        self.setF({ upl: n, photoErr: [] });
        try {
          ev.target.value = '';
        } catch (x) {}
      };
      F.hasReplace = fm.replaceId != null;
      F.cancelReplace = function () {
        self.setF({ replaceId: null });
      };
      F.replaceFile = function (ev) {
        self.replacePhoto(fm.replaceId, ev.target.files);
        try {
          ev.target.value = '';
        } catch (x) {}
      };
      var extras = ph.filter(function (p) {
        return !p.isMain;
      });
      F.photos = ph.map(function (p) {
        var k = -1;
        extras.forEach(function (x, i) {
          if (x.id === p.id) k = i;
        });
        return {
          thumb: p.pictureCompressed || p.picture,
          isMain: !!p.isMain,
          mainCls: p.isMain ? 'a-ph-main' : '',
          sub: (p.isMain ? 'Главное фото' : 'Дополнительное, №' + (k + 1)) + (p.fileName ? ' · ' + p.fileName : ''),
          cantUp: p.isMain || k <= 0,
          cantDown: p.isMain || k < 0 || k >= extras.length - 1,
          up: function () {
            self.movePhoto(p, -1);
          },
          down: function () {
            self.movePhoto(p, 1);
          },
          viewer: function () {
            self.setState({
              viewer: { src: p.picture, caption: (rec ? rec.name : '') + (p.isMain ? ' — главное фото' : '') },
            });
          },
          dd: self.menu(
            'f-ph-' + p.id,
            [
              [
                'Просмотр',
                function () {
                  self.setState({ viewer: { src: p.picture, caption: rec ? rec.name : '' } });
                },
              ],
            ]
              .concat(
                p.isMain
                  ? []
                  : [
                      [
                        'Сделать главным',
                        function () {
                          self.setMainPhoto(p);
                        },
                      ],
                    ],
              )
              .concat([
                [
                  'Заменить файл',
                  function () {
                    self.setF({ replaceId: p.id });
                  },
                ],
                [
                  'Удалить',
                  function () {
                    self.delPhoto(p);
                  },
                ],
              ]),
          ),
        };
      });
      F.noNotes = !notes.length;
      F.addNote = function () {
        self.noteModal(null, { figureId: fm.id });
      };
      F.notes = notes.map(function (n) {
        var t = [n.comment1, n.comment2, n.comment3].filter(Boolean).join(' · ');
        return {
          user: self.userName(db, n.userId),
          text: t ? t.slice(0, 90) : '—',
          price: n.price == null ? 'Неизвестна' : self.num(n.price),
          cur: self.curName(n.currency),
          dd: self.menu('f-nt-' + n.id, [
            [
              'Открыть и изменить',
              function () {
                self.noteModal(n);
              },
            ],
            [
              'Удалить',
              function () {
                self.ask({
                  title: 'Удалить заметку?',
                  text: 'Заметка пользователя «' + self.userName(db, n.userId) + '» будет удалена.',
                  onYes: function () {
                    var x = self.clone(self.state.db);
                    x.userNotes = x.userNotes.filter(function (y) {
                      return y.id !== n.id;
                    });
                    self.persist(x, 'Заметка удалена');
                  },
                });
              },
            ],
          ]),
        };
      });
    } else if (fm.type === 'info') {
      F.sub = 'ID ' + fm.id + ' · дата материала ' + this.fmt(rec && rec.infoDate);
      F.preview = !!fm.prev;
      F.editing = !fm.prev;
      F.editCls = fm.prev ? '' : 'a-tab-on';
      F.prevCls = fm.prev ? 'a-tab-on' : '';
      F.toEdit = function () {
        self.setF({ prev: false });
      };
      F.toPrev = function () {
        self.setF({ prev: true });
      };
      F.prevTitle = d.name || 'Без названия';
      F.prevDate = this.fmt(d.infoDate);
      F.blocks = this.parseBody(d.text);
      F.hasSource = !!(d.sourceUrl && /^https?:\/\//i.test(d.sourceUrl));
      F.sourceLabel = d.sourceText || d.sourceUrl;
      F.fmt = {
        h: function () {
          self.fmtBody('h');
        },
        b: function () {
          self.fmtBody('b');
        },
        i: function () {
          self.fmtBody('i');
        },
        ul: function () {
          self.fmtBody('ul');
        },
        q: function () {
          self.fmtBody('q');
        },
        a: function () {
          self.fmtBody('a');
        },
      };
    } else if (fm.type === 'kind' || fm.type === 'author' || fm.type === 'tag') {
      var isK = fm.type === 'kind',
        isA = fm.type === 'author',
        fld = isK || isA ? 'name' : 'tagText',
        key = isK ? 'kinds' : isA ? 'authors' : 'tags';
      F.sub = 'ID ' + fm.id;
      F.isKind = isK;
      F.isAuthor = isA;
      F.nameLabel = isA ? 'Имя' : 'Название';
      var nm = this.norm(d.name),
        sim =
          nm.length >= 3
            ? db[key]
                .filter(function (x) {
                  return (
                    String(x.id) !== String(fm.id) &&
                    self.norm(x[fld]) !== nm &&
                    (self.norm(x[fld]).indexOf(nm) >= 0 || nm.indexOf(self.norm(x[fld])) >= 0)
                  );
                })
                .slice(0, 3)
            : [];
      F.hasSimilar = sim.length > 0;
      F.similar =
        'Похожие значения уже есть: ' +
        sim
          .map(function (x) {
            return '«' + x[fld] + '»';
          })
          .join(', ') +
        '. Проверьте, не дубль ли это.';
      var lf = isNew
        ? []
        : db.figures.filter(function (x) {
            return isK
              ? String(x.kindId) === String(fm.id)
              : isA
                ? String(x.authorId) === String(fm.id)
                : self.figTags(db, x.id).map(String).indexOf(String(fm.id)) >= 0;
          });
      F.showLinked = !isNew;
      F.linkedTitle = 'Связанные статуэтки';
      F.linkedCount = lf.length;
      F.noLinked = !lf.length;
      F.moreLinked = lf.length > 10;
      F.linked = lf.slice(0, 10).map(function (x) {
        return {
          l: x.name + ' · ID ' + x.id,
          src: self.mainThumb(db, x),
          go: function () {
            self.openForm('figure', x.id);
          },
        };
      });
      F.allLinked = function () {
        var ff = {};
        ff[isK ? 'kind' : isA ? 'author' : 'tag'] = fm.id;
        self.openList('figures', ff);
      };
      F.delText = isK ? 'Удалить тип' : isA ? 'Удалить автора' : 'Удалить метку';
    } else if (fm.type === 'user') {
      var isMe = !isNew && this.state.me && String(this.state.me.id) === String(fm.id),
        un = isNew
          ? []
          : db.userNotes.filter(function (n) {
              return String(n.userId) === String(fm.id);
            });
      F.sub = 'ID ' + fm.id + (rec ? ' · ' + rec.login : '');
      F.curDD = this.dd(
        'u-cur',
        this.curOpts(),
        d.defaultCurrency || '',
        function (v) {
          self.setD({ defaultCurrency: v });
        },
        { searchable: false },
      );
      F.passTitle = isNew ? 'Пароль' : 'Смена пароля';
      F.passHint = isNew
        ? 'Задайте пароль для входа. Он хранится только в зашифрованном виде.'
        : 'Текущий пароль не показывается. Заполните поля, только если нужно задать новый.';
      F.isMe = isMe;
      F.adminHint = isMe
        ? 'Свой доступ отключить нельзя — вы сейчас в панели.'
        : 'Отметка isAdmin открывает админ-панель и кнопку в личном кабинете.';
      F.showNotes = !isNew;
      F.noteCount = un.length;
      F.hasNotes = un.length > 0;
      F.openNotes = function () {
        self.openList('notes', { user: fm.id });
      };
      F.canDelete = !isNew && !isMe;
    }
    return F;
  }
  modalVals() {
    var self = this,
      db = this.state.db,
      m = this.state.modal;
    if (!m) return { open: false };
    var d = m.d,
      rec = m.id != null ? this.find(m.type === 'note' ? db.userNotes : db.photos, m.id) : null;
    var figDD = this.dd(
      'm-fig',
      db.figures.map(function (x) {
        return [x.id, x.name + ' · ID ' + x.id, self.mainThumb(db, x)];
      }),
      d.figureId,
      function (v) {
        self.setM({ figureId: v });
      },
      { label: d.figureId ? null : 'Выберите статуэтку', searchable: true },
    );
    var M = {
      open: true,
      err: m.err,
      hasErr: !!m.err,
      busy: !!m.busy,
      d: d,
      inv: { price: 'false' },
      isNote: m.type === 'note',
      isPhoto: m.type === 'photo',
      isBind: m.type === 'bind',
      figDD: figDD,
      hasSvc: !!rec,
      svc: this.svc(rec),
      cancel: function () {
        self.setState({ modal: null });
      },
      save: function () {
        self.saveModal();
      },
      saveText:
        m.mode === 'add'
          ? m.type === 'bind'
            ? 'Привязать'
            : 'Добавить'
          : m.mode === 'replace'
            ? 'Заменить'
            : 'Сохранить',
    };
    var set = {};
    Object.keys(d).forEach(function (k) {
      set[k] = function (ev) {
        var p = {};
        p[k] = ev.target.value;
        self.setM(p);
      };
    });
    set.enableBox = function (ev) {
      self.setM({ enable: !!ev.target.checked });
    };
    set.mainBox = function (ev) {
      self.setM({ isMain: !!ev.target.checked });
    };
    M.set = set;
    if (m.type === 'note') {
      M.title = m.mode === 'add' ? 'Новая заметка пользователя' : 'Заметка пользователя';
      M.userDD = this.dd(
        'm-user',
        db.users.map(function (u) {
          return [u.id, (u.name || u.login) + ' · ' + u.login];
        }),
        d.userId,
        function (v) {
          self.setM({ userId: v });
        },
        { label: d.userId ? null : 'Выберите пользователя', searchable: true },
      );
      M.curDD = this.dd(
        'm-cur',
        this.curOpts(),
        d.currency || '',
        function (v) {
          self.setM({ currency: v });
        },
        { searchable: false },
      );
    } else if (m.type === 'photo') {
      M.title = m.mode === 'add' ? 'Добавить фотографию' : 'Фотография';
      M.hasImg = !!d.pictureCompressed;
      M.fileLabel = d.picture ? 'Заменить файл' : 'Выбрать файл';
      M.pickFile = function (ev) {
        self.setState({ modal: Object.assign({}, self.state.modal, { busy: true, err: '' }) });
        self.readImages(ev.target.files, function (list, errs) {
          var mm = self.state.modal;
          if (!mm) return;
          if (errs.length) {
            self.setState({ modal: Object.assign({}, mm, { busy: false, err: errs[0].t }) });
            return;
          }
          var x = list[0];
          self.setState({
            modal: Object.assign({}, mm, {
              busy: false,
              d: Object.assign(
                {},
                mm.d,
                x ? { picture: x.picture, pictureCompressed: x.pictureCompressed, fileName: x.name } : {},
              ),
            }),
          });
        });
        try {
          ev.target.value = '';
        } catch (x) {}
      };
    } else if (m.type === 'bind') {
      var rep = m.mode === 'replace';
      M.title = rep ? 'Заменить метку в привязке' : 'Привязать метки к статуэтке';
      M.tagLabel = rep ? 'Новая метка' : 'Метки';
      M.figDD.disabled = rep;
      M.tagChips = rep
        ? []
        : d.tagIds.map(function (t) {
            var g = self.find(db.tags, t);
            return {
              l: g ? g.tagText : t,
              remove: function () {
                self.setM({
                  tagIds: self.state.modal.d.tagIds.filter(function (x) {
                    return String(x) !== String(t);
                  }),
                });
              },
            };
          });
      var existing = d.figureId ? this.figTags(db, d.figureId).map(String) : [];
      M.tagDD = this.dd(
        'm-tag',
        db.tags
          .filter(function (t) {
            return rep || d.tagIds.map(String).indexOf(String(t.id)) < 0;
          })
          .sort(function (a, b) {
            return a.tagText.localeCompare(b.tagText, 'ru');
          })
          .map(function (t) {
            return [t.id, t.tagText + (existing.indexOf(String(t.id)) >= 0 && !rep ? ' (уже привязана)' : '')];
          }),
        rep ? d.tagIds[0] : null,
        function (v) {
          self.setM({ tagIds: rep ? [v] : self.state.modal.d.tagIds.concat([v]) });
        },
        { label: rep ? null : 'Добавить метку…', searchable: true },
      );
      var dups = rep
        ? []
        : d.tagIds.filter(function (t) {
            return existing.indexOf(String(t)) >= 0;
          });
      M.hasDup = dups.length > 0;
      M.dup =
        'Уже привязаны и будут пропущены: ' +
        dups
          .map(function (t) {
            var g = self.find(db.tags, t);
            return g ? g.tagText : t;
          })
          .join(', ') +
        '.';
    }
    return M;
  }
  viewVals() {
    var self = this,
      st = this.state,
      db = st.db;
    var base = {
      loading: !db && !st.loadErr,
      loadError: !!st.loadErr,
      loadErrorText: st.loadErr,
      denied: !!(db && !st.me),
      deniedText: st.denied,
      ready: !!(db && st.me),
    };
    var empty = { opts: [] };
    var c = st.confirm;
    base.confirm = !c
      ? { open: false, linked: [], replDD: empty }
      : {
          open: true,
          title: c.title,
          text: c.text,
          yesText: c.yesText,
          noText: c.noText,
          yesCls: c.danger ? 'a-btn-red' : '',
          hasYes: c.hasYes !== false,
          yesDisabled: !!(c.needRepl && !c.repl),
          hasAlt: !!c.alt,
          altText: c.altText || '',
          alt: function () {
            var cc = self.state.confirm;
            self.setState({ confirm: null });
            if (cc && cc.alt) cc.alt();
          },
          hasLinked: !!c.linkedCount,
          linked: c.linked || [],
          linkedCount: c.linkedCount || 0,
          more: (c.linkedCount || 0) > 8,
          moreText: 'и ещё ' + ((c.linkedCount || 0) - 8),
          hasRepl: !!c.hasRepl,
          replLabel: c.replLabel || '',
          replDD: this.dd(
            'c-repl',
            c.replList || [],
            c.repl || (c.needRepl ? null : ''),
            function (v) {
              self.setState({ confirm: Object.assign({}, self.state.confirm, { repl: v }) });
            },
            { label: c.needRepl && !c.repl ? 'Выберите…' : null },
          ),
          no: function () {
            self.setState({ confirm: null });
          },
          yes: function () {
            var cc = self.state.confirm;
            if (cc && cc.needRepl && !cc.repl) return;
            self.setState({ confirm: null });
            if (cc && cc.onYes) cc.onYes(cc.repl || '');
          },
        };
    base.toast = {
      on: !!st.toast,
      text: st.toast ? st.toast.text : '',
      cls: st.toast && st.toast.err ? 'a-toast-err' : '',
    };
    if (!base.ready)
      return Object.assign(base, {
        s: {},
        nav: [],
        me: {},
        crumbs: [],
        dash: { tiles: [], recent: [], tasks: [] },
        L: { filters: [], chips: [], heads: [], rows: [], cards: [], pages: [], perDD: empty, cols: { items: [] } },
        F: {
          d: {},
          set: {},
          e: {},
          em: {},
          inv: {},
          svc: {},
          tabs: [],
          t: {},
          q: {},
          kindDD: empty,
          authorDD: empty,
          tagDD: empty,
          origDD: empty,
          curDD: empty,
          tagChips: [],
          photos: [],
          photoErrors: [],
          notes: [],
          variants: [],
          linked: [],
          blocks: [],
          fmt: {},
        },
        M: { open: false },
        V: { open: false },
        ddOpen: false,
      });
    var sec = st.sec,
      me = st.me;
    var listSecs = ['figures', 'photos', 'bindings', 'infos', 'kinds', 'authors', 'tags', 'users', 'notes'];
    var formSec = { figure: 'figures', info: 'infos', kind: 'kinds', author: 'authors', tag: 'tags', user: 'users' }[
      sec
    ];
    var counts = {
      figures: db.figures.length,
      photos: db.photos.length,
      bindings: db.figureTags.length,
      infos: db.infos.length,
      kinds: db.kinds.length,
      authors: db.authors.length,
      tags: db.tags.length,
      users: db.users.length,
      notes: db.userNotes.length,
    };
    var navDef = [
      ['h', 'Основная информация'],
      ['figures'],
      ['photos'],
      ['bindings'],
      ['infos'],
      ['h', 'Справочники'],
      ['kinds'],
      ['authors'],
      ['tags'],
      ['h', 'Администрирование'],
      ['users'],
      ['notes'],
    ];
    var nav = navDef.map(function (n) {
      if (n[0] === 'h') return { head: true, item: false, label: n[1] };
      var on = sec === n[0] || formSec === n[0];
      return {
        head: false,
        item: true,
        label: n[1] || self.secTitle(n[0]),
        count: counts[n[0]] != null ? counts[n[0]] : '',
        cls: on ? 'a-navi-on' : '',
        current: on ? 'page' : 'false',
        go: function () {
          self.go(n[0]);
        },
      };
    });
    var out = Object.assign(base, {
      nav: nav,
      me: {
        name: me.name || me.login,
        email: me.email,
        avatar: st.avatar || '',
        hasAvatar: !!st.avatar,
        noAvatar: !st.avatar,
        open: !!st.meOpen,
        exp: st.meOpen ? 'true' : 'false',
        toggle: function () {
          self.setState({ meOpen: !self.state.meOpen, dd: null });
        },
      },
      previewNote: st.preview,
      saving: st.saving,
      s: {
        dash: sec === 'dash',
        list: listSecs.indexOf(sec) >= 0,
        figure: sec === 'figure',
        info: sec === 'info',
        dict: sec === 'kind' || sec === 'author' || sec === 'tag',
        user: sec === 'user',
      },
      ddOpen: !!(st.dd || st.meOpen),
      ddClose: function () {
        self.setState({ dd: null, meOpen: false });
      },
      goHome: function () {
        self.go('dash');
      },
      logout: function () {
        self.guard(function () {
          try {
            window.localStorage.removeItem('sp-admin');
          } catch (e) {}
          self.setState({ me: null, meOpen: false, preview: false, denied: 'Вы вышли из админ-панели.', form: null });
        });
      },
    });
    // обзор
    var noPhoto = db.figures.filter(function (x) {
      return !self.figPhotos(db, x.id).length;
    }).length;
    out.dash = {
      hello: 'Здравствуйте, ' + (me.name || me.login) + '. Сводка по данным сайта.',
      addFigure: function () {
        self.openForm('figure', null);
      },
      tiles: [
        ['figures', 'Статуэтки'],
        ['photos', 'Фотографии'],
        ['authors', 'Авторы'],
        ['infos', 'Статьи'],
      ].map(function (t) {
        return {
          n: counts[t[0]],
          l: t[1],
          go: function () {
            self.go(t[0]);
          },
        };
      }),
      sync:
        'Сайт читает данные сразу после сохранения — задержки из-за кэша нет. Последнее сохранение: ' +
        (db.lastSave ? this.fmt(db.lastSave, true) : 'ещё не было') +
        '.',
      tasks: [
        ['Статуэтки без фото', noPhoto, { photo: 'no' }],
        [
          'Без автора',
          db.figures.filter(function (x) {
            return !x.authorId;
          }).length,
          { author: 'none' },
        ],
        [
          'Без производителя',
          db.figures.filter(function (x) {
            return !x.factoryName;
          }).length,
          { factory: 'none' },
        ],
        [
          'С неизвестными размерами',
          db.figures.filter(function (x) {
            return x.height == null || x.length == null;
          }).length,
          { size: 'unknown' },
        ],
      ].map(function (t) {
        return {
          l: t[0],
          n: t[1],
          has: t[1] > 0,
          go: function () {
            self.openList('figures', t[2]);
          },
        };
      }),
    };
    var recent = [];
    db.figures.forEach(function (x) {
      recent.push({
        type: 'Статуэтка',
        title: x.name,
        ts: x.modifyDate,
        go: function () {
          self.openForm('figure', x.id);
        },
      });
    });
    db.infos.forEach(function (x) {
      recent.push({
        type: 'Статья',
        title: x.name,
        ts: x.modifyDate,
        go: function () {
          self.openForm('info', x.id);
        },
      });
    });
    db.authors.forEach(function (x) {
      recent.push({
        type: 'Автор',
        title: x.name,
        ts: x.modifyDate,
        go: function () {
          self.openForm('author', x.id);
        },
      });
    });
    recent.sort(function (a, b) {
      return (a.ts || '') < (b.ts || '') ? 1 : -1;
    });
    out.dash.recent = recent.slice(0, 8).map(function (r) {
      return Object.assign(r, { date: self.fmt(r.ts, true) });
    });
    out.dash.noRecent = !recent.length;
    out.L = out.s.list
      ? this.buildList(sec)
      : { filters: [], chips: [], heads: [], rows: [], cards: [], pages: [], perDD: empty, cols: { items: [] } };
    out.F = st.form
      ? this.formVals()
      : {
          d: {},
          set: {},
          e: {},
          em: {},
          inv: {},
          svc: {},
          tabs: [],
          t: {},
          q: {},
          kindDD: empty,
          authorDD: empty,
          tagDD: empty,
          origDD: empty,
          curDD: empty,
          tagChips: [],
          photos: [],
          photoErrors: [],
          notes: [],
          variants: [],
          linked: [],
          blocks: [],
          fmt: {},
        };
    var fm = st.form;
    out.crumbs = !fm
      ? []
      : (function () {
          var secOf = formSec,
            rec = fm.id == null ? null : self.find(self.coll(fm.type), fm.id);
          var nm =
            fm.id == null
              ? out.F.heading
              : fm.type === 'tag'
                ? rec.tagText
                : fm.type === 'user'
                  ? rec.name || rec.login
                  : rec.name;
          var list = [
            {
              l: self.secTitle(secOf),
              link: true,
              last: false,
              go: function () {
                self.go(secOf);
              },
            },
          ];
          if (fm.id == null) list.push({ l: nm, link: false, last: true });
          else {
            list.push({
              l: nm,
              link: true,
              last: false,
              go: function () {
                if (self.state.form) self.setF({ tab: 'main', prev: false });
              },
            });
            list.push({ l: 'Редактирование', link: false, last: true });
          }
          return list;
        })();
    out.M = this.modalVals();
    out.V = st.viewer
      ? {
          open: true,
          src: st.viewer.src,
          caption: st.viewer.caption,
          close: function () {
            self.setState({ viewer: null });
          },
        }
      : { open: false };
    return out;
  }
  renderVals() {
    var v = this.viewVals(),
      L = [
        'F.authorDD.opts',
        'F.blocks',
        'F.curDD.opts',
        'F.kindDD.opts',
        'F.linked',
        'F.notes',
        'F.origDD.opts',
        'F.photoErrors',
        'F.photos',
        'F.tabs',
        'F.tagChips',
        'F.tagDD.opts',
        'F.variants',
        'L.cards',
        'L.chips',
        'L.cols.items',
        'L.filters',
        'L.heads',
        'L.pages',
        'L.perDD.opts',
        'L.rows',
        'M.curDD.opts',
        'M.figDD.opts',
        'M.tagChips',
        'M.tagDD.opts',
        'M.userDD.opts',
        'confirm.linked',
        'confirm.replDD.opts',
        'crumbs',
        'dash.recent',
        'dash.tasks',
        'dash.tiles',
        'nav',
      ],
      H = [
        'F.addNote',
        'F.addPhotos',
        'F.adminHint',
        'F.allLinked',
        'F.authorDD.disabled',
        'F.authorDD.exp',
        'F.authorDD.inv',
        'F.authorDD.label',
        'F.authorDD.none',
        'F.authorDD.open',
        'F.authorDD.q',
        'F.authorDD.searchable',
        'F.authorDD.setQ',
        'F.authorDD.toggle',
        'F.authorDD.wCls',
        'F.canDelete',
        'F.cancel',
        'F.cancelReplace',
        'F.curDD.disabled',
        'F.curDD.exp',
        'F.curDD.inv',
        'F.curDD.label',
        'F.curDD.none',
        'F.curDD.open',
        'F.curDD.q',
        'F.curDD.searchable',
        'F.curDD.setQ',
        'F.curDD.toggle',
        'F.curDD.wCls',
        'F.d.comment',
        'F.d.email',
        'F.d.factoryName',
        'F.d.final',
        'F.d.height',
        'F.d.infoDate',
        'F.d.isAdmin',
        'F.d.length',
        'F.d.login',
        'F.d.name',
        'F.d.p1',
        'F.d.p2',
        'F.d.sourceText',
        'F.d.sourceUrl',
        'F.d.text',
        'F.d.visible',
        'F.del',
        'F.delText',
        'F.dirtyCls',
        'F.dirtyText',
        'F.e.email',
        'F.e.height',
        'F.e.infoDate',
        'F.e.kind',
        'F.e.length',
        'F.e.login',
        'F.e.name',
        'F.e.p1',
        'F.e.p2',
        'F.e.sourceUrl',
        'F.editCls',
        'F.editing',
        'F.em.email',
        'F.em.height',
        'F.em.infoDate',
        'F.em.kind',
        'F.em.length',
        'F.em.login',
        'F.em.name',
        'F.em.p1',
        'F.em.p2',
        'F.em.sourceUrl',
        'F.errorText',
        'F.fmt.a',
        'F.fmt.b',
        'F.fmt.h',
        'F.fmt.i',
        'F.fmt.q',
        'F.fmt.ul',
        'F.hasErrors',
        'F.hasNotes',
        'F.hasReplace',
        'F.hasSimilar',
        'F.hasSource',
        'F.hasSub',
        'F.hasView',
        'F.heading',
        'F.inv.email',
        'F.inv.height',
        'F.inv.infoDate',
        'F.inv.length',
        'F.inv.login',
        'F.inv.name',
        'F.inv.p1',
        'F.inv.p2',
        'F.inv.sourceUrl',
        'F.isAuthor',
        'F.isKind',
        'F.isMe',
        'F.isNew',
        'F.kindDD.disabled',
        'F.kindDD.exp',
        'F.kindDD.inv',
        'F.kindDD.label',
        'F.kindDD.none',
        'F.kindDD.open',
        'F.kindDD.q',
        'F.kindDD.searchable',
        'F.kindDD.setQ',
        'F.kindDD.toggle',
        'F.kindDD.wCls',
        'F.linkedCount',
        'F.linkedTitle',
        'F.moreLinked',
        'F.nameLabel',
        'F.noLinked',
        'F.noNotes',
        'F.noPhotos',
        'F.noTags',
        'F.noVariants',
        'F.noteCount',
        'F.openNotes',
        'F.origDD.disabled',
        'F.origDD.exp',
        'F.origDD.inv',
        'F.origDD.label',
        'F.origDD.none',
        'F.origDD.open',
        'F.origDD.q',
        'F.origDD.searchable',
        'F.origDD.setQ',
        'F.origDD.toggle',
        'F.origDD.wCls',
        'F.passHint',
        'F.passTitle',
        'F.prevCls',
        'F.prevDate',
        'F.prevTitle',
        'F.preview',
        'F.q.add',
        'F.q.cancel',
        'F.q.err',
        'F.q.hasErr',
        'F.q.label',
        'F.q.name',
        'F.q.on',
        'F.q.setName',
        'F.quickAuthor',
        'F.quickKind',
        'F.quickTag',
        'F.replaceFile',
        'F.save',
        'F.saveText',
        'F.set.adminBox',
        'F.set.comment',
        'F.set.email',
        'F.set.factoryName',
        'F.set.finalBox',
        'F.set.height',
        'F.set.infoDate',
        'F.set.length',
        'F.set.login',
        'F.set.name',
        'F.set.p1',
        'F.set.p2',
        'F.set.sourceText',
        'F.set.sourceUrl',
        'F.set.text',
        'F.set.visibleBox',
        'F.showLinked',
        'F.showNotes',
        'F.similar',
        'F.sourceLabel',
        'F.sub',
        'F.svc.created',
        'F.svc.createdBy',
        'F.svc.modified',
        'F.svc.modifiedBy',
        'F.t.links',
        'F.t.main',
        'F.t.notes',
        'F.t.photos',
        'F.t.svc',
        'F.tagDD.disabled',
        'F.tagDD.exp',
        'F.tagDD.inv',
        'F.tagDD.label',
        'F.tagDD.none',
        'F.tagDD.open',
        'F.tagDD.q',
        'F.tagDD.searchable',
        'F.tagDD.setQ',
        'F.tagDD.toggle',
        'F.tagDD.wCls',
        'F.toEdit',
        'F.toPrev',
        'F.uploadLeft',
        'F.uploading',
        'F.urlOk',
        'F.variantCount',
        'F.view',
        'F.viewHref',
        'F.visHint',
        'L.add',
        'L.addText',
        'L.cols.exp',
        'L.cols.open',
        'L.cols.toggle',
        'L.cols.wCls',
        'L.count',
        'L.export',
        'L.exportHint',
        'L.filtered',
        'L.first',
        'L.grid',
        'L.has',
        'L.hasAdd',
        'L.hasCols',
        'L.isGrid',
        'L.isTable',
        'L.last',
        'L.next',
        'L.noMatch',
        'L.noNext',
        'L.noPrev',
        'L.none',
        'L.noneText',
        'L.noneTitle',
        'L.perDD.disabled',
        'L.perDD.exp',
        'L.perDD.inv',
        'L.perDD.label',
        'L.perDD.none',
        'L.perDD.open',
        'L.perDD.q',
        'L.perDD.searchable',
        'L.perDD.setQ',
        'L.perDD.toggle',
        'L.perDD.wCls',
        'L.prev',
        'L.q',
        'L.range',
        'L.reset',
        'L.searchHint',
        'L.setQ',
        'L.title',
        'M.busy',
        'M.cancel',
        'M.curDD.disabled',
        'M.curDD.exp',
        'M.curDD.inv',
        'M.curDD.label',
        'M.curDD.none',
        'M.curDD.open',
        'M.curDD.q',
        'M.curDD.searchable',
        'M.curDD.setQ',
        'M.curDD.toggle',
        'M.curDD.wCls',
        'M.d.comment1',
        'M.d.comment2',
        'M.d.comment3',
        'M.d.enable',
        'M.d.isMain',
        'M.d.pictureCompressed',
        'M.d.price',
        'M.dup',
        'M.err',
        'M.figDD.disabled',
        'M.figDD.exp',
        'M.figDD.inv',
        'M.figDD.label',
        'M.figDD.none',
        'M.figDD.open',
        'M.figDD.q',
        'M.figDD.searchable',
        'M.figDD.setQ',
        'M.figDD.toggle',
        'M.figDD.wCls',
        'M.fileLabel',
        'M.hasDup',
        'M.hasErr',
        'M.hasImg',
        'M.hasSvc',
        'M.inv.price',
        'M.isBind',
        'M.isNote',
        'M.isPhoto',
        'M.open',
        'M.pickFile',
        'M.save',
        'M.saveText',
        'M.set.comment1',
        'M.set.comment2',
        'M.set.comment3',
        'M.set.enableBox',
        'M.set.mainBox',
        'M.set.price',
        'M.svc.created',
        'M.svc.createdBy',
        'M.svc.modified',
        'M.svc.modifiedBy',
        'M.tagDD.disabled',
        'M.tagDD.exp',
        'M.tagDD.inv',
        'M.tagDD.label',
        'M.tagDD.none',
        'M.tagDD.open',
        'M.tagDD.q',
        'M.tagDD.searchable',
        'M.tagDD.setQ',
        'M.tagDD.toggle',
        'M.tagDD.wCls',
        'M.tagLabel',
        'M.title',
        'M.userDD.disabled',
        'M.userDD.exp',
        'M.userDD.inv',
        'M.userDD.label',
        'M.userDD.none',
        'M.userDD.open',
        'M.userDD.q',
        'M.userDD.searchable',
        'M.userDD.setQ',
        'M.userDD.toggle',
        'M.userDD.wCls',
        'V.caption',
        'V.close',
        'V.open',
        'V.src',
        'confirm.alt',
        'confirm.altText',
        'confirm.hasAlt',
        'confirm.hasLinked',
        'confirm.hasRepl',
        'confirm.hasYes',
        'confirm.linkedCount',
        'confirm.more',
        'confirm.moreText',
        'confirm.no',
        'confirm.noText',
        'confirm.open',
        'confirm.replDD.disabled',
        'confirm.replDD.exp',
        'confirm.replDD.inv',
        'confirm.replDD.label',
        'confirm.replDD.none',
        'confirm.replDD.open',
        'confirm.replDD.q',
        'confirm.replDD.searchable',
        'confirm.replDD.setQ',
        'confirm.replDD.toggle',
        'confirm.replDD.wCls',
        'confirm.replLabel',
        'confirm.text',
        'confirm.title',
        'confirm.yes',
        'confirm.yesCls',
        'confirm.yesDisabled',
        'confirm.yesText',
        'dash.addFigure',
        'dash.hello',
        'dash.noRecent',
        'dash.sync',
        'ddClose',
        'ddOpen',
        'denied',
        'deniedText',
        'false',
        'goHome',
        'loadError',
        'loadErrorText',
        'loading',
        'logout',
        'me.avatar',
        'me.email',
        'me.exp',
        'me.hasAvatar',
        'me.name',
        'me.noAvatar',
        'me.open',
        'me.toggle',
        'previewNote',
        'ready',
        's.dash',
        's.dict',
        's.figure',
        's.info',
        's.list',
        's.user',
        'saving',
        'toast.cls',
        'toast.on',
        'toast.text',
        'true',
      ];
    function put(path, val) {
      var ks = path.split('.'),
        o = v;
      for (var i = 0; i < ks.length - 1; i++) {
        if (o[ks[i]] == null) o[ks[i]] = {};
        else if (typeof o[ks[i]] !== 'object') return;
        o = o[ks[i]];
      }
      var k = ks[ks.length - 1];
      if (o[k] === undefined) o[k] = val;
    }
    L.forEach(function (x) {
      put(x, []);
    });
    H.forEach(function (x) {
      put(x, '');
    });
    return v;
  }
}

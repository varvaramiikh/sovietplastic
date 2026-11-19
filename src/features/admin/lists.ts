/* Сгенерировано из original-export/project/Admin.dc.html (часть класса Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { AdminActions } from './actions';

/** Конфигурации всех списков: колонки, фильтры, сортировка, пагинация, экспорт. */
export class AdminLists extends AdminActions {
  buildList(sec) {
    var self = this,
      db = this.state.db,
      st = this.ls(sec),
      f = st.f,
      q = this.norm(st.q),
      cfg;
    var T = function (t, cls) {
      return { isText: true, t: t == null || t === '' ? '—' : t, cls: cls || '' };
    };
    var Lk = function (t, go) {
      return { isLink: true, isText: false, t: t, go: go };
    };
    var Th = function (src) {
      return { isThumb: true, isText: false, src: src, hasSrc: !!src, noSrc: !src };
    };
    var B = function (t, cls) {
      return { isBadge: true, isText: false, t: t, cls: cls };
    };
    var Mn = function (key, items) {
      return {
        isMenu: true,
        isText: false,
        edit: items[0][1],
        editText: 'Изменить',
        dd: self.menu(key, items.slice(1)),
      };
    };
    var none = function (t) {
      return T(t, 'a-muted');
    };
    var cnt = function (fn) {
      return db.figures.filter(fn).length;
    };
    var fopt = function (all) {
      return [['', all]];
    };
    var figOpts = db.figures
      .slice()
      .sort(function (a, b) {
        return a.id - b.id;
      })
      .map(function (x) {
        return [x.id, x.name + ' · ID ' + x.id, self.mainThumb(db, x)];
      });
    var tagOpts = db.tags
      .slice()
      .sort(function (a, b) {
        return a.tagText.localeCompare(b.tagText, 'ru');
      })
      .map(function (t) {
        return [t.id, t.tagText];
      });
    if (sec === 'figures') {
      var factories = [];
      db.figures.forEach(function (x) {
        if (x.factoryName && factories.indexOf(x.factoryName) < 0) factories.push(x.factoryName);
      });
      factories.sort();
      var C = this.state.cols,
        extra = [
          ['source', 'Источник'],
          ['comment', 'Комментарий'],
          ['final', 'final'],
          ['modified', 'Изменено'],
        ].filter(function (c) {
          return C[c[0]];
        });
      cfg = {
        addText: '+ Добавить статуэтку',
        add: function () {
          self.openForm('figure', null);
        },
        searchHint: 'Название или ID',
        filters: [
          {
            k: 'kind',
            l: 'Все типы',
            o: db.kinds.map(function (k) {
              return [k.id, k.name];
            }),
          },
          {
            k: 'author',
            l: 'Все авторы',
            o: [['none', 'Автор не указан']].concat(
              db.authors.map(function (a) {
                return [a.id, a.name];
              }),
            ),
          },
          {
            k: 'factory',
            l: 'Все производители',
            o: [['none', 'Производитель не указан']].concat(
              factories.map(function (x) {
                return [x, x];
              }),
            ),
          },
          { k: 'tag', l: 'Все метки', o: tagOpts },
          {
            k: 'visible',
            l: 'Любая видимость',
            o: [
              ['yes', 'Показываются на сайте'],
              ['no', 'Скрыты'],
            ],
          },
          {
            k: 'photo',
            l: 'С фото и без',
            o: [
              ['yes', 'Есть фото'],
              ['no', 'Нет фото'],
            ],
          },
          {
            k: 'size',
            l: 'Любые размеры',
            o: [
              ['unknown', 'Размеры не указаны'],
              ['known', 'Размеры указаны'],
            ],
          },
        ],
        rows: db.figures.filter(function (x) {
          if (q && self.norm(x.name).indexOf(q) < 0 && String(x.id) !== q) return false;
          if (f.kind && String(x.kindId) !== String(f.kind)) return false;
          if (f.author && (f.author === 'none' ? x.authorId : String(x.authorId) !== String(f.author))) return false;
          if (f.factory && (f.factory === 'none' ? x.factoryName : x.factoryName !== f.factory)) return false;
          if (f.tag && self.figTags(db, x.id).map(String).indexOf(String(f.tag)) < 0) return false;
          if (f.visible && (f.visible === 'yes') !== !!x.visible) return false;
          var hp = self.figPhotos(db, x.id).length > 0;
          if (f.photo && (f.photo === 'yes') !== hp) return false;
          var unk = x.height == null || x.length == null;
          if (f.size && (f.size === 'unknown') !== unk) return false;
          return true;
        }),
        sorts: {
          id: function (x) {
            return x.id;
          },
          name: function (x) {
            return self.norm(x.name);
          },
          kind: function (x) {
            return self.norm(self.kindName(db, x.kindId));
          },
          author: function (x) {
            return self.norm(self.authorName(db, x.authorId)) || '￿';
          },
          factory: function (x) {
            return self.norm(x.factoryName) || '￿';
          },
          height: function (x) {
            return x.height == null ? 1e9 : x.height;
          },
          length: function (x) {
            return x.length == null ? 1e9 : x.length;
          },
          modified: function (x) {
            return x.modifyDate || '';
          },
        },
        defSort: 'modified',
        defDir: -1,
        heads: [
          ['Фото'],
          ['ID', 'id'],
          ['Название', 'name'],
          ['Тип', 'kind'],
          ['Автор', 'author'],
          ['Производитель', 'factory'],
          ['Высота, см', 'height'],
          ['Длина, см', 'length'],
        ]
          .concat(
            extra.map(function (c) {
              return [c[1], c[0] === 'modified' ? 'modified' : null];
            }),
          )
          .concat([['Видимость'], ['', null, 'right']]),
        grid:
          '64px 56px minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) 92px 92px' +
          extra
            .map(function () {
              return ' minmax(0,1fr)';
            })
            .join('') +
          ' 130px 210px',
        cells: function (x) {
          var c = [
            Th(self.mainThumb(db, x)),
            T(x.id, 'a-muted'),
            Lk(x.name, function () {
              self.openForm('figure', x.id);
            }),
            T(self.kindName(db, x.kindId) || '—'),
            x.authorId ? T(self.authorName(db, x.authorId)) : none('Не указан'),
            x.factoryName ? T(x.factoryName) : none('Не указан'),
            x.height == null ? none('Не указана') : T(self.num(x.height)),
            x.length == null ? none('Не указана') : T(self.num(x.length)),
          ];
          extra.forEach(function (e) {
            c.push(
              e[0] === 'source'
                ? T(x.sourceText)
                : e[0] === 'comment'
                  ? T(x.comment ? x.comment.slice(0, 60) : '', 'a-muted')
                  : e[0] === 'final'
                    ? T(x.final ? 'да' : 'нет', 'a-muted')
                    : T(self.fmt(x.modifyDate), 'a-muted'),
            );
          });
          c.push(B(x.visible ? 'Показывается' : 'Скрыта', x.visible ? 'a-pub' : 'a-hid'));
          c.push(
            Mn('m-f-' + x.id, [
              [
                'Открыть карточку',
                function () {
                  self.openForm('figure', x.id);
                },
              ],
              [
                'Фотографии',
                function () {
                  self.openForm('figure', x.id, 'photos');
                },
              ],
              [
                x.visible ? 'Скрыть с сайта' : 'Показать на сайте',
                function () {
                  self.toggleVisible('figure', x.id);
                },
              ],
              [
                'Удалить',
                function () {
                  self.delRecord('figure', x.id);
                },
              ],
            ]),
          );
          return c;
        },
        exp: [
          ['ID', 'id'],
          ['Название', 'name'],
          [
            'Тип',
            function (x) {
              return self.kindName(db, x.kindId);
            },
          ],
          [
            'Автор',
            function (x) {
              return self.authorName(db, x.authorId);
            },
          ],
          ['Производитель', 'factoryName'],
          [
            'Высота, см',
            function (x) {
              return self.num(x.height);
            },
          ],
          [
            'Длина, см',
            function (x) {
              return self.num(x.length);
            },
          ],
          [
            'Показывать на сайте',
            function (x) {
              return x.visible ? 'да' : 'нет';
            },
          ],
          ['Источник', 'sourceText'],
          ['Ссылка на источник', 'sourceUrl'],
          [
            'final',
            function (x) {
              return x.final ? 'да' : 'нет';
            },
          ],
          ['Комментарий', 'comment'],
          [
            'Метки',
            function (x) {
              return self
                .figTags(db, x.id)
                .map(function (t) {
                  var g = self.find(db.tags, t);
                  return g ? g.tagText : '';
                })
                .join(', ');
            },
          ],
          [
            'Фото, шт.',
            function (x) {
              return self.figPhotos(db, x.id).length;
            },
          ],
          ['OriginalID', 'originalId'],
          ['Создано', 'createDate'],
          ['Кем создано', 'createdBy'],
          ['Изменено', 'modifyDate'],
          ['Кем изменено', 'modifiedBy'],
        ],
        noneTitle: 'Статуэток пока нет',
        noneText: 'Добавьте первую статуэтку.',
        cols: [
          ['source', 'Источник'],
          ['comment', 'Комментарий'],
          ['final', 'final'],
          ['modified', 'Изменено'],
        ],
      };
    } else if (sec === 'photos') {
      cfg = {
        addText: '+ Добавить фотографии',
        add: function () {
          self.photoModal(null);
        },
        searchHint: 'Название или ID статуэтки',
        filters: [
          { k: 'fig', l: 'Все статуэтки', o: figOpts },
          {
            k: 'main',
            l: 'Все фото',
            o: [
              ['yes', 'Главные'],
              ['no', 'Дополнительные'],
            ],
          },
        ],
        rows: db.photos.filter(function (p) {
          var fg = self.find(db.figures, p.figureId);
          if (q && !(fg && (self.norm(fg.name).indexOf(q) >= 0 || String(fg.id) === q))) return false;
          if (f.fig && String(p.figureId) !== String(f.fig)) return false;
          if (f.main && (f.main === 'yes') !== !!p.isMain) return false;
          return true;
        }),
        sorts: {
          fig: function (p) {
            return p.figureId * 1000 + (p.isMain ? 0 : p.sort || 1);
          },
        },
        defSort: 'fig',
        defDir: 1,
        grid: '',
        heads: [],
        card: function (p) {
          return {
            src: p.pictureCompressed || p.picture,
            isMain: !!p.isMain,
            mainCls: p.isMain ? 'a-ph-main' : '',
            fig: self.figLabel(db, p.figureId),
            sub: (p.isMain ? 'Главное фото' : 'Дополнительное') + (p.fileName ? ' · ' + p.fileName : ''),
            viewer: function () {
              self.setState({ viewer: { src: p.picture, caption: self.figLabel(db, p.figureId) } });
            },
            openFig: function () {
              self.openForm('figure', p.figureId, 'photos');
            },
            edit: function () {
              self.photoModal(p);
            },
            dd: self.menu(
              'm-p-' + p.id,
              [
                [
                  'Просмотр',
                  function () {
                    self.setState({ viewer: { src: p.picture, caption: self.figLabel(db, p.figureId) } });
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
                    'Изменить или заменить',
                    function () {
                      self.photoModal(p);
                    },
                  ],
                  [
                    'Открыть статуэтку',
                    function () {
                      self.openForm('figure', p.figureId, 'photos');
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
        },
        exp: [
          ['ID фото', 'id'],
          ['ID статуэтки', 'figureId'],
          [
            'Статуэтка',
            function (p) {
              var x = self.find(db.figures, p.figureId);
              return x ? x.name : '';
            },
          ],
          [
            'Главное',
            function (p) {
              return p.isMain ? 'да' : 'нет';
            },
          ],
          ['Порядок', 'sort'],
          ['Файл', 'fileName'],
          ['Создано', 'createDate'],
          ['Изменено', 'modifyDate'],
        ],
        noneTitle: 'Фотографий нет',
        noneText: 'Фото добавляются здесь или во вкладке «Фотографии» карточки статуэтки.',
      };
    } else if (sec === 'bindings') {
      cfg = {
        addText: '+ Привязать метки',
        add: function () {
          self.bindModal('add', f.fig ? { figureId: Number(f.fig) } : {});
        },
        searchHint: 'Статуэтка, ID или метка',
        filters: [
          { k: 'fig', l: 'Все статуэтки', o: figOpts },
          { k: 'tag', l: 'Все метки', o: tagOpts },
        ],
        rows: db.figureTags
          .map(function (x) {
            return { id: x.figureId + '-' + x.tagId, figureId: x.figureId, tagId: x.tagId };
          })
          .filter(function (x) {
            var fg = self.find(db.figures, x.figureId),
              tg = self.find(db.tags, x.tagId);
            if (
              q &&
              !(
                (fg && (self.norm(fg.name).indexOf(q) >= 0 || String(fg.id) === q)) ||
                (tg && self.norm(tg.tagText).indexOf(q) >= 0)
              )
            )
              return false;
            if (f.fig && String(x.figureId) !== String(f.fig)) return false;
            if (f.tag && String(x.tagId) !== String(f.tag)) return false;
            return true;
          }),
        sorts: {
          fig: function (x) {
            var fg = self.find(db.figures, x.figureId);
            return fg ? self.norm(fg.name) : '';
          },
          id: function (x) {
            return x.figureId;
          },
          tag: function (x) {
            var t = self.find(db.tags, x.tagId);
            return t ? self.norm(t.tagText) : '';
          },
        },
        defSort: 'id',
        defDir: 1,
        heads: [['Фото'], ['ID', 'id'], ['Статуэтка', 'fig'], ['Метка', 'tag'], ['', null, 'right']],
        grid: '64px 56px minmax(0,2fr) minmax(0,1fr) 210px',
        cells: function (x) {
          var fg = self.find(db.figures, x.figureId),
            tg = self.find(db.tags, x.tagId);
          return [
            Th(fg ? self.mainThumb(db, fg) : ''),
            T(x.figureId, 'a-muted'),
            Lk(fg ? fg.name : 'ID ' + x.figureId, function () {
              self.openForm('figure', x.figureId);
            }),
            T(tg ? tg.tagText : '—'),
            Mn('m-b-' + x.id, [
              [
                'Заменить метку',
                function () {
                  self.bindModal('replace', { figureId: x.figureId, oldTagId: x.tagId, tagIds: [x.tagId] });
                },
              ],
              [
                'Открыть статуэтку',
                function () {
                  self.openForm('figure', x.figureId);
                },
              ],
              [
                'Удалить привязку',
                function () {
                  self.ask({
                    title: 'Удалить привязку?',
                    text:
                      'Метка «' +
                      (tg ? tg.tagText : '') +
                      '» будет отвязана от «' +
                      (fg ? fg.name : '') +
                      '». Статуэтка и метка останутся.',
                    onYes: function () {
                      var d = self.clone(self.state.db);
                      d.figureTags = d.figureTags.filter(function (y) {
                        return !(String(y.figureId) === String(x.figureId) && String(y.tagId) === String(x.tagId));
                      });
                      self.persist(d, 'Привязка удалена');
                    },
                  });
                },
              ],
            ]),
          ];
        },
        exp: [
          ['ID статуэтки', 'figureId'],
          [
            'Статуэтка',
            function (x) {
              var fg = self.find(db.figures, x.figureId);
              return fg ? fg.name : '';
            },
          ],
          ['ID метки', 'tagId'],
          [
            'Метка',
            function (x) {
              var t = self.find(db.tags, x.tagId);
              return t ? t.tagText : '';
            },
          ],
        ],
        noneTitle: 'Привязок нет',
        noneText: 'Привяжите метки к статуэткам здесь или в карточке статуэтки.',
      };
    } else if (sec === 'infos') {
      var years = [];
      db.infos.forEach(function (x) {
        var y = String(x.infoDate || '').slice(0, 4);
        if (y && years.indexOf(y) < 0) years.push(y);
      });
      years.sort().reverse();
      cfg = {
        addText: '+ Добавить статью',
        add: function () {
          self.openForm('info', null);
        },
        searchHint: 'Название статьи',
        filters: [
          {
            k: 'year',
            l: 'Любой год',
            o: years.map(function (y) {
              return [y, y + ' год'];
            }),
          },
        ],
        rows: db.infos.filter(function (x) {
          if (q && self.norm(x.name).indexOf(q) < 0) return false;
          if (f.year && String(x.infoDate || '').slice(0, 4) !== f.year) return false;
          return true;
        }),
        sorts: {
          name: function (x) {
            return self.norm(x.name);
          },
          date: function (x) {
            return x.infoDate || '';
          },
          modified: function (x) {
            return x.modifyDate || '';
          },
        },
        defSort: 'date',
        defDir: -1,
        heads: [
          ['Название', 'name'],
          ['Дата материала', 'date'],
          ['Последнее изменение', 'modified'],
          ['', null, 'right'],
        ],
        grid: 'minmax(0,1fr) 180px 220px 210px',
        cells: function (x) {
          return [
            Lk(x.name, function () {
              self.openForm('info', x.id);
            }),
            T(self.fmt(x.infoDate)),
            T(self.fmt(x.modifyDate, true) + (x.modifiedBy ? ', ' + x.modifiedBy : ''), 'a-muted'),
            Mn('m-i-' + x.id, [
              [
                'Изменить',
                function () {
                  self.openForm('info', x.id);
                },
              ],
              [
                'Предпросмотр',
                function () {
                  self.openForm('info', x.id, 'preview');
                },
              ],
              [
                'Удалить',
                function () {
                  self.delRecord('info', x.id);
                },
              ],
            ]),
          ];
        },
        exp: [
          ['ID', 'id'],
          ['Дата материала', 'infoDate'],
          ['Название', 'name'],
          ['Текст', 'text'],
          ['Источник', 'sourceText'],
          ['Ссылка на источник', 'sourceUrl'],
          ['Создано', 'createDate'],
          ['Кем создано', 'createdBy'],
          ['Изменено', 'modifyDate'],
          ['Кем изменено', 'modifiedBy'],
        ],
        noneTitle: 'Статей пока нет',
        noneText: 'Нажмите «Добавить статью», чтобы написать первую.',
      };
    } else if (sec === 'kinds' || sec === 'authors' || sec === 'tags') {
      var isK = sec === 'kinds',
        isA = sec === 'authors',
        fld = sec === 'tags' ? 'tagText' : 'name',
        type = isK ? 'kind' : isA ? 'author' : 'tag';
      var useN = function (x) {
        return isK
          ? cnt(function (y) {
              return String(y.kindId) === String(x.id);
            })
          : isA
            ? cnt(function (y) {
                return String(y.authorId) === String(x.id);
              })
            : db.figureTags.filter(function (y) {
                return String(y.tagId) === String(x.id);
              }).length;
      };
      var flt = isK
        ? [
            {
              k: 'visible',
              l: 'Любая видимость',
              o: [
                ['yes', 'Показываются'],
                ['no', 'Скрыты'],
              ],
            },
          ]
        : [];
      cfg = {
        addText: isK ? '+ Добавить тип' : isA ? '+ Добавить автора' : '+ Добавить метку',
        add: function () {
          self.openForm(type, null);
        },
        searchHint: isA ? 'Имя автора' : 'Название',
        filters: flt,
        rows: db[sec].filter(function (x) {
          if (q && self.norm(x[fld]).indexOf(q) < 0) return false;
          if (f.visible && (f.visible === 'yes') !== (x.visible !== false)) return false;
          return true;
        }),
        sorts: {
          name: function (x) {
            return self.norm(x[fld]);
          },
          n: function (x) {
            return useN(x);
          },
          modified: function (x) {
            return x.modifyDate || '';
          },
        },
        defSort: 'name',
        defDir: 1,
        heads: isK
          ? [['Название', 'name'], ['Статуэток', 'n'], ['Видимость'], ['', null, 'right']]
          : isA
            ? [
                ['Имя', 'name'],
                ['Статуэток', 'n'],
                ['Последнее изменение', 'modified'],
                ['', null, 'right'],
              ]
            : [
                ['Название', 'name'],
                ['Привязок', 'n'],
                ['', null, 'right'],
              ],
        grid: isK
          ? 'minmax(0,1fr) 120px 150px 210px'
          : isA
            ? 'minmax(0,1fr) 120px 220px 210px'
            : 'minmax(0,1fr) 120px 210px',
        cells: function (x) {
          var c = [
            Lk(x[fld], function () {
              self.openForm(type, x.id);
            }),
            T(useN(x)),
          ];
          if (isK) c.push(B(x.visible !== false ? 'Показывается' : 'Скрыт', x.visible !== false ? 'a-pub' : 'a-hid'));
          if (isA) c.push(T(self.fmt(x.modifyDate, true), 'a-muted'));
          var items = [
            [
              'Изменить',
              function () {
                self.openForm(type, x.id);
              },
            ],
            [
              isK ? 'Статуэтки этого типа' : isA ? 'Статуэтки автора' : 'Статуэтки с меткой',
              function () {
                var ff = {};
                ff[isK ? 'kind' : isA ? 'author' : 'tag'] = x.id;
                self.openList('figures', ff);
              },
            ],
          ];
          if (isK)
            items.push([
              x.visible !== false ? 'Скрыть с сайта' : 'Показать на сайте',
              function () {
                self.toggleVisible('kind', x.id);
              },
            ]);
          items.push([
            'Удалить',
            function () {
              self.delRecord(type, x.id);
            },
          ]);
          c.push(Mn('m-' + sec + '-' + x.id, items));
          return c;
        },
        exp: [
          ['ID', 'id'],
          [isA ? 'Имя' : 'Название', fld],
        ]
          .concat(
            isK
              ? [
                  [
                    'Показывать на сайте',
                    function (x) {
                      return x.visible !== false ? 'да' : 'нет';
                    },
                  ],
                ]
              : [],
          )
          .concat(
            isA
              ? [
                  ['Текст', 'text'],
                  ['Источник', 'sourceText'],
                  ['Ссылка на источник', 'sourceUrl'],
                ]
              : [],
          )
          .concat([
            [
              isK || isA ? 'Статуэток' : 'Привязок',
              function (x) {
                return useN(x);
              },
            ],
            ['Создано', 'createDate'],
            ['Кем создано', 'createdBy'],
            ['Изменено', 'modifyDate'],
            ['Кем изменено', 'modifiedBy'],
          ]),
        noneTitle: 'Справочник пуст',
        noneText: 'Добавьте первое значение.',
      };
    } else if (sec === 'users') {
      cfg = {
        addText: '+ Добавить пользователя',
        add: function () {
          self.openForm('user', null);
        },
        searchHint: 'Логин, имя или почта',
        filters: [
          {
            k: 'admin',
            l: 'Все пользователи',
            o: [
              ['yes', 'С доступом к админ-панели'],
              ['no', 'Без доступа'],
            ],
          },
        ],
        rows: db.users.filter(function (u) {
          if (q && self.norm([u.login, u.name, u.email].join(' ')).indexOf(q) < 0) return false;
          if (f.admin && (f.admin === 'yes') !== !!u.isAdmin) return false;
          return true;
        }),
        sorts: {
          login: function (u) {
            return self.norm(u.login);
          },
          name: function (u) {
            return self.norm(u.name);
          },
          email: function (u) {
            return self.norm(u.email);
          },
        },
        defSort: 'login',
        defDir: 1,
        heads: [
          ['Логин', 'login'],
          ['Имя', 'name'],
          ['Почта', 'email'],
          ['Валюта'],
          ['Админ-панель'],
          ['', null, 'right'],
        ],
        grid: 'minmax(0,1fr) minmax(0,1fr) minmax(0,1.4fr) 130px 140px 210px',
        cells: function (u) {
          return [
            Lk(u.login || '—', function () {
              self.openForm('user', u.id);
            }),
            T(u.name),
            T(u.email, 'a-muted'),
            T(self.curName(u.defaultCurrency)),
            u.isAdmin ? B('Есть доступ', 'a-pub') : T('Нет', 'a-muted'),
            Mn('m-u-' + u.id, [
              [
                'Изменить',
                function () {
                  self.openForm('user', u.id);
                },
              ],
              [
                'Заметки пользователя',
                function () {
                  self.openList('notes', { user: u.id });
                },
              ],
              [
                'Удалить',
                function () {
                  self.delRecord('user', u.id);
                },
              ],
            ]),
          ];
        },
        exp: [
          ['ID', 'id'],
          ['Логин', 'login'],
          ['Имя', 'name'],
          ['Почта', 'email'],
          ['Валюта по умолчанию', 'defaultCurrency'],
          [
            'Доступ к админ-панели',
            function (u) {
              return u.isAdmin ? 'да' : 'нет';
            },
          ],
          ['Создано', 'createDate'],
          ['Кем создано', 'createdBy'],
          ['Изменено', 'modifyDate'],
          ['Кем изменено', 'modifiedBy'],
        ],
        noneTitle: 'Пользователей нет',
        noneText: '',
      };
    } else if (sec === 'notes') {
      cfg = {
        addText: '+ Добавить заметку',
        add: function () {
          self.noteModal(null, { userId: f.user ? Number(f.user) : null, figureId: f.fig ? Number(f.fig) : null });
        },
        searchHint: 'Текст заметки',
        filters: [
          {
            k: 'user',
            l: 'Все пользователи',
            o: db.users.map(function (u) {
              return [u.id, (u.name || u.login) + ' · ' + u.login];
            }),
          },
          { k: 'fig', l: 'Все статуэтки', o: figOpts },
          {
            k: 'enable',
            l: 'Enable: любой',
            o: [
              ['yes', 'Enable: да'],
              ['no', 'Enable: нет'],
            ],
          },
        ],
        rows: db.userNotes.filter(function (n) {
          if (q && self.norm([n.comment1, n.comment2, n.comment3].join(' ')).indexOf(q) < 0) return false;
          if (f.user && String(n.userId) !== String(f.user)) return false;
          if (f.fig && String(n.figureId) !== String(f.fig)) return false;
          if (f.enable && (f.enable === 'yes') !== !!n.enable) return false;
          return true;
        }),
        sorts: {
          user: function (n) {
            return self.norm(self.userName(db, n.userId));
          },
          fig: function (n) {
            return self.norm(self.figLabel(db, n.figureId));
          },
          price: function (n) {
            return n.price == null ? -1 : n.price;
          },
        },
        defSort: 'user',
        defDir: 1,
        heads: [
          ['Пользователь', 'user'],
          ['Статуэтка', 'fig'],
          ['Заметки'],
          ['Цена', 'price'],
          ['Валюта'],
          ['Enable'],
          ['', null, 'right'],
        ],
        grid: 'minmax(0,1fr) minmax(0,1.4fr) minmax(0,1.6fr) 100px 110px 80px 210px',
        cells: function (n) {
          var txt = [n.comment1, n.comment2, n.comment3].filter(Boolean).join(' · ');
          return [
            T(self.userName(db, n.userId)),
            Lk(self.figLabel(db, n.figureId), function () {
              self.openForm('figure', n.figureId, 'notes');
            }),
            T(txt ? txt.slice(0, 80) : '', 'a-muted'),
            n.price == null ? none('Неизвестна') : T(self.num(n.price)),
            T(self.curName(n.currency), 'a-muted'),
            T(n.enable ? 'да' : 'нет', 'a-muted'),
            Mn('m-n-' + n.id, [
              [
                'Изменить',
                function () {
                  self.noteModal(n);
                },
              ],
              [
                'Открыть статуэтку',
                function () {
                  self.openForm('figure', n.figureId, 'notes');
                },
              ],
              [
                'Удалить',
                function () {
                  self.ask({
                    title: 'Удалить заметку?',
                    text:
                      'Заметка пользователя «' +
                      self.userName(db, n.userId) +
                      '» к «' +
                      self.figLabel(db, n.figureId) +
                      '» будет удалена.',
                    onYes: function () {
                      var d = self.clone(self.state.db);
                      d.userNotes = d.userNotes.filter(function (y) {
                        return y.id !== n.id;
                      });
                      self.persist(d, 'Заметка удалена');
                    },
                  });
                },
              ],
            ]),
          ];
        },
        exp: [
          ['ID', 'id'],
          [
            'Пользователь',
            function (n) {
              return self.userName(db, n.userId);
            },
          ],
          ['ID статуэтки', 'figureId'],
          [
            'Статуэтка',
            function (n) {
              var x = self.find(db.figures, n.figureId);
              return x ? x.name : '';
            },
          ],
          [
            'Enable',
            function (n) {
              return n.enable ? 'да' : 'нет';
            },
          ],
          ['Комментарий 1', 'comment1'],
          ['Комментарий 2', 'comment2'],
          ['Комментарий 3', 'comment3'],
          [
            'Цена',
            function (n) {
              return self.num(n.price);
            },
          ],
          ['Валюта', 'currency'],
          ['Создано', 'createDate'],
          ['Изменено', 'modifyDate'],
        ],
        noneTitle: 'Заметок нет',
        noneText: 'Заметки пользователей к статуэткам появятся здесь.',
      };
    }
    var sortKey = st.sort || cfg.defSort,
      dir = st.sort ? st.dir : cfg.defDir,
      sf = cfg.sorts[sortKey];
    var rows = cfg.rows.slice();
    if (sf)
      rows.sort(function (a, b) {
        var x = sf(a),
          y = sf(b);
        return (x < y ? -1 : x > y ? 1 : 0) * dir;
      });
    var total = (
      sec === 'bindings'
        ? db.figureTags
        : sec === 'notes'
          ? db.userNotes
          : sec === 'figures'
            ? db.figures
            : sec === 'infos'
              ? db.infos
              : db[sec]
    ).length;
    var per = st.per,
      pc = Math.max(1, Math.ceil(rows.length / per)),
      pg = Math.min(st.page, pc),
      from = (pg - 1) * per;
    var chips = [],
      anyF = !!st.q;
    if (st.q)
      chips.push({
        l: '«' + st.q + '»',
        remove: function () {
          self.setLs(sec, { q: '' });
        },
      });
    var filters = cfg.filters.map(function (fl) {
      var v = f[fl.k] || '';
      if (v) {
        anyF = true;
        var lab = '';
        fl.o.forEach(function (o) {
          if (String(o[0]) === String(v)) lab = o[1];
        });
        chips.push({
          l: lab,
          remove: function () {
            var nf = Object.assign({}, self.ls(sec).f);
            delete nf[fl.k];
            self.setLs(sec, { f: nf });
          },
        });
      }
      return {
        dd: self.dd('flt-' + sec + '-' + fl.k, fopt(fl.l).concat(fl.o), v, function (val) {
          var nf = Object.assign({}, self.ls(sec).f);
          if (val === '') delete nf[fl.k];
          else nf[fl.k] = val;
          self.setLs(sec, { f: nf });
        }),
      };
    });
    var pages = [];
    var lo = Math.max(1, pg - 2),
      hi = Math.min(pc, lo + 4);
    lo = Math.max(1, hi - 4);
    for (var i = lo; i <= hi; i++)
      (function (n) {
        pages.push({
          n: n,
          cls: n === pg ? 'a-page-on' : '',
          go: function () {
            self.setLs(sec, { page: n }, true);
          },
        });
      })(i);
    var expRows = function () {
      return [
        cfg.exp.map(function (c) {
          return c[0];
        }),
      ].concat(
        rows.map(function (r) {
          return cfg.exp.map(function (c) {
            return typeof c[1] === 'function' ? c[1](r) : r[c[1]];
          });
        }),
      );
    };
    var colsOpen = this.state.dd === 'cols-' + sec;
    return {
      title: this.secTitle(sec),
      count:
        (anyF ? 'Найдено ' + rows.length + ' из ' + total : 'Всего ' + total) +
        ' ' +
        this.plural(anyF ? total : total, ['запись', 'записи', 'записей']),
      hasAdd: true,
      addText: cfg.addText,
      add: cfg.add,
      searchHint: cfg.searchHint,
      q: st.q,
      setQ: function (e) {
        self.setLs(sec, { q: e.target.value });
      },
      filters: filters,
      filtered: anyF,
      chips: chips,
      reset: function () {
        self.setLs(sec, { q: '', f: {} });
      },
      hasCols: !!cfg.cols,
      cols: {
        open: colsOpen,
        exp: colsOpen ? 'true' : 'false',
        wCls: colsOpen ? 'a-dd-up' : '',
        toggle: function () {
          self.setState({ dd: colsOpen ? null : 'cols-' + sec });
        },
        items: (cfg.cols || []).map(function (c) {
          var on = !!self.state.cols[c[0]];
          return {
            l: c[1],
            on: on,
            toggle: function () {
              var x = Object.assign({}, self.state.cols);
              x[c[0]] = !on;
              self.setState({ cols: x });
            },
          };
        }),
      },
      none: total === 0,
      noneTitle: cfg.noneTitle,
      noneText: cfg.noneText,
      noMatch: total > 0 && rows.length === 0,
      has: rows.length > 0,
      isTable: !cfg.card && rows.length > 0,
      isGrid: !!cfg.card && rows.length > 0,
      grid: cfg.grid,
      heads: cfg.heads.map(function (h) {
        var on = h[1] && h[1] === sortKey;
        return {
          l: h[0],
          sortable: !!h[1],
          plain: !h[1],
          align: h[2] || 'left',
          ind: on ? (dir > 0 ? '↑' : '↓') : '',
          go: function () {
            self.setLs(sec, { sort: h[1], dir: on ? -dir : 1 }, true);
          },
        };
      }),
      rows: cfg.card
        ? []
        : rows.slice(from, from + per).map(function (r) {
            return { cells: cfg.cells(r) };
          }),
      cards: cfg.card ? rows.slice(from, from + per).map(cfg.card) : [],
      range: rows.length ? 'Строки ' + (from + 1) + '–' + Math.min(rows.length, from + per) + ' из ' + rows.length : '',
      pages: pages,
      noPrev: pg <= 1,
      noNext: pg >= pc,
      first: function () {
        self.setLs(sec, { page: 1 }, true);
      },
      prev: function () {
        self.setLs(sec, { page: pg - 1 }, true);
      },
      next: function () {
        self.setLs(sec, { page: pg + 1 }, true);
      },
      last: function () {
        self.setLs(sec, { page: pc }, true);
      },
      perDD: this.dd(
        'per-' + sec,
        [
          [25, '25'],
          [50, '50'],
          [100, '100'],
        ],
        per,
        function (v) {
          self.setLs(sec, { per: Number(v) });
        },
      ),
      exportHint:
        'Экспорт выгружает все найденные строки (' +
        rows.length +
        ') с учётом поиска и фильтров' +
        (sec === 'users' ? '. Пароли не выгружаются.' : '.'),
      export: function () {
        if (!rows.length) {
          self.toast('Нечего выгружать: список пуст.', true);
          return;
        }
        self.download('karbolit-' + sec + '-' + new Date().toISOString().slice(0, 10) + '.csv', expRows());
      },
    };
  }
}

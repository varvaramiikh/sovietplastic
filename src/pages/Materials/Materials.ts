/* Сгенерировано из original-export/project/Materials.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { DCLogic } from '../../runtime/DCLogic';
import { readArticlesFromDb } from '../../data/articlesFromDb';

export default class MaterialsLogic extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { type: 'all' };
  }
  spArticles() {
    return readArticlesFromDb();
  }
  renderVals() {
    var self = this;
    var ALL = [
      {
        type: '',
        title: 'Название статьи',
        text: 'Краткое описание: о чём статья и зачем её читать.',
        bg: '#DBE2EA',
        h: '82%',
        mb: '-6px',
      },
      {
        type: 'Справка',
        title: 'Название статьи средней длины',
        text: 'Краткое описание в одно-два предложения.',
        bg: '#C9D5E5',
        h: '190%',
        mb: '-40%',
      },
      {
        type: 'Статья',
        title: 'Длинное название статьи, которое занимает две строки в списке статей',
        text: 'Краткое описание: о чём статья и зачем её читать.',
        bg: '#DBE2EA',
        h: '70%',
        mb: '0px',
      },
      {
        type: 'Справка',
        title: 'Название статьи',
        text: 'Краткое описание в одно-два предложения.',
        bg: '#C9D5E5',
        h: '160%',
        mb: '-20%',
      },
      {
        type: 'Статья',
        title: 'Название статьи средней длины',
        text: 'Краткое описание: о чём статья и зачем её читать.',
        bg: '#DBE2EA',
        h: '88%',
        mb: '-10px',
      },
    ];
    var dbA = this.spArticles();
    if (dbA) ALL = dbA;
    var filters = [
      { key: 'all', label: 'Все' },
      { key: 'Статья', label: 'Статьи' },
      { key: 'Справка', label: 'Справки' },
    ];
    var cur = this.state.type;
    return {
      tabs: filters.map(function (f) {
        var n =
          f.key === 'all'
            ? ALL.length
            : ALL.filter(function (m) {
                return m.type === f.key;
              }).length;
        return {
          label: f.label,
          count: n,
          cls: f.key === cur ? 'sp-tab-on' : '',
          pressed: f.key === cur ? 'true' : 'false',
          pick: function () {
            self.setState({ type: f.key });
          },
        };
      }),
      items: ALL.filter(function (m) {
        return cur === 'all' || m.type === cur;
      }).map(function (m, n) {
        return Object.assign({}, m, {
          date: m.date || '00 месяц 0000',
          img:
            m.cover ||
            ['/images/placeholder-ballerina.svg', '/images/placeholder-boxer.svg', '/images/placeholder-skater.svg'][
              n % 3
            ],
        });
      }),
    };
  }
}

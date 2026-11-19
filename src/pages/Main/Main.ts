/* Сгенерировано из original-export/project/Main.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { WishlistLogic } from '../../features/wishlist/WishlistLogic';
import { readFiguresFromDb } from '../../data/figuresFromDb';
import { demoMainFigures } from '../../data/demo/demoMainFigures';

export default class MainLogic extends WishlistLogic {
  constructor(props) {
    super(props);
    var ids = [];
    for (var i = 1; i <= 24; i++) ids.push(i);
    for (var j = ids.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var t = ids[j];
      ids[j] = ids[r];
      ids[r] = t;
    }
    this.state = { picks: ids.slice(0, 8), slide: 0 };
  }
  componentDidMount() {
    this.spInit();
    var self = this;
    var still = false;
    try {
      still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    if (!still)
      this.timer = setInterval(function () {
        self.setState({ slide: (self.state.slide + 1) % 3 });
      }, 6000);
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  goSlide(n) {
    var self = this;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        self.setState({ slide: (self.state.slide + 1) % 3 });
      }, 6000);
    }
    this.setState({ slide: (n + 3) % 3 });
  }
  spFromDb() {
    return readFiguresFromDb();
  }
  spItems() {
    var fromDb = this.spFromDb();
    if (fromDb) return fromDb;
    return demoMainFigures();
  }
  fmtDate(iso) {
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
    var p = iso.split('-');
    return parseInt(p[2], 10) + ' ' + m[parseInt(p[1], 10) - 1] + ' ' + p[0];
  }
  renderVals() {
    var self = this;
    var all = this.spItems();
    var NEWS = [
      {
        iso: '2026-11-12',
        label: 'Коллекция',
        title: 'В коллекцию добавлены [N] новых статуэток',
        cta: 'Смотреть коллекцию',
        href: '/catalog',
        img: '/images/placeholder-skater.svg',
      },
      {
        iso: '2026-11-05',
        label: 'Статьи',
        title: 'Новый материал: «Название материала»',
        cta: 'Читать статью',
        href: '/article',
        img: '/images/placeholder-ballerina.svg',
      },
      {
        iso: '2026-10-28',
        label: 'Сайт',
        title: 'Обновлён раздел «О карболите»',
        cta: 'Читать статью',
        href: '/carbolite',
        img: '/images/placeholder-boxer.svg',
      },
    ];
    var latest = NEWS.reduce(function (a, n) {
      return n.iso > a ? n.iso : a;
    }, '0000');
    var fresh = Date.now() - new Date(latest + 'T00:00:00').getTime() < 90 * 24 * 3600 * 1000;
    var mode = this.props.newsMode || 'auto';
    var showNews = mode === 'show' ? true : mode === 'hide' ? false : fresh;
    var cur = this.state.slide % NEWS.length;
    var pickIt = this.state.picks
      .map(function (id) {
        return all.filter(function (x) {
          return x.id === id;
        })[0];
      })
      .filter(Boolean);
    if (pickIt.length < Math.min(8, all.length))
      pickIt = pickIt
        .concat(
          all.filter(function (x) {
            return pickIt.indexOf(x) < 0;
          }),
        )
        .slice(0, 8);
    var picks = pickIt.map(function (it) {
      return Object.assign(
        {},
        it,
        {
          go: function () {
            self.spStore('sp-item', it.id);
          },
        },
        self.spMark(it),
      );
    });
    return {
      showNews: showNews,
      trackTx: 'translateX(-' + cur * 100 + '%)',
      prevNews: function () {
        self.goSlide(cur - 1);
      },
      nextNews: function () {
        self.goSlide(cur + 1);
      },
      news: NEWS.map(function (n, k) {
        return Object.assign({}, n, {
          date: self.fmtDate(n.iso),
          num: k + 1,
          dotCls: k === cur ? 'k-dot-on' : '',
          current: k === cur ? 'true' : 'false',
          hidden: k === cur ? 'false' : 'true',
          tab: k === cur ? '0' : '-1',
          pick: function () {
            self.goSlide(k);
          },
        });
      }),
      plan: this.spPlan(),
      gate: this.spGate(),
      picks: picks,
      posts: [
        {
          date: '00 месяц 0000',
          title: 'Название материала',
          text: 'Краткое описание: о чём материал и зачем его читать.',
          href: '/article',
          bg: '#DBE2EA',
          img: '/images/placeholder-ballerina.svg',
          h: '82%',
          mb: '6%',
        },
        {
          date: '00 месяц 0000',
          title: 'Новость о коллекции средней длины',
          text: 'Краткое описание новости в одно-два предложения.',
          href: '/catalog',
          bg: '#C9D5E5',
          img: '/images/placeholder-skater.svg',
          h: '82%',
          mb: '6%',
        },
        {
          date: '00 месяц 0000',
          title: 'Длинное название материала, которое занимает две строки',
          text: 'Краткое описание: о чём материал и зачем его читать.',
          href: '/article',
          bg: '#DBE2EA',
          img: '/images/placeholder-boxer.svg',
          h: '74%',
          mb: '6%',
        },
      ],
    };
  }
}

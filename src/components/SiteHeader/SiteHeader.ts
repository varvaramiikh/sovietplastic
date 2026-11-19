/* Сгенерировано из original-export/project/SiteHeader.dc.html (класс Component) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
// @ts-nocheck
import { signOut as serverSignOut } from '../../features/auth/auth';
import { DCLogic } from '../../runtime/DCLogic';

export default class SiteHeaderLogic extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { signedIn: null, avatar: '', menuOpen: false };
  }
  componentDidMount() {
    var self = this;
    this.spRead();
    this._sync = function () {
      self.spRead();
    };
    try {
      window.addEventListener('storage', this._sync);
      window.addEventListener('focus', this._sync);
    } catch (e) {}
  }
  componentWillUnmount() {
    try {
      window.removeEventListener('storage', this._sync);
      window.removeEventListener('focus', this._sync);
    } catch (e) {}
  }
  spRead() {
    try {
      var auth = window.localStorage.getItem('sp-auth') === '1';
      var prof = JSON.parse(window.localStorage.getItem('sp-profile') || '{}') || {};
      this.setState({ signedIn: auth ? true : null, avatar: prof.avatar || '' });
    } catch (e) {}
  }
  renderVals() {
    var self = this;
    var cur = this.props.current || '';
    var signed = this.state.signedIn === null ? !!this.props.signedIn : this.state.signedIn;
    var links = [
      { key: 'catalog', label: 'Коллекция', href: '/catalog' },
      { key: 'materials', label: 'Статьи', href: '/articles' },
    ].map(function (l) {
      return Object.assign({}, l, { active: l.key === cur });
    });
    return {
      links: links,
      signedIn: signed,
      signedOut: !signed,
      avatar: this.state.avatar,
      hasAvatar: !!this.state.avatar,
      noAvatar: !this.state.avatar,
      menuOpen: this.state.menuOpen,
      menuExpanded: this.state.menuOpen ? 'true' : 'false',
      signOut: function () { serverSignOut().catch(() => alert('Не удалось выйти. Проверьте сервер и повторите.')); },
      toggleMenu: function () {
        self.setState({ menuOpen: !self.state.menuOpen });
      },
    };
  }
}

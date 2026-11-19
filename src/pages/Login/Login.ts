// @ts-nocheck
import { DCLogic } from '../../runtime/DCLogic';
import { authRequest, cacheUser } from '../../features/auth/auth';

export default class LoginLogic extends DCLogic {
  constructor(props) { super(props); this.state = { mode: props.mode || 'login', login: '', name: '', email: '', pass: '', pass2: '', code: '', error: '', message: '', busy: false }; }
  changeMode = mode => { if(!this.state.busy) this.setState({ mode, pass: '', pass2: '', code: '', error: '', message: '' }); };
  submit = async e => {
    e?.preventDefault();
    if(this.state.busy) return;
    const st = this.state, reg = st.mode === 'register', reset = st.mode === 'reset', forgot = st.mode === 'forgot';
    if((reg || reset) && st.pass !== st.pass2) { this.setState({ error: 'Пароли не совпадают.' }); return; }
    this.setState({ busy: true, error: '', message: '' });
    try {
      const data = await authRequest(reg ? 'register' : st.mode, { email: st.email, password: st.pass, login: st.login, name: st.name, code: st.code });
      if(forgot) this.setState({ mode: 'reset', message: data.message });
      else if(reset) this.setState({ mode: 'login', pass: '', pass2: '', code: '', message: data.message });
      else { cacheUser(data.user); window.location.assign('/account'); }
    } catch(error) { this.setState({ error: error.message }); }
    finally { this.setState({ busy: false }); }
  };
  renderVals() {
    const st = this.state, reg = st.mode === 'register', recovery = ['forgot', 'reset'].includes(st.mode), reset = st.mode === 'reset';
    const set = key => e => this.setState({ [key]: e.target.value, error: '' });
    return {
      ...st, isReg: reg, recovery, reset, showPassword: st.mode !== 'forgot', confirmPassword: reg || reset,
      crumb: recovery ? 'Восстановление пароля' : reg ? 'Регистрация' : 'Вход',
      heading: recovery ? 'Восстановление пароля' : reg ? 'Регистрация' : 'Вход',
      lead: recovery ? 'Введите почту своего аккаунта. Мы отправим код для установки нового пароля.' : reg ? 'Создайте аккаунт для своей коллекции статуэток.' : 'Войдите, чтобы открыть личный кабинет и свои подборки статуэток.',
      loginTabCls: !reg && !recovery ? 'sp-tab-on' : '', regTabCls: reg ? 'sp-tab-on' : '', loginSel: !reg && !recovery, regSel: reg,
      toLogin: () => this.changeMode('login'), toReg: () => this.changeMode('register'), toForgot: () => this.changeMode('forgot'),
      switchMode: () => this.changeMode(reg || recovery ? 'login' : 'register'),
      switchText: reg || recovery ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?', switchLink: reg || recovery ? 'Войти' : 'Зарегистрироваться',
      setLogin: set('login'), setName: set('name'), setEmail: set('email'), setPass: set('pass'), setPass2: set('pass2'), setCode: set('code'),
      passAuto: reg || reset ? 'new-password' : 'current-password', passHint: reg || reset ? 'От 8 до 128 символов' : '',
      submitLabel: st.busy ? 'Подождите…' : reg ? 'Создать аккаунт' : st.mode === 'forgot' ? 'Отправить код' : reset ? 'Изменить пароль' : 'Войти',
      hasError: !!st.error, submit: this.submit,
    };
  }
}

const getters = {
  device: state => state.layout.device,
  theme: state => state.layout.theme,
  color: state => state.layout.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.layout.multiTab
  // lang: state => state.i18n.lang
}

export default getters

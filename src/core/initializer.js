import store from '@/store/'

// eslint-disable-next-line no-undef
const config = AppConfig.layoutSetting

export default function () {
  console.log(`API_URL: ${process.env.VUE_APP_API_BASE_URL}`)

  store.commit('TOGGLE_THEME', config.navTheme)
  store.commit('TOGGLE_LAYOUT_MODE', config.layoutMode)
  store.commit('TOGGLE_FIXED_HEADER', config.fixedHeader)
  store.commit('TOGGLE_FIXED_SIDEBAR', config.fixedSidebar)
  store.commit('TOGGLE_CONTENT_WIDTH', config.contentWidth)
  store.commit('TOGGLE_FIXED_HEADER_HIDDEN', config.autoHideHeader)
  store.commit('TOGGLE_WEAK', config.colorWeak)
  store.commit('TOGGLE_COLOR', config.primaryColor)
  store.commit('TOGGLE_MULTI_TAB', config.multiTab)

  // last step
}


const layout = {
  state: {
    sidebarSize: 'max',
    device: 'desktop',
    theme: '',
    navPosition: 'left',
    layoutMode: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    multiTab: true
  },
  mutations: {
    TOGGLE_SIDEBAR_SIZE: (state, type) => {
      state.sidebarSize = type
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      state.theme = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      state.layoutMode = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      state.fixSiderbar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      state.color = color
    },
    TOGGLE_WEAK: (state, flag) => {
      state.weak = flag
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      state.multiTab = bool
    }
  },
  actions: {
    ToggleSidebarSize ({ commit }, type) {
      commit('TOGGLE_SIDEBAR_SIZE', type)
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme ({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode ({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader ({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSiderbar ({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
    ToggleFixedHeaderHidden ({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth ({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor ({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleWeak ({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleMultiTab ({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    }
  }
}

export default layout

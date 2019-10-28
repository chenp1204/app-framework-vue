
const layout = {
  state: {
    sidebarOpen: false,
    device: 'desktop',
    theme: '',
    navPosition: 'left',
    layoutMode: '',
    contentWidth: '',
    fixedHeader: false,
    fixedSidebar: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    multiTab: true
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, open) => {
      state.sidebarOpen = open
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      state.theme = theme
    },
    TOGGLE_NAV_POSITION: (state, position) => {
      state.navPosition = position
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      state.layoutMode = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDEBAR: (state, fixed) => {
      state.fixedSidebar = fixed
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
    ToggleSidebar ({ commit }, type) {
      commit('TOGGLE_SIDEBAR', type)
    },
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme ({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleNavPosition ({ commit }, position) {
      commit('TOGGLE_NAV_POSITION', position)
    },
    ToggleLayoutMode ({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader ({ commit }, fixed) {
      commit('TOGGLE_FIXED_HEADER', fixed)
    },
    ToggleFixedSidebar ({ commit }, fixed) {
      commit('TOGGLE_FIXED_SIDEBAR', fixed)
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
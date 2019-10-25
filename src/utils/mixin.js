// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const layoutMixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.layout.layoutMode,
      navTheme: state => state.layout.theme,
      navPosition: state => state.layout.navPosition,
      primaryColor: state => state.layout.color,
      colorWeak: state => state.layout.weak,
      fixedHeader: state => state.layout.fixedHeader,
      fixedSidebar: state => state.layout.fixedSidebar,
      contentWidth: state => state.layout.contentWidth,
      autoHideHeader: state => state.layout.autoHideHeader,
      sidebarOpened: state => state.layout.sidebarOpen,
      multiTab: state => state.layout.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.navPosition === 'top'
    },
    isSideMenu () {
      return this.navPosition === 'left'
    },
    isLeftRight () {
      return this.layoutMode === 'row'
    },
    isTopBottom () {
      return this.layoutMode === 'column'
    }
  }
}

const deviceMixin = {
  computed: {
    ...mapState({
      device: state => state.layout.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('ToggleSidebar', false)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('ToggleSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('ToggleSidebar', true)
          break
      }
    })
  }
}

export { layoutMixin, AppDeviceEnquire, deviceMixin }

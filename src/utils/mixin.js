// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const layoutMixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.layout.layout,
      navTheme: state => state.layout.theme,
      primaryColor: state => state.layout.color,
      colorWeak: state => state.layout.weak,
      fixedHeader: state => state.layout.fixedHeader,
      fixSiderbar: state => state.layout.fixSiderbar,
      fixSidebar: state => state.layout.fixSiderbar,
      contentWidth: state => state.layout.contentWidth,
      autoHideHeader: state => state.layout.autoHideHeader,
      sidebarOpened: state => state.layout.sidebar,
      multiTab: state => state.layout.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
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
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

export { layoutMixin, AppDeviceEnquire, deviceMixin }

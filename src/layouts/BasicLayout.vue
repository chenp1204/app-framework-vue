<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-if="!isMobile() && isSideMenu() && isLeftRight()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <!-- layout header -->
    <div v-if="isTopBottom()" :class="[layoutMode === 'row' ? 'sidemenu': 'topmenu']">
      <global-header
        :mode="layoutMode"
        :showNav="isTopMenu()"
        :navMenus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />
    </div>

    <a-layout
      :class="[layoutMode === 'row' ? 'sidemenu': 'topmenu', `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, paddingTop: contentPaddingTop, minHeight: '100vh' }">
      <!-- layout header -->
      <global-header
        v-if="isLeftRight()"
        :mode="layoutMode"
        :showNav="isTopMenu()"
        :navMenus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <side-menu
        v-if="!isMobile() && isSideMenu() && isTopBottom()"
        mode="inline"
        :menus="menus"
        theme="light"
        :collapsed="collapsed"
        :collapsible="true"
      ></side-menu>

      <template v-if="isLeftRight()">
        <!-- layout content -->
        <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }">
          <multi-tab v-if="multiTab"></multi-tab>
          <transition name="page-transition">
            <route-view />
          </transition>
        </a-layout-content>

        <!-- layout footer -->
        <a-layout-footer>
          <global-footer />
        </a-layout-footer>
      </template>

      <template v-else>
        <a-layout>
          <!-- layout content -->
          <a-layout-content :style="{ height: '100%', margin: '24px 24px 0' }">
            <multi-tab v-if="multiTab"></multi-tab>
            <transition name="page-transition">
              <route-view />
            </transition>
          </a-layout-content>

          <!-- layout footer -->
          <a-layout-footer>
            <global-footer />
          </a-layout-footer>
        </a-layout>
      </template>
      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>

</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/domUtil'
import { mapState, mapActions } from 'vuex'
import { layoutMixin, deviceMixin } from '@/utils/mixin'

import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [layoutMixin, deviceMixin],
  components: {
    RouteView,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data () {
    return {
      production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
      collapsed: false,
      menus: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.isLeftRight()) {
        return (this.sidebarOpened) ? '256px' : '80px'
      } else {
        return '0'
      }
    },
    contentPaddingTop () {
      if (!this.fixedHeader || this.isMobile()) {
        return '0'
      }
      return this.isTopBottom() ? '64px' : '0'
    }
  },
  watch: {
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['ToggleSidebar']),
    toggle () {
      this.collapsed = !this.collapsed
      this.ToggleSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect () {
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

/* eslint-disable no-undef */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    // 如果没有AMD/CMD和CommonJS就挂在全局对象下
    root.AppConfig = factory()
  }
})(this, function () {
  // 应用全局配置对象
  var AppConfig = {

    // 界面布局配置
    get layoutSetting () {
      /**
        * 项目默认配置项
        * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
        * navTheme - sidebar theme ['dark', 'light'] 两种主题
        * navPosition - 导航菜单位置 ['top', 'left'] 两种
        * colorWeak - 色盲模式
        * layoutMode - 整体布局方式 ['row', 'column'] 两种布局
        * fixedHeader - 固定 Header : boolean
        * fixSiderbar - 固定左侧菜单栏 ： boolean
        * autoHideHeader - 向下滚动时，隐藏 Header : boolean
        * contentWidth - 内容区布局： 流式 |  固定
        */
      return {
        primaryColor: '#52C41A', // primary color of ant design
        navTheme: 'dark', // theme for nav menu
        navPosition: 'left', // position for nav menu，left or top
        layoutMode: 'column', // layout mode: row or column
        contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
        fixedHeader: false, // sticky header
        fixSiderbar: false, // sticky siderbar
        autoHideHeader: false, //  auto hide header
        colorWeak: false,
        multiTab: false
      }
    }
  }

  return AppConfig
})

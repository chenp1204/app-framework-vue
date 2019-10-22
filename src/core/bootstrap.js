import Vue from 'vue'
import VueStorage from 'vue-ls'

// plugins
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import VueClipboard from 'vue-clipboard2'
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
// permission
import PermissionHelper from '@/plugins/permission'

// ant-design
import '@/plugins/antd-vue'
import 'ant-design-vue/dist/antd.less'

// axios
import '@/plugins/axios'

// config router
import '@/utils/handler/router'

// 全局filter
import '@/utils/filter'

// 全局directives
import '@/utils/directive'

VueClipboard.config.autoSetContainer = true

Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueStorage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session' // storage name session, local, memory
})
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import '../styles/index.scss'
import 'codemirror/lib/codemirror.css'
import './styles/atom-one-dark-reasonable.scss'
import './styles/atom-one-light.scss'
import './styles/markdown.scss'
import './styles/font.scss'
import NaiveUI from '../index'
import SourceBlock from './SourceBlock'
import VueI18n from 'vue-i18n'

import intro from './documentation/intro/intro'
import start from './documentation/intro/start'
import devGuildlines from './documentation/intro/devGuidelines'
import status from './documentation/intro/status'

import nimbusServiceLayoutDemo from './documentation/components/nimbusServiceLayoutDemo'
import homeDemo from './documentation/components/homeDemo'
import gradientTextDemo from './documentation/components/gradientTextDemo'
import iconDemo from './documentation/components/iconDemo'
import checkbox from './documentation/components/checkbox'
import buttonDemo from './documentation/components/buttonDemo'
import switchDemo from './documentation/components/switch'
import tableDemo from './documentation/components/tableDemo'
import input from './documentation/components/input'
import selectDemo from './documentation/components/selectDemo'
import cascaderDemo from './documentation/components/cascaderDemo'
import inputKeyValuePairsDemo from './documentation/components/inputKeyValuePairsDemo'
import modal from './documentation/components/modal'
import nimbusFormCardDemo from './documentation/components/nimbusFormCardDemo'
import message from './documentation/components/message'
import tooltip from './documentation/components/tooltip'
import popover from './documentation/components/popover'
import alert from './documentation/components/alert'
import datePickerDemo from './documentation/components/datePickerDemo'
import inputNumberDemo from './documentation/components/inputNumberDemo'
import nimbusIconDemo from './documentation/components/nimbusIconDemo'
import radioDemo from './documentation/components/radioDemo'
import formDemo from './documentation/components/formDemo'
import tabsDemo from './documentation/components/tabsDemo'
import timePickerDemo from './documentation/components/timePickerDemo'
import confirm from './documentation/components/confirm'
import backTopDemo from './documentation/components/backTopDemo'
import dropdownDemo from './documentation/components/dropdownDemo'
import scrollbarDebug from './debugComponents/scrollbarDebug'
import scrollbarDebug2 from './debugComponents/scrollbarDebug2'
import badge from './documentation/components/badge'
import stepsDemo from './documentation/components/stepsDemo'
import notificationDemo from './documentation/components/notificationDemo'
import nimbusConfirmCardDemo from './documentation/components/nimbusConfirmCardDemo'
import paginationDemo from './documentation/components/paginationDemo'
import collapse from './documentation/components/collapse'
import tag from './documentation/components/tag'
import timelineDemo from './documentation/components/timelineDemo'
import progressDemo from './documentation/components/progressDemo'
import dividerDemo from './documentation/components/dividerDemo'
import popconfirmDemo from './documentation/components/popconfirmDemo'
import anchorDemo from './documentation/components/anchorDemo'
import popselectDemo from './documentation/components/popselectDemo'
import appDemo from './documentation/components/appDemo'
import advanceTableDemos from './documentation/components/advanceTableDemos'
import transferDemo from './documentation/components/transferDemo'
import spinDemo from './documentation/components/spinDemo'
import drawerDemo from './documentation/components/drawerDemo'
import loadingBar from './documentation/components/loadingBar'
import timeDemo from './documentation/components/timeDemo'
import sliderDemo from './documentation/components/sliderDemo'
import treeDemo from './documentation/components/treeDemo'

import demo from './demo'
import ComponentDemo from './utils/ComponentDemo'
import ComponentDemos from './utils/ComponentDemos'
import ComponentDocumentation from './utils/ComponentDocumentation'
import DocumentationWrapper from './utils/DocumentationWrapper'
import './styles/ComponentDemo.scss'
import './styles/demo.scss'

import popoverDebug from './debugComponents/popoverDebug'
import routerDebug from './debugComponents/routerDebug'
import modalDebug from './debugComponents/modalDebug'
import datePickerDebug from './debugComponents/datePickerDebug'
import backTopDebug from './debugComponents/backTopDebug'
import cancelMarkDebug from './debugComponents/cancelMarkDebug'
import cascaderDebug from './debugComponents/cascaderDebug'
import verticalAlignDebug from './debugComponents/verticalAlignDebug'

Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(NaiveUI)

const i18n = new VueI18n({
  locale: 'en-us'
})

Vue.component(SourceBlock.name, SourceBlock)
Vue.component('ComponentDemo', ComponentDemo)
Vue.component('ComponentDemos', ComponentDemos)
Vue.component('DocumentationWrapper', DocumentationWrapper)
Vue.component('ComponentDocumentation', ComponentDocumentation)

const withPrefix = (prefix, routes) =>
  routes.map((route) => {
    route.path = prefix + route.path
    return route
  })

const routes = [
  {
    path: '/home-demo',
    component: homeDemo
  },
  {
    path: '/:lang/:theme/n-popover-debug',
    component: popoverDebug
  },
  {
    path: '/n-back-top-debug',
    component: backTopDebug
  },
  {
    path: '/n-cascader-debug',
    component: cascaderDebug
  },
  {
    path: '/:lang/:theme/start',
    component: demo,
    children: withPrefix('/:lang/:theme', [
      { path: '/intro', component: intro },
      { path: '/start', component: start },
      { path: '/dev-guildlines', component: devGuildlines },
      { path: '/status', component: status },
      { path: '/n-nimbus-service-layout', component: nimbusServiceLayoutDemo },
      { path: '/n-nimbus-home-layout', component: homeDemo },
      { path: '/n-gradient-text', component: gradientTextDemo },
      { path: '/n-icon', component: iconDemo },
      { path: '/n-checkbox', component: checkbox },
      { path: '/n-button', component: buttonDemo },
      { path: '/n-switch', component: switchDemo },
      { path: '/n-table', component: tableDemo },
      { path: '/n-advance-table', component: advanceTableDemos },
      { path: '/n-input', component: input },
      { path: '/n-select', component: selectDemo },
      { path: '/n-cascader', component: cascaderDemo },
      { path: '/n-InputKeyValuePairs', component: inputKeyValuePairsDemo },
      { path: '/n-modal', component: modal },
      { path: '/n-nimbus-form-card', component: nimbusFormCardDemo },
      { path: '/n-message', component: message },
      { path: '/n-tooltip', component: tooltip },
      { path: '/n-popover', component: popover },
      { path: '/n-notification', component: notificationDemo },
      { path: '/n-nimbus-confirm-card', component: nimbusConfirmCardDemo },
      { path: '/n-pagination', component: paginationDemo },
      { path: '/n-alert', component: alert },
      { path: '/n-date-picker', component: datePickerDemo },
      { path: '/n-input-number', component: inputNumberDemo },
      { path: '/n-nimbus-icon', component: nimbusIconDemo },
      { path: '/n-radio', component: radioDemo },
      { path: '/n-form', component: formDemo },
      { path: '/n-tabs', component: tabsDemo },
      { path: '/n-time-picker', component: timePickerDemo },
      { path: '/n-confirm', component: confirm },
      { path: '/n-router-debug', component: routerDebug },
      { path: '/n-modal-debug', component: modalDebug },
      { path: '/n-scrollbar-debug', component: scrollbarDebug },
      { path: '/n-badge', component: badge },
      { path: '/n-steps', component: stepsDemo },
      { path: '/n-collapse', component: collapse },
      { path: '/n-progress', component: progressDemo },
      { path: '/n-tag', component: tag },
      { path: '/n-timeline', component: timelineDemo },
      { path: '/n-scrollbar-debug2', component: scrollbarDebug2 },
      { path: '/n-back-top', component: backTopDemo },
      { path: '/n-date-picker-debug', component: datePickerDebug },
      { path: '/n-divider', component: dividerDemo },
      { path: '/n-popconfirm', component: popconfirmDemo },
      { path: '/n-anchor', component: anchorDemo },
      { path: '/n-dropdown', component: dropdownDemo },
      { path: '/n-popselect', component: popselectDemo },
      { path: '/n-app', component: appDemo },
      { path: '/n-cancel-mark-debug', component: cancelMarkDebug },
      { path: '/n-transfer', component: transferDemo },
      { path: '/n-spin', component: spinDemo },
      { path: '/n-drawer', component: drawerDemo },
      { path: '/n-loading-bar', component: loadingBar },
      { path: '/n-time', component: timeDemo },
      { path: '/n-slider', component: sliderDemo },
      { path: '/n-tree', component: treeDemo },
      { path: '/n-vertical-align-debug', component: verticalAlignDebug }
    ])
  },
  {
    path: '/*',
    redirect: '/en-us/dark/start'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  Vue.prototype.$NLoadingBar.theme = to.params.theme
  Vue.prototype.$NLoadingBar.start()
  next()
})

router.afterEach(function () {
  Vue.prototype.$NLoadingBar.finish()
})

export { Vue, router, i18n }

import { Fragment, h, reactive, ref } from 'vue'
import { createId, omit } from '../../_utils/vue'
import { NBaseTeleport } from '../../_base'
import NotificationContainer from './NotificationContainer.vue'
import NotificationEnvironment from './NotificationEnvironment'

export default {
  name: 'NotificationProvider',
  provide () {
    return {
      notification: {
        create: this.create,
        info: this.info,
        success: this.success,
        warning: this.warning,
        error: this.error
      }
    }
  },
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const notificationListRef = ref([])
    return {
      notificationList: notificationListRef
    }
  },
  methods: {
    create (options) {
      const key = createId()
      const notificationReactive = reactive({
        ...options,
        key,
        destroy: () => this.$refs[`n-notification-${key}`].hide()
      })
      this.notificationList.push(notificationReactive)
      return notificationReactive
    },
    ...[
      'info',
      'success',
      'warning',
      'error'
    ].reduce((api, type) => {
      api[type] = function (options) {
        return this.create({ ...options, type })
      }
      return api
    }, {}),
    handleAfterLeave (key) {
      const { notificationList } = this
      notificationList.splice(
        notificationList.findIndex(notification => notification.key === key),
        1
      )
    },
    // deprecated
    open (...args) {
      return this.create(...args)
    }
  },
  render () {
    return h(Fragment, null, [
      h(NBaseTeleport, {
        to: this.to
      }, {
        default: () => this.notificationList.length ? h(NotificationContainer, {
          scrollable: this.scrollable
        }, {
          default: () => {
            return this.notificationList.map(
              notification => h(NotificationEnvironment, {
                ref: `n-notification-${notification.key}`,
                ...omit(notification, ['destroy']),
                onInternalAfterLeave: this.handleAfterLeave
              })
            )
          }
        }) : null
      }),
      this.$slots.default()
    ])
  }
}

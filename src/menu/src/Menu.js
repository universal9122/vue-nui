import { h, nextTick, ref, toRef, computed, onMounted } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index'
import { useCompitable, useMergedState } from '../../_utils/composition'
import {
  getActivePath,
  getWrappedItems,
  itemRenderer
} from './utils'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    items: {
      type: Array,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: null
    },
    iconSize: {
      type: Number,
      default: 20
    },
    collapsedIconSize: {
      type: Number,
      default: 24
    },
    rootIndent: {
      type: Number,
      default: null
    },
    indent: {
      type: Number,
      default: 32
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    expandedKeys: {
      type: Array,
      default: null
    },
    modelValue: {
      type: String,
      default: null
    },
    mode: {
      validator (value) {
        return ['vertical', 'horizontal'].includes(value)
      },
      default: 'vertical'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    popoverBodyStyle: {
      type: Object,
      default () {
        return {
          padding: '2px 4px',
          minWidth: '180px'
        }
      }
    },
    'onUpdate:expandedKeys': {
      type: Function,
      default: () => {}
    },
    'onUpdate:modelValue': {
      type: Function,
      default: () => {}
    },
    // deprecated
    onOpenNamesChange: {
      type: Function,
      default: () => {}
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    onExpandedNamesChange: {
      type: Function,
      default: () => {}
    },
    expandedNames: {
      type: Array,
      default: undefined
    },
    defaultExpandedNames: {
      type: Array,
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledExpandedKeysRef = ref(props.defaultExpandedNames || props.defaultExpandedKeys)
    const controlledExpandedKeysRef = useCompitable(props, 'expandedNames', 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const itemsRef = toRef(props, 'items')
    const valueRef = toRef(props, 'modelValue')
    const activePathRef = computed(() => getActivePath(itemsRef.value, valueRef.value))
    const transitionDisabledRef = ref(true)
    onMounted(() => {
      nextTick(() => {
        transitionDisabledRef.value = false
      })
    })
    return {
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      activePath: activePathRef,
      menuItems: getWrappedItems(props.items),
      transitionDisabled: transitionDisabledRef
    }
  },
  methods: {
    handleSelect (value) {
      this['onUpdate:modelValue'](value)
      // deprecated
      this.onSelect(value)
    },
    toggleExpand (key) {
      const currentExpandedKeys = Array.from(this.mergedExpandedKeys)
      const index = currentExpandedKeys.findIndex(
        expanededKey => expanededKey === key
      )
      if (~index) {
        currentExpandedKeys.splice(index, 1)
      } else {
        currentExpandedKeys.push(key)
      }
      if (this.controlledExpandedKeys === undefined) {
        this.uncontrolledExpanededKeys = currentExpandedKeys
      }
      this['onUpdate:expandedKeys'](currentExpandedKeys)
      // deprecated
      this.onExpandedNamesChange(currentExpandedKeys)
      this.onOpenNamesChange(currentExpandedKeys)
    }
  },
  render () {
    return h('div', {
      class: [
        'n-menu',
        `n-menu--${this.mode}`,
        {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
          'n-menu--collapsed': this.collapsed,
          'n-menu--transition-disabled': this.transitionDisabled
        }
      ]
    }, this.menuItems.map(item => itemRenderer(item)))
  }
}

import { h, ref, provide, defineComponent, reactive, PropType } from 'vue'
import { NPopover, popoverProps } from '../../popover'
import type { PopoverInst, PopoverTrigger } from '../../popover'
import NPopselectPanel, { panelPropKeys, panelProps } from './PopselectPanel'
import { omit, keep } from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { popselectLight } from '../styles'
import type { PopselectTheme } from '../styles'
import type { PopselectInjection } from './interface'

export default defineComponent({
  name: 'Popselect',
  props: {
    ...(useTheme.props as ThemeProps<PopselectTheme>),
    ...popoverProps,
    // eslint-disable-next-line vue/require-prop-types
    trigger: {
      type: String as PropType<PopoverTrigger>,
      default: 'hover'
    },
    // eslint-disable-next-line vue/require-prop-types
    showArrow: {
      type: Boolean,
      default: false
    },
    ...panelProps
  },
  setup (props) {
    const themeRef = useTheme(
      'Popselect',
      'Popselect',
      undefined,
      popselectLight,
      props
    )
    const popoverInstRef = ref<PopoverInst | null>(null)
    function syncPosition (): void {
      popoverInstRef.value?.syncPosition()
    }
    function setShow (value: boolean): void {
      popoverInstRef.value?.setShow(value)
    }
    provide<PopselectInjection>(
      'NPopselect',
      reactive({
        mergedTheme: themeRef,
        syncPosition,
        setShow
      })
    )
    return {
      popoverInstRef,
      mergedTheme: themeRef
    }
  },
  render () {
    const { mergedTheme } = this
    return h(
      NPopover,
      omit(this.$props, panelPropKeys, {
        padded: false,
        ref: 'popoverInstRef',
        internalExtraClass: 'popselect',
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover
      }),
      {
        trigger: this.$slots.default,
        default: () => {
          return h(NPopselectPanel, keep(this.$props, panelPropKeys))
        }
      }
    )
  }
})

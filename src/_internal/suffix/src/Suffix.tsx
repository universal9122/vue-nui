import { h, defineComponent, PropType, renderSlot } from 'vue'
import NBaseClear from '../../clear'
import NBaseLoading from '../../loading'
import NBaseIcon from '../../icon'

export default defineComponent({
  name: 'InternalSelectionSuffix',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    showClear: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props, { slots }) {
    return () => {
      const { clsPrefix } = props
      return (
        <NBaseLoading
          clsPrefix={clsPrefix}
          class={`${clsPrefix}-base-suffix`}
          strokeWidth={24}
          scale={0.85}
          show={props.loading}
        >
          {{
            default: () =>
              props.showArrow ? (
                <NBaseClear
                  clsPrefix={clsPrefix}
                  show={props.showClear}
                  onClear={props.onClear}
                >
                  {{
                    default: () => (
                      <NBaseIcon
                        clsPrefix={clsPrefix}
                        class={`${clsPrefix}-base-suffix__arrow`}
                      >
                        {{ default: () => renderSlot(slots, 'default') }}
                      </NBaseIcon>
                    )
                  }}
                </NBaseClear>
              ) : null
          }}
        </NBaseLoading>
      )
    }
  }
})

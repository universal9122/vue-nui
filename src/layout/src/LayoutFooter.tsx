import { h, computed, defineComponent, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-footer.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

const layoutFooterProps = {
  ...(useTheme.props as ThemeProps<LayoutTheme>),
  position: positionProp,
  bordered: {
    type: Boolean,
    default: false
  }
}

export type LayoutFooterProps = ExtractPublicPropTypes<typeof layoutFooterProps>

export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutFooter',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { footerBorderColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--footer-border-color': footerBorderColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-layout-footer`,
          {
            [`${mergedClsPrefix}-layout-footer--${this.position}-positioned`]: this
              .position,
            [`${mergedClsPrefix}-layout-footer--bordered`]: this.bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})

import { CSSRender } from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CSSRender()
const plugin = BEMPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
cssr.use(plugin)
const { c, context } = cssr
context.theme = null
context.pallete = null
const { cB, cE, cM, cNotM } = plugin

function insideFormItem (status, style) {
  if (status === null) return style
  return c(`${prefix}form-item`, [
    c(`${prefix}form-item-blank`, [
      c(({ props }) => `&${prefix}form-item-blank${modifierPrefix}${status}`, [
        style
      ])
    ])
  ])
}

function cTB (selector, ...rest) {
  return cB(selector, [
    c(
      ({ props }) => {
        const renderedTheme = props.$renderedTheme
        if (!renderedTheme) return ''
        const fallbackTheme = props.$fallbackTheme
        return (
          renderedTheme === fallbackTheme
            ? ''
            : `&.${namespace}-${renderedTheme}-theme`
        )
      },
      ...rest
    )
  ])
}

export { c, cTB, cB, cE, cM, cNotM, insideFormItem, namespace }

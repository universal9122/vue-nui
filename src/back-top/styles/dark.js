import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common.js'

export default create({
  theme: 'dark',
  name: 'BackTop',
  getDerivedVariables ({ base, derived }) {
    const {
      popoverColor,
      textColorSecondaryOverlay,
      primaryColorHover,
      primaryColorPressed
    } = derived
    return {
      ...commonVariables,
      color: popoverColor,
      iconColor: textColorSecondaryOverlay,
      iconColorHover: primaryColorHover,
      iconColorPressed: primaryColorPressed,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
})

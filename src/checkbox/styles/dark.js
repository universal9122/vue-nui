import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import commonVariables from './_common'
import { changeColor } from 'seemly'

export default create({
  theme: 'dark',
  name: 'Checkbox',
  peer: [baseDark],
  getLocalVars (vars) {
    const {
      inputColorDisabledOverlay,
      cardColor,
      modalColor,
      borderColorOverlay,
      primaryColor,
      textColor2Overlay,
      textColorDisabledOverlay,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...commonVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      borderRadius: vars.borderRadiusSmall,
      color: 'transparent',
      colorDisabled: inputColorDisabledOverlay,
      colorTableHeader: cardColor,
      colorTableHeaderModal: modalColor,
      iconColor: cardColor,
      iconColorDisabled: textColorDisabledOverlay,
      borderColor: borderColorOverlay,
      borderColorDisabled: borderColorOverlay,
      borderColorActive: primaryColor,
      boxShadowColorActive: changeColor(primaryColor, { alpha: 0.3 }),
      labelTextColor: textColor2Overlay,
      labelTextColorDisabled: textColorDisabledOverlay
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import { changeColor } from 'seemly'
import { selectDark } from '../../select/styles'
import { inputDark } from '../../input/styles'
import { iconDark } from '../../icon/styles'
import { baseDark } from '../../_styles/base'
import commonVariables from './_common.js'

export default create({
  name: 'Pagination',
  theme: 'dark',
  peer: [baseDark, selectDark, inputDark, iconDark],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      primaryColor,
      inputColorDisabledOverlay,
      textColorDisabledOverlay,
      borderColorOverlay,
      opacity3,
      borderRadius,
      fontSize
    } = vars
    return {
      ...commonVariables,
      buttonBorder: `1px solid ${borderColorOverlay}`,
      buttonIconColor: textColor2Overlay,
      buttonIconColorHover: textColor2Overlay,
      itemTextColor: textColor2Overlay,
      itemTextColorHover: primaryColor,
      itemTextColorActive: primaryColor,
      itemTextColorDisabled: textColorDisabledOverlay,
      itemColor: 'transparent',
      itemColorActive: 'transparent',
      itemColorDisabled: inputColorDisabledOverlay,
      itemBorder: '1px solid transparent',
      itemBorderActive: `1px solid ${changeColor(primaryColor, {
        alpha: opacity3
      })}`,
      itemBorderDisabled: '1px solid transparent',
      itemColorHover: 'transparent',
      itemBorderRadius: borderRadius,
      itemFontSize: fontSize,
      jumperTextColor: textColor2Overlay,
      jumperTextColorDisabled: textColorDisabledOverlay
    }
  }
})

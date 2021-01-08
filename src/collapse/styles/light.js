import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Collapse',
  common: commonLight,
  self (vars) {
    const {
      fontWeight,
      textColor1,
      textColor2,
      dividerColorOverlay,
      fontSize
    } = vars
    return {
      titleFontSize: fontSize,
      titleFontWeight: fontWeight,
      dividerColor: dividerColorOverlay,
      titleTextColor: textColor1,
      fontSize: fontSize,
      textColor: textColor2,
      arrowColor: textColor2
    }
  }
}

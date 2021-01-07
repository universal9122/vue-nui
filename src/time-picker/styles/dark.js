import commonVars from './_common'
import { iconDark } from '../../icon/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'TimePicker',
  common: commonDark,
  peers: {
    Icon: iconDark,
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const {
      popoverColor,
      textColor2Overlay,
      primaryColor,
      hoverColorOverlay,
      dividerColorOverlay,
      opacityDisabled,
      boxShadow2,
      borderRadius
    } = vars
    return {
      ...commonVars,
      panelColor: popoverColor,
      panelBoxShadow: boxShadow2,
      panelDividerColor: dividerColorOverlay,
      itemTextColor: textColor2Overlay,
      itemTextColorActive: primaryColor,
      itemColorHover: hoverColorOverlay,
      itemOpacityDisabled: opacityDisabled,
      borderRadius
    }
  }
}

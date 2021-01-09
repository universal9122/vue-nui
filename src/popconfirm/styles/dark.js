import { buttonDark } from '../../button/styles'
import { popoverDark } from '../../popover/styles'
import { commonDark } from '../../_styles/new-common'
import commonVars from './_common'

export default {
  name: 'Popconfirm',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Popover: popoverDark
  },
  self (vars) {
    const { fontSize, warningColor } = vars
    return {
      ...commonVars,
      fontSize: fontSize,
      iconColor: warningColor
    }
  }
}

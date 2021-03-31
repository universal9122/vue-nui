import sizeVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { TableTheme } from './light'

const tableDark: TableTheme = {
  name: 'Table',
  common: commonDark,
  self (vars) {
    const {
      dividerColor,
      cardColor,
      modalColor,
      tableHeaderColor,
      textColor1,
      textColor2,
      fontWeightStrong,
      borderRadius,
      lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge
    } = vars
    return {
      ...sizeVariables,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      borderRadius,
      borderColor: dividerColor,
      tdColor: cardColor,
      tdColorModal: modalColor,
      thColor: tableHeaderColor,
      thTextColor: textColor1,
      tdTextColor: textColor2,
      thFontWeight: fontWeightStrong
    }
  }
}

export default tableDark

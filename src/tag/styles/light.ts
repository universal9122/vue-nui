import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2Overlay,
    primaryColorHover,
    primaryColorPressed,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    baseColor,
    borderColorOverlay,
    opacityDisabled,
    tagColor,
    closeColorOverlay,
    closeColorHoverOverlay,
    closeColorPressedOverlay,
    borderRadiusSmall: borderRadius,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    heightTiny,
    heightSmall,
    heightMedium
  } = vars
  return {
    ...commonVariables,
    heightSmall: heightTiny,
    heightMedium: heightSmall,
    heightLarge: heightMedium,
    borderRadius,
    opacityDisabled,
    fontSizeSmall: fontSizeTiny,
    fontSizeMedium: fontSizeSmall,
    fontSizeLarge: fontSizeMedium,
    // checked
    textColorCheckable: textColor2Overlay,
    textColorHoverCheckable: primaryColorHover,
    textColorPressedCheckable: primaryColorPressed,
    textColorChecked: baseColor,
    colorCheckable: 'transparent',
    colorHoverCheckable: 'transparent',
    colorPressedCheckable: 'transparent',
    colorChecked: primaryColor,
    colorCheckedHover: primaryColorHover,
    colorCheckedPressed: primaryColorPressed,
    // default
    borderColor: borderColorOverlay,
    textColor: textColor2Overlay,
    color: tagColor,
    closeColor: closeColorOverlay,
    closeColorHover: closeColorHoverOverlay,
    closeColorPressed: closeColorPressedOverlay,
    borderColorPrimary: changeColor(primaryColor, { alpha: 0.3 }),
    textColorPrimary: primaryColor,
    colorPrimary: changeColor(primaryColor, { alpha: 0.1 }),
    closeColorPrimary: changeColor(primaryColor, { alpha: 0.75 }),
    closeColorHoverPrimary: changeColor(primaryColor, { alpha: 0.6 }),
    closeColorPressedPrimary: changeColor(primaryColor, { alpha: 0.9 }),
    borderColorInfo: changeColor(infoColor, { alpha: 0.3 }),
    textColorInfo: infoColor,
    colorInfo: changeColor(infoColor, { alpha: 0.1 }),
    closeColorInfo: changeColor(infoColor, { alpha: 0.75 }),
    closeColorHoverInfo: changeColor(infoColor, { alpha: 0.6 }),
    closeColorPressedInfo: changeColor(infoColor, { alpha: 0.9 }),
    borderColorSuccess: changeColor(successColor, { alpha: 0.3 }),
    textColorSuccess: successColor,
    colorSuccess: changeColor(successColor, { alpha: 0.1 }),
    closeColorSuccess: changeColor(successColor, { alpha: 0.75 }),
    closeColorHoverSuccess: changeColor(successColor, { alpha: 0.6 }),
    closeColorPressedSuccess: changeColor(successColor, { alpha: 0.9 }),
    borderColorWarning: changeColor(warningColor, { alpha: 0.35 }),
    textColorWarning: warningColor,
    colorWarning: changeColor(warningColor, { alpha: 0.12 }),
    closeColorWarning: changeColor(warningColor, { alpha: 0.75 }),
    closeColorHoverWarning: changeColor(warningColor, { alpha: 0.6 }),
    closeColorPressedWarning: changeColor(warningColor, { alpha: 0.9 }),
    borderColorError: changeColor(errorColor, { alpha: 0.23 }),
    textColorError: errorColor,
    colorError: changeColor(errorColor, { alpha: 0.08 }),
    closeColorError: changeColor(errorColor, { alpha: 0.65 }),
    closeColorHoverError: changeColor(errorColor, { alpha: 0.5 }),
    closeColorPressedError: changeColor(errorColor, { alpha: 0.8 })
  }
}

export type TagThemeVars = ReturnType<typeof self>

const tagLight: Theme<'Tag', TagThemeVars> = {
  name: 'Tag',
  common: commonLight,
  self
}

export default tagLight
export type TagTheme = typeof tagLight

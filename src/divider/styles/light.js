import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Divider',
  getLocalVars (vars) {
    const {
      textColor1,
      dividerColorOverlay
    } = vars
    return {
      textColor: textColor1,
      color: dividerColorOverlay,
      fontWeight: vars.fontWeightStrong
    }
  }
})

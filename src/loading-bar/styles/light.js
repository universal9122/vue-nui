import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'LoadingBar',
  theme: 'light',
  getLocalVars (vars) {
    const {
      successColor,
      errorColor
    } = vars
    return {
      colorError: errorColor,
      colorLoading: successColor,
      height: '2px'
    }
  }
})

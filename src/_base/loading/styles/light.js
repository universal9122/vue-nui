import create from '../../../_styles/utils/create-component-base'

export default create({
  name: 'BaseLoading',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      color: derived.primaryColor
    }
  }
})

import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Element',
  getDerivedVariables ({ base, derived }) {
    return {
      ...base,
      ...derived
    }
  }
})

import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Popconfirm',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    return {
      iconColor: derived.warningColor
    }
  }
})

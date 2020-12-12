import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Avatar',
  peer: [baseDark],
  getLocalVars (vars) {
    const { borderRadius, avatarColorOverlay } = vars
    return {
      ...commonVariables,
      borderRadius,
      color: avatarColorOverlay
    }
  }
})

import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        hrColor
      }
    } = props
    return cTB('hr', {
      margin: '12px 0',
      transition: `border-color .3s ${cubicBezierEaseInOut}`,
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'none',
      borderTop: `1px solid ${hrColor}`
    })
  }
])

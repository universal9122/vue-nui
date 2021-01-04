import { cB, c, cE } from '../../../../_utils/cssr'
import createIconSwitchTransition from '../../../../_styles/transitions/icon-switch'

// vars:
// --bezier
// --color
// --size
// --color-hover
// --color-pressed
export default cB('base-clear-button', {
  flexShrink: 0,
  height: '1em',
  width: '1em',
  position: 'relative'
}, [
  c('>', [
    cE('clear', {
      fontSize: 'var(--size)',
      cursor: 'pointer',
      color: 'var(--color)',
      transition: 'color .3s var(--bezier)'
    }, [
      c('&:hover', {
        color: 'var(--color-hover)!important'
      }),
      c('&:active', {
        color: 'var(--color-pressed)!important'
      })
    ]),
    cE('placeholder', {
      display: 'flex'
    }),
    cE('clear, placeholder', {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    }, [
      createIconSwitchTransition({
        originalTransform: 'translateX(-50%) translateY(-50%)',
        left: '50%',
        top: '50%'
      })
    ])
  ])
])

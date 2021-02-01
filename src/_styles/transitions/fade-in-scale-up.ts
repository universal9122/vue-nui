import { CNode } from 'css-render'
import { c, namespace } from '../../_utils/cssr'
import commonVariables from '../common/_common'

const {
  cubicBezierEaseIn,
  cubicBezierEaseOut,
  transformDebounceScale
} = commonVariables

interface FadeInScaleUpTransitionOptions {
  transformOrigin?: string
  duration?: string
  enterScale?: string
  originalTransform?: string
  originalTransition?: string
}

export default function ({
  transformOrigin = 'inherit',
  duration = '.2s',
  enterScale = '.9',
  originalTransform = '',
  originalTransition = ''
}: FadeInScaleUpTransitionOptions = {}): CNode[] {
  return [
    c(`&.${namespace}-fade-in-scale-up-transition-leave-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseIn}, transform ${duration} ${cubicBezierEaseIn} ${
        originalTransition && ',' + originalTransition
      }`
    }),
    c(`&.${namespace}-fade-in-scale-up-transition-enter-active`, {
      transformOrigin,
      transition: `opacity ${duration} ${cubicBezierEaseOut}, transform ${duration} ${cubicBezierEaseOut} ${
        originalTransition && ',' + originalTransition
      }`
    }),
    c(
      `&.${namespace}-fade-in-scale-up-transition-enter-from, &.${namespace}-fade-in-scale-up-transition-leave-to`,
      {
        opacity: 0,
        transform: `scale(${enterScale}) ${originalTransform}`
      }
    ),
    c(
      `&.${namespace}-fade-in-scale-up-transition-leave-from, &.${namespace}-fade-in-scale-up-transition-enter-to`,
      {
        opacity: 1,
        transform: `scale(${transformDebounceScale}) ${originalTransform}`
      }
    )
  ]
}

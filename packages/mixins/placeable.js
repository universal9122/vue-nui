import scrollDelegate from '../utils/scrollDelegate'
import resizeDelegate from '../utils/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import calcPlacementTransfrom from '../utils/dom/calcPlacementTransform'

function getActivatorEl (componentInstance) {
  return componentInstance.currentActivatorEl || componentInstance.$refs.activator.$el || componentInstance.$refs.activator
}

/**
 * Make $refs.content trace $refs.activator, set $refs.contentInner width by the way
 *
 * Dependency:
 * $refs.activator
 * $refs.content
 * $refs.contentInner(optional)
 * $vm.active
 *
 * @prop {string} placement determine where should $refs.content be put
 * @prop {string} widthMode determine how width is $refs.contentInner
 */
export default {
  props: {
    placement: {
      validator (value) {
        return [
          'top',
          'bottom',
          'left',
          'right',
          'top-start',
          'top-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end'
        ].includes(value)
      },
      default: 'bottom'
    },
    widthMode: {
      validator (value) {
        return ['self', 'activator'].includes(value)
      },
      default: 'self'
    }
  },
  watch: {
    active (newValue) {
      if (newValue) {
        this.$nextTick().then(this.updatePosition)
      }
    }
  },
  mounted () {
    this.$refs.content.style.position = 'absolute'
    this.$nextTick().then(() => {
      this.registerScrollListeners()
      this.registerResizeListener()
    })
  },
  beforeDestroy () {
    this.unregisterScrollListeners()
    this.unregisterResizeListener()
  },
  data () {
    return {
      scrollListeners: []
    }
  },
  methods: {
    updatePosition (el, cb) {
      // console.log('scroll')
      if (!this.active) return
      const activator = getActivatorEl(this)
      // console.log(activator)
      const activatorBoundingClientRect = activator.getBoundingClientRect()
      // console.log(activatorBoundingClientRect)
      // console.log(this.$refs.popoverBody)
      // debugger
      const contentBoundingClientRect = this.$refs.content.getBoundingClientRect()
      // console.log(contentBoundingClientRect)
      // debugger
      // console.log('scroll', activatorBoundingClientRect, contentBoundingClientRect)
      const [placementTransform, suggsetedTransformOrigin] = calcPlacementTransfrom(this.placement, activatorBoundingClientRect, contentBoundingClientRect)
      this.$refs.content.style.position = 'absolute'
      this.$refs.content.style.top = placementTransform.top
      this.$refs.content.style.left = placementTransform.left
      this.$refs.content.style.right = placementTransform.right
      this.$refs.content.style.bottom = placementTransform.bottom
      this.$refs.content.style.transformOrigin = suggsetedTransformOrigin
      this.$refs.content.setAttribute('n-suggested-transform-origin', suggsetedTransformOrigin)
      // console.log(this.$refs.contentInner)
      if (this.$refs.contentInner) {
        let el = this.$refs.contentInner
        if (this.$refs.contentInner.$el) {
          el = this.$refs.contentInner.$el
        }
        if (this.widthMode === 'activator') {
          el.style.minWidth = activatorBoundingClientRect.width + 'px'
        }
      }
      if (el && cb) {
        cb(el, activatorBoundingClientRect, contentBoundingClientRect)
      }
    },
    registerResizeListener () {
      resizeDelegate.registerHandler(this.updatePosition)
    },
    registerScrollListeners () {
      let currentElement = getParentNode(this.$el)
      while (true) {
        currentElement = getScrollParent(currentElement)
        if (currentElement === null) break
        this.scrollListeners.push([currentElement, this.updatePosition])
        currentElement = getParentNode(currentElement)
      }
      // console.log(this.scrollListeners)
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.registerHandler(el, handler)
      }
    },
    unregisterResizeListener () {
      resizeDelegate.unregisterHandler(this.updatePosition)
    },
    unregisterScrollListeners () {
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.unregisterHandler(el, handler)
      }
      this.scrollListeners = []
    }
  }
}

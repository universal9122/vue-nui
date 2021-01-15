import { defineComponent, h, toRef, watch, onMounted, ref, computed } from 'vue'
import { useTheme, useHljs } from '../../_mixins'
import { codeLight } from '../styles'
import type { CodeThemeVars } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Code',
  props: {
    ...useTheme.createProps<CodeThemeVars>(),
    language: {
      type: String,
      default: undefined
    },
    code: {
      type: String,
      default: ''
    },
    trim: {
      type: Boolean,
      default: true
    },
    hljs: {
      type: Object,
      default: undefined
    }
  },
  setup (props, { slots }) {
    const codeRef = ref<HTMLElement | null>(null)
    const hljsRef = useHljs(props)
    const createCodeHtml = (language: string, code: string, trim: boolean) => {
      const { value: hljs } = hljsRef
      if (!hljs) {
        return null
      }
      if (!(language && hljs.getLanguage(language))) {
        return null
      }
      return hljs.highlight(language, trim ? code.trim() : code).value
    }
    const setCode = () => {
      if (slots.default) return
      const { value: codeEl } = codeRef
      if (!codeEl) return
      const { code, language } = props
      if (language) {
        const html = createCodeHtml(language, code, props.trim)
        if (html !== null) {
          codeEl.innerHTML = html
          return
        }
      }
      codeEl.textContent = code
    }
    onMounted(setCode)
    watch(toRef(props, 'language'), setCode)
    watch(toRef(props, 'code'), setCode)
    watch(hljsRef, setCode)
    const themeRef = useTheme('Code', 'Code', style, codeLight, props)
    return {
      codeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut, fontFamilyMono },
          self: {
            textColor,
            fontSize,
            fontWeightStrong,
            // extracted from hljs atom-one-light.scss
            'mono-3': $1,
            'hue-1': $2,
            'hue-2': $3,
            'hue-3': $4,
            'hue-4': $5,
            'hue-5': $6,
            'hue-5-2': $7,
            'hue-6': $8,
            'hue-6-2': $9
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--font-family': fontFamilyMono,
          '--font-weight-strong': fontWeightStrong,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--mono-3': $1,
          '--hue-1': $2,
          '--hue-2': $3,
          '--hue-3': $4,
          '--hue-4': $5,
          '--hue-5': $6,
          '--hue-5-2': $7,
          '--hue-6': $8,
          '--hue-6-2': $9
        }
      })
    }
  },
  render () {
    const { default: defaultSlot } = this.$slots
    return h(
      'code',
      {
        class: 'n-code',
        style: this.cssVars
      },
      [
        defaultSlot
          ? defaultSlot()
          : h('pre', {
            ref: 'codeRef'
          })
      ]
    )
  }
})

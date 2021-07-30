import {
  computed,
  inject,
  provide,
  onBeforeUnmount,
  ComputedRef,
  InjectionKey,
  Ref
} from 'vue'

type FormItemSize = 'small' | 'medium' | 'large'
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | number

export interface FormItemInjection {
  path: Ref<string | undefined>
  disabled: Ref<boolean>
  mergedSize: ComputedRef<FormItemSize>
  restoreValidation: () => void
  handleContentBlur: () => void
  handleContentFocus: () => void
  handleContentInput: () => void
  handleContentChange: () => void
}

export const formItemInjectionKey: InjectionKey<FormItemInjection> =
  Symbol('formItem')

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize
  mergedSize?: (formItem: FormItemInjection | null) => T
}

interface UseFormItemProps<T> {
  size?: T
  disabled?: boolean
}

export interface UseFormItem<T> {
  mergedSizeRef: ComputedRef<T>
  mergedDisabledRef: ComputedRef<boolean>
  nTriggerFormBlur: () => void
  nTriggerFormChange: () => void
  nTriggerFormFocus: () => void
  nTriggerFormInput: () => void
}

export default function useFormItem<T extends AllowedSize = FormItemSize> (
  props: UseFormItemProps<T>,
  { defaultSize = 'medium', mergedSize }: UseFormItemOptions<T> = {}
): UseFormItem<T> {
  const NFormItem = inject(formItemInjectionKey, null)
  provide(formItemInjectionKey, null)
  const mergedSizeRef = computed(
    mergedSize
      ? () => mergedSize(NFormItem)
      : () => {
          const { size } = props as any
          if (size) return size
          if (NFormItem) {
            const { mergedSize } = NFormItem
            if (mergedSize.value !== undefined) {
              return mergedSize.value as T
            }
          }
          return defaultSize as T
        }
  )
  const mergedDisabledRef = computed(() => {
    const { disabled } = props
    if (disabled !== undefined) {
      return disabled
    }
    if (NFormItem) {
      return NFormItem.disabled.value
    }
    return false
  })
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation()
    }
  })
  return {
    mergedSizeRef,
    mergedDisabledRef,
    nTriggerFormBlur () {
      if (NFormItem) {
        NFormItem.handleContentBlur()
      }
    },
    nTriggerFormChange () {
      if (NFormItem) {
        NFormItem.handleContentChange()
      }
    },
    nTriggerFormFocus () {
      if (NFormItem) {
        NFormItem.handleContentFocus()
      }
    },
    nTriggerFormInput () {
      if (NFormItem) {
        NFormItem.handleContentInput()
      }
    }
  }
}

import { defineComponent, PropType, h, computed, inject } from 'vue'
import { ArrowDownIcon } from '../../../_internal/icons'
import { NBaseIcon } from '../../../_internal'
import RenderSorter from './RenderSorter'
import { DataTableInjection, TableBaseColumn } from '../interface'
import { useConfig } from '../../../_mixins'

export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object as PropType<TableBaseColumn>,
      required: true
    }
  },
  setup (props) {
    const { NConfigProvider } = useConfig()
    const NDataTable = inject<DataTableInjection>(
      'NDataTable'
    ) as DataTableInjection
    const sortStateRef = computed(() => {
      return NDataTable.mergedSortState
    })
    const activeRef = computed(() => {
      const { value } = sortStateRef
      if (value) return value.columnKey === props.column.key
      return false
    })
    const mergedSortOrderRef = computed(() => {
      const { value } = sortStateRef
      if (value) return activeRef.value ? value.order : false
      return false
    })
    const mergedRenderSorterRef = computed(() => {
      return (
        NConfigProvider?.mergedComponentProps?.DataTable?.renderSorter ||
        props.column.renderSorter
      )
    })
    return {
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    }
  },
  render () {
    const { mergedRenderSorter, mergedSortOrder } = this
    return mergedRenderSorter ? (
      <RenderSorter render={mergedRenderSorter} order={mergedSortOrder} />
    ) : (
      <span
        class={[
          'n-data-table-sorter',
          {
            'n-data-table-sorter--asc': mergedSortOrder === 'ascend',
            'n-data-table-sorter--desc': mergedSortOrder === 'descend'
          }
        ]}
      >
        <NBaseIcon>{{ default: () => <ArrowDownIcon /> }}</NBaseIcon>
      </span>
    )
  }
})

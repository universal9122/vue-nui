/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { inject, computed, onBeforeMount, ComputedRef, PropType } from 'vue'
import { merge } from 'lodash-es'
import globalStyle from '../_styles/global/index.cssr'
import { CNode } from 'css-render'
import { ConfigProviderInjection, GlobalTheme } from '../config-provider'
import type { ThemeCommonVars } from '../_styles/common'

globalStyle.mount({
  id: 'naive-ui-global'
})

export interface Theme<N, T = {}, R = any> {
  name: N
  common?: ThemeCommonVars
  peers?: R
  self?: (vars: ThemeCommonVars) => T
}

export interface ThemeProps<T> {
  theme: PropType<T>
  themeOverrides: PropType<ExtractThemeOverrides<T>>
  builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>
}

export interface ThemePropsReactive<T> {
  theme?: T
  themeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}

export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown>
  ? unknown extends U // self is undefined, ThemeVars is unknown
    ? {}
    : U
  : {}

export type ExtractPeerOverrides<T> = T extends Theme<unknown, unknown, infer V>
  ? {
    peers?: {
      [k in keyof V]?: ExtractThemeOverrides<V[k]>
    }
  }
  : T

// V is peers theme
export type ExtractMergedPeerOverrides<T> = T extends Theme<
unknown,
unknown,
infer V
>
  ? {
    [k in keyof V]?: ExtractPeerOverrides<T>
  }
  : T

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> &
ExtractPeerOverrides<T> & { common?: ThemeCommonVars }

export function createTheme<N extends string, T, R> (
  theme: Theme<N, T, R>
): Theme<N, T, R> {
  return theme
}

type UseThemeProps<T> = Readonly<{
  theme?: T | undefined
  themeOverrides?: ExtractThemeOverrides<T>
  builtinThemeOverrides?: ExtractThemeOverrides<T>
}>

export type MergedTheme<T> = T extends Theme<unknown, infer V, infer W>
  ? {
    common: ThemeCommonVars
    self: V
    peers: W
    peerOverrides: ExtractMergedPeerOverrides<T>
  }
  : T

function useTheme<N, T, R> (
  resolveId: Exclude<keyof GlobalTheme, 'common'>,
  mountId: string,
  style: CNode | undefined,
  defaultTheme: Theme<N, T, R>,
  props: UseThemeProps<Theme<N, T, R>>
): ComputedRef<MergedTheme<Theme<N, T, R>>> {
  if (style) {
    onBeforeMount(() => {
      style.mount({
        target: mountId
      })
    })
  }
  const NConfigProvider = inject<ConfigProviderInjection | null>(
    'NConfigProvider',
    null
  )
  const mergedThemeRef = computed(() => {
    // keep props to make theme overrideable
    const {
      theme: { common: selfCommon, self, peers = {} } = {},
      themeOverrides: selfOverrides = {} as ExtractThemeOverrides<
      Theme<N, T, R>
      >,
      builtinThemeOverrides: builtinOverrides = {} as ExtractThemeOverrides<
      Theme<N, T, R>
      >
    } = props
    const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides
    const {
      mergedUnstableTheme: {
        common: globalCommon = undefined,
        [resolveId]: {
          common: globalSelfCommon = undefined,
          self: globalSelf = undefined,
          peers: globalPeers = {}
        } = {}
      } = {},
      mergedUnstableThemeOverrides: {
        common: globalCommonOverrides = undefined,
        [resolveId]: globalSelfOverrides = {}
      } = {}
    } = NConfigProvider || {}
    const {
      common: globalSelfCommonOverrides,
      peers: globalPeersOverrides = {}
    } = globalSelfOverrides
    const mergedCommon = merge(
      {},
      selfCommon || globalSelfCommon || globalCommon || defaultTheme.common,
      globalCommonOverrides,
      globalSelfCommonOverrides,
      selfCommonOverrides
    )
    const mergedSelf = merge(
      // {}, executed every time, no need for empty obj
      (self || globalSelf || defaultTheme.self)?.(mergedCommon) as T,
      builtinOverrides,
      globalSelfOverrides,
      selfOverrides
    )
    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge({}, globalPeersOverrides, peersOverrides)
    }
  })
  return mergedThemeRef
}

useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
} as const

/**
 * props.theme (Theme):
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 * provider.theme:
 * {
 *   common: CommonThemeVars,
 *   Button: Theme
 *   ...
 * }
 * defaultTheme:
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 *
 * props.themeOverrides (ThemeOverrides):
 * {
 *   common: CommonThemeVars,
 *   peers: { Component: ThemeOverrides },
 *   ...ThemeVars
 * }
 * provider.themeOverrides:
 * {
 *   common: CommonThemeVars,
 *   Component: ThemeOverrides
 *   ...
 * }
 *
 * mergedTheme:
 * {
 *   common: CommonThemeVars,
 *   self: ThemeVars,
 *   peers: { Component: Theme },
 *   overrides: { Component: ThemeOverrides }
 * }
 */
export default useTheme

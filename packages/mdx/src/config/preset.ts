import type { ProcessorOptions } from '@mdx-js/mdx'
import type { Pluggable } from 'unified'
import type * as Plugins from 'xyzdocs-core/mdx-plugins'
import type { BuildEnvironment } from './build'

type ResolvePlugins = Pluggable[] | ((v: Pluggable[]) => Pluggable[])

export type DefaultMDXOptions = Omit<
  NonNullable<ProcessorOptions>,
  'rehypePlugins' | 'remarkPlugins' | '_ctx'
> & {
  rehypePlugins?: ResolvePlugins
  remarkPlugins?: ResolvePlugins

  /**
   * Properties to export from `vfile.data`
   */
//   valueToExport?: string[]

//   remarkStructureOptions?: Plugins.StructureOptions | false
//   remarkHeadingOptions?: Plugins.RemarkHeadingOptions
//   remarkImageOptions?: Plugins.RemarkImageOptions | false
//   remarkCodeTabOptions?: Plugins.RemarkCodeTabOptions | false
//   remarkNpmOptions?: Plugins.RemarkNpmOptions | false
//   rehypeCodeOptions?: Plugins.RehypeCodeOptions | false
}

function pluginOption(
  def: (v: Pluggable[]) => (Pluggable | false)[],
  options: ResolvePlugins = []
): Pluggable[] {
  const list = def(Array.isArray(options) ? options : []).filter(
    Boolean
  ) as Pluggable[]

  if (typeof options === 'function') {
    return options(list)
  }

  return list
}

export type MDXPresetOptions =
  | ({ preset?: 'xyzdocs' } & DefaultMDXOptions)
  | ({
      preset: 'minimal'
    } & ProcessorOptions)

/**
 * apply MDX processor presets
 */
export function applyMdxPreset(
  options: MDXPresetOptions = {}
): (environment: BuildEnvironment) => Promise<ProcessorOptions> {
  return async (environment = 'bundler') => {
    if (options.preset === 'minimal') return options
 

    return {
 
    }
  }
}

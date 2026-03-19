import path from "path"
import { CollectionItem, DocCollectionItem, LoadedConfig, MetaCollectionItem } from "./config/build"
import { IndexFilePlugin } from "./plugins/index-file"
import { FSWatcher } from "chokidar"  
import { VFile } from "vfile"
import fs from 'node:fs/promises'
import { PostprocessOptions } from "./config"
import { ident } from './utils/codegen'

export const _Defaults = {
  configPath: 'source.config.ts',
  outDir: '.source',
}

export interface PluginContext {
  core: Core
}

export interface EmitEntry {
  /**
   * path relative to output directory
   */
  path: string
  content: string
}

export interface EmitOptions {
  /**
   * filter the plugins to run emit
   */
  filterPlugin?: (plugin: Plugin) => boolean

  /**
   * filter the workspaces to run emit
   */
  filterWorkspace?: (workspace: string) => boolean

  /**
   * write files
   */
  write?: boolean
}

export interface EmitOutput {
  entries: EmitEntry[]
  workspaces: Record<string, EmitEntry[]>
}

export type CompilationContext<Collection> = PluginContext &
  TransformOptions<Collection>

export interface TransformOptions<Collection> {
  collection: Collection
  filePath: string
  source: string
}

export interface ServerContext {
  /**
   * the file watcher, by default all content files are watched, along with other files.
   *
   * make sure to filter when listening to events
   */
  watcher?: FSWatcher
}

export interface Plugin extends IndexFilePlugin {
  name?: string

  /**
   * on config loaded/updated
   */
  config?: (
    this: PluginContext,
    config: LoadedConfig
  ) => Awaitable<void | LoadedConfig>

  /**
   * Generate files (e.g. types, index file, or JSON schemas)
   */
  emit?: (this: PluginContext) => Awaitable<EmitEntry[]>

  /**
   * Configure xyzdocs dev server
   */
  configureServer?: (
    this: PluginContext,
    server: ServerContext
  ) => Awaitable<void>

  meta?: {
    /**
     * Transform metadata
     */
    transform?: (
      this: CompilationContext<MetaCollectionItem>,
      data: unknown
    ) => Awaitable<unknown | void>
  }

  doc?: {
    /**
     * Transform frontmatter
     */
    frontmatter?: (
      this: CompilationContext<DocCollectionItem>,
      data: Record<string, unknown>
    ) => Awaitable<Record<string, unknown> | void>

    /**
     * Transform `vfile` on compilation stage
     */
    vfile?: (
      this: CompilationContext<DocCollectionItem>,
      file: VFile
    ) => Awaitable<VFile | void>
  }
}

export interface CoreOptions {
  environment: string
  configPath: string
  outDir: string
  plugins?: PluginOption[]

  /**
   * the workspace info if this instance is created as a workspace
   */
  workspace?: {
    parent: Core
    name: string
    dir: string
  }
}
type Awaitable<T> = T | Promise<T>

export type PluginOption = Awaitable<
  Plugin | PluginOption[] | false | undefined
>


async function getPlugins(pluginOptions: PluginOption[]): Promise<Plugin[]> {
  const plugins: Plugin[] = []

  for await (const option of pluginOptions) {
    if (!option) continue
    if (Array.isArray(option)) plugins.push(...(await getPlugins(option)))
    else plugins.push(option)
  }

  return plugins
}

export function createCore(options: CoreOptions) {
  let config: LoadedConfig
  let plugins: Plugin[]
  const workspaces = new Map<string, Core>()
  return {

    /**
     * Convenient cache store, reset when config changes
     */
    cache: new Map<string, unknown>(),
    async init({ config: newConfig }: { config: Awaitable<LoadedConfig> }) { 
      console.log('Initializing core...')    
      config = await newConfig
      this.cache.clear()
      workspaces.clear()
      plugins = await getPlugins([
        postprocessPlugin(),
        options.plugins,
        config.global.plugins,
      ])
            console.log(plugins)
      for (const plugin of plugins) {
        const out = await plugin.config?.call(this.getPluginContext(), config)
        if (out) config = out
      }

      // only support workspaces with max depth 1
      if (!options.workspace) {
        await Promise.all(
          Object.entries(config.workspaces).map(async ([name, workspace]) => {
            const core = createCore({
              ...options,
              outDir: path.join(options.outDir, name),
              workspace: {
                name,
                parent: this,
                dir: workspace.dir,
              },
            })
            await core.init({ config: workspace.config })
            workspaces.set(name, core)
          })
        )
      }      
    },
    async initServer(server: ServerContext): Promise<void> {
      const ctx = this.getPluginContext()
      for (const plugin of plugins) {
        await plugin.configureServer?.call(ctx, server)
      }
      for (const workspace of workspaces.values()) {
        await workspace.initServer(server)
      }
    },
    async emit(emitOptions: EmitOptions = {}): Promise<EmitOutput> {
      const { filterPlugin, filterWorkspace, write = false } = emitOptions
      const start = performance.now()
      const ctx = this.getPluginContext()
      const added = new Set<string>()
      const out: EmitOutput = {
        entries: [],
        workspaces: {},
      }

      for (const li of await Promise.all(
        plugins.map((plugin) => {
          if ((filterPlugin && !filterPlugin(plugin)) || !plugin.emit) return
          return plugin.emit.call(ctx)
        })
      )) {
        if (!li) continue
        for (const item of li) {
          if (added.has(item.path)) continue
          out.entries.push(item)
          added.add(item.path)
        }
      }

      if (write) {
        await Promise.all(
          out.entries.map(async (entry) => {
            const file = path.join(options.outDir, entry.path)

            await fs.mkdir(path.dirname(file), { recursive: true })
            await fs.writeFile(file, entry.content)
          })
        )

        console.log(
          options.workspace
            ? `[MDX: ${options.workspace.name}] generated files in ${performance.now() - start}ms`
            : `[MDX] generated files in ${performance.now() - start}ms`
        )
      }

      for (const [name, workspace] of workspaces) {
        if (filterWorkspace && !filterWorkspace(name)) continue
        out.workspaces[name] = (await workspace.emit(emitOptions)).entries
      }

      return out
    },

    getPluginContext(): PluginContext {
      return {
        core: this,
      }
    },
    getPlugins() {
      return plugins;
    },
    getOptions() {
      return options
    },
    /**
     * The file path of compiled config file, the file may not exist (e.g. on Vite, or still compiling)
     */
    getCompiledConfigPath(): string {
      return path.join(options.outDir, 'source.config.mjs')
    },

    getCollections(): CollectionItem[] {
      return Array.from(config.collections.values())
    },

    getWorkspaces() {
      return workspaces
    },
  }
}

function postprocessPlugin(): Plugin {
  const LinkReferenceTypes = `{
  /**
   * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
   */
  extractedReferences: import("xyzdocs-mdx").ExtractedReference[];
}`

  return {
    'index-file': {
      generateTypeConfig() {
        const lines: string[] = []
        lines.push('{')
        lines.push('  DocData: {')
        for (const collection of this.core.getCollections()) {
          let postprocessOptions: Partial<PostprocessOptions> | undefined
          switch (collection.type) {
            case 'doc':
              postprocessOptions = collection.postprocess
              break
            case 'docs':
              postprocessOptions = collection.docs.postprocess
              break
          }

          if (postprocessOptions?.extractLinkReferences) {
            lines.push(ident(`${collection.name}: ${LinkReferenceTypes},`, 2))
          }
        }
        lines.push('  }')
        lines.push('}')
        return lines.join('\n')
      },
      serverOptions(options) {
        options.doc ??= {}
        options.doc.passthroughs ??= []
        options.doc.passthroughs.push('extractedReferences')
      },
    },
  }
}


export type Core = ReturnType<typeof createCore>
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { NoteMeta } from '@/lib/notes'

  export const meta: NoteMeta
  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}

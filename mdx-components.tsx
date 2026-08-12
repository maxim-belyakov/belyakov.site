import type { MDXComponents } from 'mdx/types'

/**
 * Required by @next/mdx in the App Router. The note body is styled by the
 * .prose-note rules in globals.css, so there is nothing to override here for
 * plain prose. Anchor behaviour is the one exception worth being explicit
 * about: external links in a note should not silently keep the referrer.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Markdown emits a bare <table>. On a phone a wide one would push the page
    // sideways, so it gets a scrolling wrapper instead of overflowing.
    table: (props) => (
      <div style={{ overflowX: 'auto' }}>
        <table {...props} />
      </div>
    ),
    a: ({ href, ...props }) => {
      const external = typeof href === 'string' && href.startsWith('http')
      return (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          {...props}
        />
      )
    },
    ...components,
  }
}

declare module 'remark-highlight.js' {
  import { Plugin } from 'unified'
  interface highlightJs extends Plugin {
    include?: string[]
    exclude?: string[]
    prefix?: string
  }
  const highlight: highlightJs
  export = highlight
}

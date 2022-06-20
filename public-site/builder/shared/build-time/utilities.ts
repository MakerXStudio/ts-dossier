import unified from 'unified'
import markdown from 'remark-parse'
import highlight from 'remark-highlight.js'
import html from 'remark-html'
import { readdir, readFileSync } from 'fs-extra'

export const covertMarkdownToHtml = async (content: string): Promise<string> =>
  (
    await unified()
      .use(markdown)
      .use(highlight,{ exclude: ['tsx'] })
      .use(html)
      .process(content)
  ).toString()

export const getMarkdownFileNames = async (subPath: string): Promise<string[]> =>
  (await readdir(`${process.cwd()}/${subPath}`)).filter((fn: string) => fn.endsWith('.md'))

export const readFile = (subPath: string, fileName: string): Buffer => readFileSync(`${process.cwd()}/${subPath}/${fileName}`)

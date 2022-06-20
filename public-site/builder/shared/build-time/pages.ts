import matter from 'gray-matter'
import { extractPageMeta, IPageMeta } from '../pages'
import { getMarkdownFileNames, readFile } from './utilities'

export const getPageMarkdownFileNames = async (): Promise<string[]> => getMarkdownFileNames('../')

export const readPageFile = (fileName: string): Buffer => readFile('../', fileName)

export const getPageMetaData = async (): Promise<IPageMeta[]> => {
  const postFileNames = await getPageMarkdownFileNames()
  const pageMeta = postFileNames.map((fileName: string) => {
    const { data } = matter(readPageFile(fileName))
    return extractPageMeta(data)
  })
  return pageMeta
}

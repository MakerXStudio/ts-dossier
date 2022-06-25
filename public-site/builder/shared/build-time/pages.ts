import matter from 'gray-matter'
import { extractPageMeta, IPageMeta } from '../pages'
import { getMarkdownFileNames, readFile } from './utilities'

export const getMiscellaneousPageMarkdownFileName = async (): Promise<string[]> => {
  return (await getMarkdownFileNames('../')).filter((f) => f !== 'index.md')
}

export const readPageFile = (fileName: string, path: string = '../'): Buffer => readFile(path, fileName)

export const getMiscellaneousPageMetaData = async (): Promise<IPageMeta[]> => {
  const postFileNames = await getMiscellaneousPageMarkdownFileName()

  return postFileNames.map((fileName: string) => {
    const { data } = matter(readPageFile(fileName))
    return extractPageMeta(data)
  })
}

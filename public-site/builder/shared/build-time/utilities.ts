import { readdir, readFileSync } from 'fs-extra'

export const getMarkdownFileNames = async (subPath: string): Promise<string[]> =>
  (await readdir(`${process.cwd()}/${subPath}`)).filter((fn: string) => fn.endsWith('.md'))

export const readFile = (subPath: string, fileName: string): Buffer => readFileSync(`${process.cwd()}/${subPath}/${fileName}`)

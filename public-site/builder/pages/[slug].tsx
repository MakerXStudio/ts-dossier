import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { extractPageMeta, IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMarkdownFileName, getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import { Markdown } from '../components/Markdown'

interface MiscellaneousPageProps {
  pageMeta: IPageMeta
  markdown: string
  pages: IPageMeta[]
}

const MiscellaneousPage = (props: MiscellaneousPageProps) => {
  return (
    <Page pages={props.pages} title={props.pageMeta.title}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <Markdown>{props.markdown}</Markdown>
        </div>
      </div>
    </Page>
  )
}

export default MiscellaneousPage

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: MiscellaneousPageProps }> => {
  const slug = context.params!.slug
  const { data, content } = matter(readPageFile(`${slug}.md`))
  const blogMeta = extractPageMeta(data)
  const pages = await getMiscellaneousPageMetaData()

  return {
    props: {
      pageMeta: blogMeta,
      markdown: content,
      pages,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: Array<string | { params: { slug: string } }>
  fallback: boolean
}> => {
  const markdownFileNames = await getMiscellaneousPageMarkdownFileName()
  const markdownFileNamesWithoutExtensions = markdownFileNames.map((fileName) => fileName.replace('.md', ''))

  return {
    paths: markdownFileNamesWithoutExtensions.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: false,
  }
}

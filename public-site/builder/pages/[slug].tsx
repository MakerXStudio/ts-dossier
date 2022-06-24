import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { extractPageMeta, IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMarkdownFileName, getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { covertMarkdownToHtml } from '../shared/build-time/utilities'
import { Page } from '../components/Page'

interface MiscellaneousPageProps {
  pageMeta: IPageMeta
  html: string
  pages: IPageMeta[]
}

const MiscellaneousPage = (props: MiscellaneousPageProps) => {
  return (
    <Page pages={props.pages} title={props.pageMeta.title}>
      <div className="pt-24">
        <section dangerouslySetInnerHTML={{ __html: props.html }}></section>
      </div>
    </Page>
  )
}

export default MiscellaneousPage

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: MiscellaneousPageProps }> => {
  const slug = context.params!.slug
  const { data, content } = matter(readPageFile(`${slug}.md`))
  const blogMeta = extractPageMeta(data)
  const html = await covertMarkdownToHtml(content)
  const pages = await getMiscellaneousPageMetaData()

  return {
    props: {
      pageMeta: blogMeta,
      html,
      pages
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

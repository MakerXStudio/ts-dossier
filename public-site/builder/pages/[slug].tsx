import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { extractPageMeta, IPageMeta } from '../shared/pages'
import { getPageMarkdownFileNames, readPageFile } from '../shared/build-time/pages'
import { covertMarkdownToHtml } from '../shared/build-time/utilities'
import { Page } from '../components/Page'

interface IDocPage {
  pageMeta: IPageMeta
  html: string
}

const DocPage = (props: IDocPage) => {
  return (
    <Page title={props.pageMeta.title}>
      <section dangerouslySetInnerHTML={{ __html: props.html }}></section>
    </Page>
  )
}

export default DocPage

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: IDocPage }> => {
  const slug = context.params!.slug
  const { data, content } = matter(readPageFile(`${slug}.md`))
  const blogMeta = extractPageMeta(data)
  const html = await covertMarkdownToHtml(content)

  return {
    props: {
      pageMeta: blogMeta,
      html,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: Array<string | { params: { slug: string } }>
  fallback: boolean
}> => {
  const markdownFileNames = await getPageMarkdownFileNames()
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

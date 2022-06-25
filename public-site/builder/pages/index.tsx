import React from 'react'
import { GetStaticProps } from 'next'
import { IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import { covertMarkdownToHtml } from '../shared/build-time/utilities'
import matter from 'gray-matter'

interface IIndexProps {
  pages: IPageMeta[]
  html: string
}

const IndexPage = (props: IIndexProps) => {
  const titleProps = {
    title: 'ts-object-mother',
    titleSuperscript: (
      <>
        Proudly built and maintained by <a href="https://makerx.com.au">MakerX</a>
      </>
    ),
    titleSubscript: 'An ObjectMother support library to facilitate the easy creation of builders in TypeScript',
    image: '/theme/makerx-icon.png',
  }
  return (
    <Page pages={props.pages} {...titleProps}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <section className="w-full markdown" dangerouslySetInnerHTML={{ __html: props.html }}></section>
        </div>
      </div>
    </Page>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async (): Promise<{ props: IIndexProps }> => {
  const pages = await getMiscellaneousPageMetaData()

  let { content } = matter(readPageFile('README.md', '../../'))

  // Remove readme.md title
  content = content.substring(content.indexOf('[!['))

  const html = await covertMarkdownToHtml(content)
  return {
    props: { pages, html },
  }
}

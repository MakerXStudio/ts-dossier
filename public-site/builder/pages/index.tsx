import React from 'react'
import { GetStaticProps } from 'next'
import { IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import matter from 'gray-matter'
import { Markdown } from '../components/Markdown'

interface IIndexProps {
  pages: IPageMeta[]
  markdown: string
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
          <Markdown>{props.markdown}</Markdown>
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

  return {
    props: { pages, markdown: content },
  }
}

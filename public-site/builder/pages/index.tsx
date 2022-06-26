import React from 'react'
import { GetStaticProps } from 'next'
import { IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ghcolors as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
          <ReactMarkdown
            className="w-full markdown"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={theme as any}
                    PreTag="div"
                    customStyle={ { fontSize: '16px', fontFamily: 'mono' }}
                    {...props}
                  >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {props.markdown}
          </ReactMarkdown>
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

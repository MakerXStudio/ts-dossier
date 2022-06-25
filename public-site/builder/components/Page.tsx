import { PageHeader } from './PageHeader'
import React, { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { If } from './If'
import { SiteHeader } from './SiteHeader'
import { IPageMeta } from '../shared/pages'

export interface PageProps {
  children: ReactNode
  title?: ReactNode
  titleSubscript?: ReactNode
  pages: IPageMeta[]
}

export const Page = (props: PageProps) => {
  return (
    <>
      <SiteHeader pages={props.pages} />
      <If condition={Boolean(props.title)}>
        <PageHeader titleSubscript={props.titleSubscript}>{props.title}</PageHeader>
      </If>
      <main>{props.children}</main>
      <SiteFooter></SiteFooter>
    </>
  )
}

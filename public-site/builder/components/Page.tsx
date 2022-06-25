import { PageHeader, PageHeaderProps } from './PageHeader'
import React, { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { IPageMeta } from '../shared/pages'

export interface PageProps extends PageHeaderProps {
  children: ReactNode
  pages: IPageMeta[]
}

export const Page = (props: PageProps) => {
  return (
    <>
      <SiteHeader pages={props.pages} />
      <PageHeader {...props}></PageHeader>
      <main>{props.children}</main>
      <SiteFooter></SiteFooter>
    </>
  )
}

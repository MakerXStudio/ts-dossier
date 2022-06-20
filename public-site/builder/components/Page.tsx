import { Header } from './Header'
import React, { ReactNode } from 'react'
import { Footer } from './Footer'

export interface PageProps {
  children: ReactNode
  title: ReactNode
  titleSubscript?: ReactNode
}

export const Page = (props: PageProps) => {
  return (
    <>
      <Header titleSubscript={props.titleSubscript}>{props.title}</Header>
      <main>{props.children}</main>
      <Footer></Footer>
    </>
  )
}

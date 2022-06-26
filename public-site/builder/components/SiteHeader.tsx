import React, { useEffect, useState } from 'react'
import { IPageMeta, sortPageMetaDescending } from '../shared/pages'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface SiteHeaderProps {
  pages: IPageMeta[]
}

const HeaderLink = ({
  slug,
  name,
  scrolling,
  selected = false,
}: {
  slug: string
  name: string
  scrolling: boolean
  selected?: boolean
}) => {
  return (
    <li className="mr-3">
      <Link href={slug}>
        <a
          className={
            selected
              ? `inline-block py-2 px-4 text-lg text-white underline underline-offset-8 decoration-2 font-bold pointer-events-none`
              : `inline-block py-2 px-4 text-lg ${scrolling ? 'text-white' : 'text-black'} no-underline hover:underline hover:underline-offset-8 hover:decoration-2 font-bold`
          }
        >
          {name}
        </a>
      </Link>
    </li>
  )
}

export const SiteHeader = (props: SiteHeaderProps) => {
  const sortedPages = sortPageMetaDescending(props.pages)
  const router = useRouter()
  const miscellaneousPageLinks = sortedPages.map((p) => ({
    slug: '/' + p.slug,
    name: p.title,
    selected: router.asPath == '/' + p.slug,
  }))
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [scrolling, setScroll] = useState(false)

  useEffect(() => {
    const listener = (e: Event) => {
      if (window.scrollY > 0 && !scrolling) {
        setScroll(true)
      }
      if (window.scrollY === 0 && scrolling) {
        setScroll(false)
      }
    }
    document.addEventListener('scroll', listener)
    return () => {
      document.removeEventListener('scroll', listener)
    }
  })

  return (
    <nav
      id="header"
      className={`fixed w-full z-30 top-0 text-white ${hamburgerOpen ? 'bg-white lg:bg-transparent' : ''}  ${
        scrolling && !hamburgerOpen ? 'bg-black transform transition duration-500 ease-in-out' : ''
      } `}
      onBlur={() => (hamburgerOpen ? setTimeout(() => setHamburgerOpen(false), 250) : {})}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link href="/">
            <a
              className={`toggleColour ${
                hamburgerOpen ? 'text-gray-700' : 'text-white'
              } no-underline hover:no-underline font-bold text-2xl lg:text-4xl`}
            >
              {/* CC License https://www.svgrepo.com/svg/56030/package */}
              <svg x="0px" y="0px" viewBox="0 0 512.005 512.005" className="h-8 fill-current inline pr-6">
                <path
                  d="M481.82,113.212L248.656,25.904c-2.302-0.857-4.854-0.857-7.157,0L6.707,113.822c-4.122,1.199-9.106,7.707-5.419,14.367
	v246.524c0,4.356,2.761,8.224,6.878,9.65l231.043,79.744c1.371,0.788,2.428,1.48,4.85,1.801c3.394,0.45,5.542-0.502,5.558-0.507
	l234.792-81.038c4.117-1.426,6.879-5.294,6.879-9.65V123.382C491.374,118.49,485.637,114.565,481.82,113.212z M450.76,123.382
	l-205.07,76.793l-61.542-23.04l195.319-80.45L450.76,123.382z M351.383,86.168l-205.248,84.537l-5.054,49.097l-38.212-15.392
	v-45.568l212.879-86.019L351.383,86.168z M245.078,46.361l42.396,15.875L90.17,141.947l-50.172-18.791L245.078,46.361z
	 M21.706,138.559l60.747,22.749v56.879l76.163,30.686l5.852-56.86l71.613,26.818v222.595l-214.375-73.99V138.559z M470.872,367.435
	l-214.375,73.99V218.377l214.375-80.271V367.435z"
                />
              </svg>
              TS ObjectMother
            </a>
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className={`flex items-center p-1 ${
              hamburgerOpen ? 'text-black' : 'text-white'
            } hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
            hamburgerOpen ? '' : 'hidden'
          } mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {miscellaneousPageLinks.map((p) => (
              <HeaderLink key={p.slug} scrolling={scrolling} {...p}></HeaderLink>
            ))}
            <HeaderLink name="Code Docs" scrolling={scrolling} slug="#"></HeaderLink>
          </ul>
          <a
            href="https://github.com/MakerXStudio/ts-object-mother"
            className="inline-block mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            {/* MIT License https://www.svgrepo.com/svg/344880/github */}
            <svg x="0px" y="0px" viewBox="0 0 16 16" className="h-8 fill-gray-700 inline pr-4">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  )
}

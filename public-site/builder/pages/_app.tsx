import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TS ObjectMother (ts-object-mother)</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

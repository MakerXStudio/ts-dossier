import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="An ObjectMother support library to facilitate the easy creation of builders in TypeScript" />
          <meta name="keywords" content="ts-object-mother opensource makerx" />
          <meta name="author" content="MakerX" />

          {/* Generated using https://github.com/ruisaraiva19/favycon */}
          <link rel="apple-touch-icon" sizes="57x57" href="/theme/favicon/favicon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/theme/favicon/favicon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/theme/favicon/favicon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/theme/favicon/favicon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/theme/favicon/favicon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/theme/favicon/favicon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/theme/favicon/favicon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/theme/favicon/favicon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/theme/favicon/favicon-180x180.png" />
          <link rel="icon" type="image/svg+xml" href="/theme/favicon/favicon.svg" />
          <link rel="icon" type="image/png" sizes="16x16" href="/theme/favicon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/theme/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/theme/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/theme/favicon/favicon-192x192.png" />
          <link rel="shortcut icon" type="image/x-icon" href="/theme/favicon/favicon.ico" />
          <link rel="icon" type="image/x-icon" href="/theme/favicon/favicon.ico" />

          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="leading-normal tracking-normal text-white gradient" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
        <Html>
          <Head>
            <meta name="Description"
                  content={'Maxim Belyakov - Hi, my name is Max 👋 I\'m a full time Senior Frontend Developer and part time entrepreneur.'}/>
            <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />

            <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#000000"/>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
    )
  }
}
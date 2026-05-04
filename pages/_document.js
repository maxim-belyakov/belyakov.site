import Document, { Html, Head, Main, NextScript } from 'next/document'

const SITE_URL = 'https://belyakov.site'
const SITE_NAME = 'Maksim Beliakov'
const SITE_DESCRIPTION = "Maksim Beliakov — Full Stack Engineer & Team Lead. 10+ years building scalable React, TypeScript, AWS and Node.js products at EPAM, SUMO Scheduler and others."
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maksim Beliakov',
  alternateName: 'Maxim Belyakov',
  url: SITE_URL,
  image: OG_IMAGE,
  jobTitle: 'Senior Full Stack Engineer',
  description: SITE_DESCRIPTION,
  knowsAbout: [
    'React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL',
    'Frontend Architecture', 'Team Leadership', 'Agile', 'Microservices'
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Moscow State Industrial University'
  },
  sameAs: [
    'https://www.linkedin.com/in/maksim-a-beliakov',
    'https://github.com/maxim-belyakov',
    'https://medium.com/@maxim.a.belyakov',
    'https://x.com/maxim_a_bel',
    'https://facebook.com/maxim.a.belyakov/',
    'https://instagram.com/maksim.a.beliakov'
  ]
}

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head>
          {/* Core */}
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta name="author" content="Maksim Beliakov" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="theme-color" content="#000000" />

          {/* Icons */}
          <link rel="icon" href="/favicon.ico" />
          <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Open Graph */}
          <meta property="og:type" content="profile" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="Maksim Beliakov — Full Stack Engineer" />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:image" content={OG_IMAGE} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Maksim Beliakov — Full Stack Engineer" />
          <meta property="profile:first_name" content="Maksim" />
          <meta property="profile:last_name" content="Beliakov" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@maxim_a_bel" />
          <meta name="twitter:creator" content="@maxim_a_bel" />
          <meta name="twitter:title" content="Maksim Beliakov — Full Stack Engineer" />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta name="twitter:image" content={OG_IMAGE} />

          {/* Structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

import Head from 'next/head'
import Link from "next/link"
import React from 'react'
import EmblaSlider from '../../components/embla-slider/embla-slider'
import projectsData from "../../JSON/projectsData.json"
import styles from './portfolio.module.scss'

export default function Index() {
  return(
      <>
        <Head>
          <title>Portfolio — Maksim Beliakov, Full Stack Engineer</title>
          <meta
            name="description"
            content="Portfolio of Maksim Beliakov: SUMO Scheduler, EPAM Systems, InLoop, Cultural Service, and personal projects in React, TypeScript, AWS and Node.js."
          />
          <link rel="canonical" href="https://belyakov.site/portfolio/" />
          <meta property="og:url" content="https://belyakov.site/portfolio/" />
          <meta property="og:title" content="Portfolio — Maksim Beliakov" />
        </Head>

        <div className={styles.Portfolio}>
          <div className={styles.Portfolio_back}>
            <Link href="/" className={styles.Portfolio_backButton}>Back</Link>
          </div>

          <EmblaSlider className={styles.embla} data={projectsData.message} />
        </div>
      </>
  )
}
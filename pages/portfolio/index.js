import Link from "next/link"
import React from 'react'
import EmblaSlider from '../../components/embla-slider/embla-slider'
import projectsData from "../../JSON/projectsData.json"
import styles from './portfolio.module.scss'

export default function Index() {
  return(
      <div className={styles.Portfolio}>
        <div className={styles.Portfolio_back}>
          <Link href="/" passHref>
            <a className={styles.Portfolio_backButton}>Back</a>
          </Link>
        </div>

        <EmblaSlider className={styles.embla} data={projectsData.message} />
      </div>
  )
}
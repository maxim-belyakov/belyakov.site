import Head from 'next/head'
// import Image from 'next/image'
import Link from "next/link"
import { SocialIcon } from 'react-social-icons';
import socialIcons from "../JSON/socialIcons"
import styles from './index.module.scss'

export default function Home() {
  const socials = socialIcons.message;
  const iconSocialSize = 45;

  return (
    <div className={styles.layout}>
      <Head>
        <title>Maxim Belyakov - Senior Frontend Developer</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="description"
              content="Maxim Belyakov - Hi, my name is Max 👋 I'm a full time Senior Frontend Developer and part time entrepreneur."/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Maxim Belyakov</h1>
        <p className={styles.lead}>Creating is my passion. Being better than yesterday really makes me happy.</p>
        <p className={styles.quote}>Life is 10% what happens to you and 90% how you react to it.</p>
        <p className={styles.emoji}>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="alien">👽</span>
          <span role="img" aria-label="alien-monster">👾</span>
        </p>
        <section>
          <h2 className={styles.portfolio}>
            <Link className={styles.link} href="/portfolio">Portfolio projects</Link>
          </h2>
        </section>
        <section className={styles.socials}>
          {socials.map((social, i) => (
              <SocialIcon
                  key={i}
                  bgColor="#222222"
                  target="_blank"
                  style={{ height: iconSocialSize, width: iconSocialSize }} network={social.name} url={social.link}
              />
          ))}
        </section>
      </main>
    </div>
  )
}

import Head from 'next/head'
import Link from "next/link"
import { SocialIcon } from 'react-social-icons';
import useWindowSize from '../components/window-size/window-size'
import socialIcons from "../JSON/socialIcons"
import styles from './index.module.scss'

export default function Home() {
  const { width } = useWindowSize();
  const socials = socialIcons.message;
  const iconSocialSize = width > 1024 ? '45px' : '9vw';


  return (
    <>
      <Head>
        <title>Maxim Belyakov - Senior Frontend Developer</title>
      </Head>

      <main className={styles.home}>
        <h1 className={styles.title}>Maxim Belyakov</h1>
        <p className={styles.lead}>Creating is my passion. Being better than yesterday really makes me happy.</p>
        <p className={styles.quote}>Life is 10% what happens to you and 90% how you react to it.</p>
        <p className={styles.emoji}>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="alien">👽</span>
          <span role="img" aria-label="alien-monster">👾</span>
        </p>
        <h2 className={styles.portfolio}>
          <Link href="/portfolio"><a className={styles.link}>Portfolio projects</a></Link>
        </h2>
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
    </>
  )
}

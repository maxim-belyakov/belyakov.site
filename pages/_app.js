import TransitionLayout from "../components/transition-layout/transition-layout";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <TransitionLayout>
      <Component {...pageProps} />
    </TransitionLayout>
  )
}

export default MyApp

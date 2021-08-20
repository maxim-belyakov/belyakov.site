import TransitionLayout from "../components/transition-layout/transition-layout";
import '../styles/globals.css'

import Router from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <TransitionLayout>
      <Component {...pageProps} />
    </TransitionLayout>
  )
}

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange );
Router.events.on("routeChangeStart", routeChange );

export default MyApp

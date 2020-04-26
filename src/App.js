import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { CSSTransition } from "react-transition-group";

import Portfolio from './components/Portfolio';
import socialIcons from "./JSON/socialIcons"

import './scss/app.scss';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/:portfolio/', name: 'Portfolio', Component: Portfolio }
]

export default function App() {

  return (
    <Router>
      <>
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
     </>
    </Router>
  )
}

function Home() {
  
  const socials = socialIcons.message
  const [iconSocialSize] = useState(45)
  // const [iconSocialSize, setIconSocialSize] = useState(45)

  return (
    <main>
      <h1>Maxim Belyakov</h1>
      <p className="lead">Creating is my passion. Being better than yesterday really makes me happy.</p>
      <p className="quote">Life is 10% what happens to you and 90% how you react to it.</p>
      <p className="emoji">
        <span role="img" aria-label="rocket">🚀</span>
        <span role="img" aria-label="alien">👽</span>
        <span role="img" aria-label="alien-monster">👾</span> 
      </p>
      <section>
        <h2 className="check">
          <Link to="/portfolio">Portfolio projects</Link>
        </h2>
      </section>
      <section className="socials">
        {socials.map((social, i) => (
          <SocialIcon key={i} bgColor="#222222" style={{ height: iconSocialSize, width: iconSocialSize }} network={social.name} url={social.link}/>
        ))}
      </section>
    </main>
  );
}
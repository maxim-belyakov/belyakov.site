import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { CSSTransition } from "react-transition-group";

import Portfolio from './components/Portfolio';
import socialIcons from "./JSON/socialIcons"

import './scss/app.scss';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/portfolio', name: 'Portfolio', Component: Portfolio }
]

export default function App() {
  let location = true;

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

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
  const [iconSocialSize, setIconSocialSize] = useState(45)

  return (
    <main>
      <h1>Maxim Belyakov</h1>
      <p className="lead">My passion is creating, and I find happiness in being a better me today than the me yesterday.</p>
      <p className="quote">Life is 10% what happens to you and 90% how you react to it.</p>
      <p className="emoji"> 🚀 👽 👾 </p>
      <section>
        <h2 className="check">
          <Link to="/portfolio">Portfolio projects</Link>
        </h2>
      </section>
      <section className="socials">
        {socials.map((social, i) => (
          <SocialIcon bgColor="#222222" style={{ height: iconSocialSize, width: iconSocialSize }} network={social.name} url={social.link}/>
        ))}
      </section>
    </main>
  );
}
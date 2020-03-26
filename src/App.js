import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import Portfolio from './components/Portfolio';
import './App.css';

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
      <div>
        {/* <Switch location={background || location}>*/}

        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route path="/portfolio" children={<Portfolio />} />
          {/* <Route path="/img/:id" children={<ImageView />} /> */}
        </Switch>

        {/* Show the modal when a background page is set */}
        {/* {background && <Route path="/img/:id" children={<Modal />} />} */}
     </div>
    </Router>
  )
}

function Home() {
  return (
    <main>
      <h1>Maxim Belyakov</h1>
      <p className="lead">My passion is creating, and I find happiness in being a better me today than the me yesterday.</p>
      <p className="quote">Life is 10% what happens to you and 90% how you react to it.</p>
      <p> 🚀 👽 👾 </p>
      <section>
        <h2 className="check">
          <Link to="/portfolio">Portfolio projects</Link>
        </h2>
      </section>
      <section>
        <h2 className="check">Links</h2>
        <ul>
          <li> <a href="https://linkedin.com/in/maxim-belyakov">LinkedIn</a> </li>
          <li> <a href="mailto:maxim.a.belyakov@gmail.com?subject=Hey, Maxim!">E-mail</a> </li>
          <li> <a href="https://medium.com/@maxim.a.belyakov">Medium</a> </li>
          <li> <a href="https://instagram.com/maxim_chai">Instagram</a> </li>
          <li> <a href="https://github.com/maxim-belyakov">GitHub</a> </li>
          <li> <a href="https://twitter.com/maxim_chai">Twitter</a> </li>
          <li> <a href="https://facebook.com/maxim.a.belyakov">Facebook</a> </li>
        </ul>
      </section>
    </main>
  );
}
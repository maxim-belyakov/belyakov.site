import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// components
import Home from "./components/Home";
import Portfolio from './components/Portfolio';

// SCSS
import './scss/app.scss';

function App({ location }) {
  return (
    <div>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="page"
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route path="/portfolio" component={Portfolio} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default withRouter(App);
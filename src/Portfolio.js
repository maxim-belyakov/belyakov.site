import React from 'react';
import App from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Portfolio() {
  return (
    <main>
      <Switch>
        <Router>
            <Link to="/">Back</Link>
        </Router>

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </main>
  );
}

export default Portfolio;

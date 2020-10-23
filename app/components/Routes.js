import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllSubways from "./AllSubways";
import Home from "./Home";
import SingleSubway from "./SingleSubway";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" className="navBarLink">
            <h4> Welcome!</h4>
          </Link>
          <Link to="/subways" className="navBarLink">
            <h5>Subways</h5>
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/subways" component={AllSubways} />
          <Route exact path="/subways/:subwayId" component={SingleSubway} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

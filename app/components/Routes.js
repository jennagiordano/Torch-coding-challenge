import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllCampuses from "./AllCampuses";
import Home from "./Home";
import SingleCampus from "./SingleCampus";

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
          <Route exact path="/subways" component={AllCampuses} />
          <Route exact path="/subways/:subwayId" component={SingleCampus} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

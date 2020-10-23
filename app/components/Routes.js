import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import AllSubways from "./AllSubways";
import SubwayStatus from "./SubwayStatus";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" className="navBarLink">
            <h4> Welcome!</h4>
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={AllSubways} />
          <Route exact path="/status/:subwayName" component={SubwayStatus} />
          <Route exact path="/uptime/:subwayName" component={SubwayStatus} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

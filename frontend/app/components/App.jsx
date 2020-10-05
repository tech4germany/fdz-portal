import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Script from "./Script";
import Applications from "./Applications";
import Application from "./Application";
import Login from "./Auth/Login";
import ApplicationNew from "./ApplicationNew";
import Manage from "./Manage/Manage";
import Details from "./Manage/Details";
import StatusShow from "./Status/StatusTest";
import jwtDecode from "jwt-decode";
import "./App.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.setUser(true),
      currentPage: "",
    };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Math.round(Date.now() / 1000)) {
        return null;
      }

      if (init) return decoded;
      this.setState({ user: decoded });
    } else {
      return null;
    }
  }

  logout() {
    this.setState({ user: null });
    localStorage.removeItem("identity");
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header logout={this.logout} user={this.state.user} />
          {this.state.user ? (
            <Switch>
              <Route exact path="/">
                {this.state.user.role === "researcher" ? (
                  <Applications />
                ) : (
                  <Manage />
                )}
              </Route>
              <Route
                exact
                path="/applications"
                render={() => <Applications />}
              />
              <Route exact path="/applications/new">
                <ApplicationNew />
              </Route>
              <Route
                path="/applications/:id/script/:type"
                render={() => <Script />}
              />
              <Route path="/applications/:id" render={() => <Application />} />
              <Route exact path="/manage" render={() => <Manage />} />
              <Route path="/manage/:id" render={() => <Details />} />
              <Route exact path="/status" render={() => <StatusShow />} />
              <Route exact path="/login" render={() => <Redirect to="/" />} />
              <Route
                path="/auth"
                render={() => (
                  <Auth setUser={this._setUser} resetUser={this._resetUser} />
                )}
              />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          ) : (
            <Login setUser={this.setUser} />
          )}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Script from "./Script";
import Applications from "./Applications";
import Application from "./Application";
import Login from "./Auth/Login";
import ApplicationNew from "./New/ApplicationNew";
import ApplicationUpload from "./New/ApplicationUpload";
import Manage from "./Manage/Manage";
import Details from "./Manage/Details";
import Time from "./Manage/Time";
import Users from "./Manage/Users";
import jwtDecode from "jwt-decode";
import { getData } from "./utils/api";
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

  async logout() {
    localStorage.removeItem("identity");
    window.location.href = "/";
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header logout={this.logout} user={this.state.user} />
          {this.state.user ? (
            <Switch>
              <Route exact path="/">
                {this.state.user.role === "research" ? (
                  <Applications />
                ) : (
                  <Manage />
                )}
              </Route>
              <Route exact path="/applications">
                {this.state.user.role === "research" ? (
                  <Applications />
                ) : (
                  <Redirect to="/manage" />
                )}
              </Route>
              <Route exact path="/applications/new">
                <ApplicationNew />
              </Route>
              <Route
                path="/applications/:id/upload"
                render={() => <ApplicationUpload />}
              />
              <Route
                path="/applications/:id/script/:type"
                render={() => <Script />}
              />
              <Route path="/applications/:id" render={() => <Application />} />
              <Route exact path="/manage">
                {this.state.user.role === "research" ? (
                  <Redirect to="/" />
                ) : (
                  <Manage />
                )}
              </Route>
              <Route path="/manage/:id">
                {this.state.user.role === "research" ? (
                  <Redirect to="/" />
                ) : (
                  <Details />
                )}
              </Route>
              <Route exact path="/time">
                {this.state.user.role === "research" ? (
                  <Redirect to="/" />
                ) : (
                  <Time />
                )}
              </Route>
              <Route exact path="/users">
                {this.state.user.role === "research" ? (
                  <Redirect to="/" />
                ) : (
                  <Users />
                )}
              </Route>
              <Route exact path="/login" render={() => <Redirect to="/" />} />
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

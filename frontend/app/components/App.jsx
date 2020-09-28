import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Script from "./Script";
import Applications from "./Applications";
import Application from "./Application";
import Login from "./Auth/Login";
import ApplicationNew from "./ApplicationNew";
import StatusShow from "./StatusShow";
import "./App.css";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/">
              <Applications />
            </Route>
            <Route exact path="/applications" render={() => <Applications />} />
            <Route exact path="/applications/new">
              <ApplicationNew />
            </Route>
            <Route path="/application/:id/script" render={() => <Script />} />
            <Route path="/application/:id" render={() => <Application />} />
            <Route path="/status" render={() => <StatusShow />} />
            <Route path="/login" render={() => <Login />} />
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
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

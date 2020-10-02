import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
            <Route
              path="/applications/:id/script/:type"
              render={() => <Script />}
            />
            <Route path="/applications/:id" render={() => <Application />} />
            <Route exact path="/manage" render={() => <Manage />} />
            <Route path="/manage/:id" render={() => <Details />} />
            <Route exact path="/status" render={() => <StatusShow />} />
            <Route exact path="/login" render={() => <Login />} />
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

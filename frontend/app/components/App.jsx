import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Applications from "./Applications";
import Application from "./Application";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/applications" render={() => <Applications />} />
            <Route path="/application" render={() => <Application />} />
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

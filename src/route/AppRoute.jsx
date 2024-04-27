import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/PrivacyPage";
import PurchasePage from "../pages/PurchasePage";
import UserLoginPage from "../pages/UserLoginPage";
import ContactPage from "../pages/ContactPage";
import NotificationPage from "../pages/NotificationPage";
import FavouritePage from "../pages/FavouritePage";
import AboutPage from "../pages/AboutPage";

class AppRoute extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={UserLoginPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/home" component={HomePage} />

          <Route exact path="/purchase" component={PurchasePage} />
          <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/notification" component={NotificationPage} />
          <Route path="/notification/:id" component={NotificationPage} />
          <Route exact path="/favourite" component={FavouritePage} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </Fragment>
    );
  }
}

export default AppRoute;

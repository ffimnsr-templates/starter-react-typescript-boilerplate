import * as React from "react";

import "@/assets/styles/main.scss";
import "@/assets/fonts/SF-Pro-Display-Regular.otf";
import "@/assets/fonts/SF-Pro-Text-Regular.otf";

import { Switch } from "react-router";
import { Route } from "react-router-dom";
import { Home } from "@/Home";
import { ChooseBarber } from "@/ChooseBarber";
import { ChooseService } from "@/ChooseService";

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/services">
        <ChooseService />
      </Route>
      <Route path="/services/:id/barbers">
        <ChooseBarber />
      </Route>
      <Route exact path="/barbers">
        <ChooseBarber />
      </Route>
      <Route path="/barbers/:id/services">
        <ChooseService />
      </Route>
    </Switch>
  );
};

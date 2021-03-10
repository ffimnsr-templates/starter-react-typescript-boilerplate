import * as React from "react";
import _ from "lodash";
import log from "loglevel";
import { render as Render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./App";

import "../../api";

const WHITELIST_DOMAINS = ["localhost"];

log.setLevel(log.levels.INFO);

function render(): void {
  Render(
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>,
    document.getElementById("app")
  );
}

if (_.includes(WHITELIST_DOMAINS, window.location.hostname)) {
  if (module.hot) {
    module.hot.accept("@/App", () => render());
  }

  render();
}

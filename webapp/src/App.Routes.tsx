import React from "react";
import Home from "./ui/pages/Home/Home";
import TeamHomepage from "./ui/pages/TeamHomepage/TeamHomepage";

export enum RouteKey {
  Home = "/",
  TeamHomepage = "/team/:teamAddress",
}
// list of all the routes of the App
export const routes = [ {
  key: RouteKey.Home,
  protected: false,
  path: RouteKey.Home,
  component: <Home/>,
}, {
  key: RouteKey.TeamHomepage,
  protected: false,
  path: RouteKey.TeamHomepage,
  component: <TeamHomepage/>,
}]

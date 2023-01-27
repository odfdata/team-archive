import React from "react";
import Home from "./ui/pages/Home/Home";
import TeamArchive from "./ui/pages/TeamArchive/TeamArchive";

export enum RouteKey {
  Home = "/",
  TeamArchive = "/team/:teamAddress/archive",
  TeamMeeting = "/team/:teamAddress/meeting",
}
// list of all the routes of the App
export const routes = [ {
  key: RouteKey.Home,
  protected: false,
  path: RouteKey.Home,
  component: <Home/>,
}, {
  key: RouteKey.TeamArchive,
  protected: false,
  path: RouteKey.TeamArchive,
  component: <TeamArchive/>,
}, {
  key: RouteKey.TeamMeeting,
  protected: false,
  path: RouteKey.TeamMeeting,
  component: <TeamArchive/>,
}]

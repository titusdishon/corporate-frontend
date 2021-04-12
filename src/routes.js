import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import AuthLayout from "./components/Auth";
import ErrorLayout from "./components/Error";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Dashboard/Home/Home";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/auth/login" />,
  },
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth/login",
        exact: true,
        component: lazy(() => import("./components/Auth/Login")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-401",
        exact: true,
        component: lazy(),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: "*",
    component: Dashboard,
    routes: [
      {
        path: "/home",
        exact: true,
        component: Home,
      },
      {
        path: "/employees",
        exact: true,
        component: lazy(() => import("./components/Dashboard/Employees")),
      },
      {
        path: "/users",
        exact: true,
        component: lazy(() => import("./components/Dashboard/Users")),
      },
      {
        path: "/branches",
        exact: true,
        component: lazy(() => import("./components/Dashboard/Branches")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];

export default routes;

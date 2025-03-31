import { lazy } from "react";
import { ROUTES } from "../constants/routes";
import { IRouteType } from "../type/routes";

const Home = lazy(() => import("../pages/home"));
const PageNotFound = lazy(() => import("../pages/404"));

export const publicRoutes: IRouteType[] = [
  {
    path: ROUTES.root,
    element: Home,
    title: "Home",
  },
  {
    path: ROUTES.page_not_found,
    element: PageNotFound,
    title: "404 Not Found",
  },
];

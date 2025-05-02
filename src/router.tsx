import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./utils/routes";
import { NonAuthenticatedLayout } from "./layouts/non-authenticated";
import React from "react";
import Loader from "./components/loader";

const Router = () => {
  return (
    <NonAuthenticatedLayout>
      <React.Suspense fallback={<Loader height="100vh" width="100vw" />}>
        <Routes key={location.pathname}>
          {publicRoutes.map((routeObj) => (
            <Route
              path={routeObj.path}
              key={routeObj.path}
              element={<routeObj.element />}
            />
          ))}
        </Routes>
      </React.Suspense>
    </NonAuthenticatedLayout>
  );
};

export default Router;

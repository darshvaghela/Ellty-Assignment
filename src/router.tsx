import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./utils/routes";

const Router = () => {
  return (
    <Routes key={location.pathname}>
      {publicRoutes.map((routeObj) => (
        <Route
          path={routeObj.path}
          key={routeObj.path}
          element={<routeObj.element />}
        />
      ))}
    </Routes>
  );
};

export default Router;

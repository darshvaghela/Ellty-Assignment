import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import Router from "./router";
import { theme } from "./constants/theme";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: theme.primary,
        colorFillSecondary: theme.secondary,
      },
    }}
  >
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ConfigProvider>
);

export default App;

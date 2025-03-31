import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import Router from "./router.tsx";
import { GlobalStyles, theme } from "./constants/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorLink: theme.primary,
          colorSuccess: theme.primary,
          colorPrimary: theme.primary,
          borderRadius: theme.borderRadius,
          fontFamily: theme.fontFamily,
          fontSize: 14,
        },
      }}
    >
      <GlobalStyles />
      <App>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </App>
    </ConfigProvider>
  </React.StrictMode>
);

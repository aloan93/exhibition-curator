import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ExhibitionProvider } from "./contexts/ExhibitionProvider.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExhibitionProvider>
          <App />
        </ExhibitionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

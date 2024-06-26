import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ExhibitionProvider } from "./contexts/ExhibitionProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExhibitionProvider>
        <App />
      </ExhibitionProvider>
    </BrowserRouter>
  </React.StrictMode>
);

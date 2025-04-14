import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PropertyProvider>
      <App />
    </PropertyProvider>
  </BrowserRouter>
);

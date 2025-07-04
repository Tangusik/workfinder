import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

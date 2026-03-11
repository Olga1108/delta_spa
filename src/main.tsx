import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryProvider } from "./app/providers/QueryProvider";
import { AppRouterProvider } from "./app/providers/RouterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouterProvider />
    </QueryProvider>
  </StrictMode>,
);

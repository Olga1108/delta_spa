import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@pages/home";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/:locale", element: <HomePage /> },
]);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
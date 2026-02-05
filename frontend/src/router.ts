import { createBrowserRouter } from "react-router";
import App from "./App";
import Calendar from "./pages/Calendar";
import Employees from "./pages/Employees";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Calendar },
      { path: "employees", Component: Employees },
    ],
  },
]);

export default router;

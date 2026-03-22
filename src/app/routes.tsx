import { createBrowserRouter } from "react-router";
import { SizeSelection } from "./components/SizeSelection";
import { FlavorSelection } from "./components/FlavorSelection";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SizeSelection,
  },
  {
    path: "/flavors",
    Component: FlavorSelection,
  },
  {
    path: "/confirm",
    Component: OrderConfirmation,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);

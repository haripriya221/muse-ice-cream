import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/HomePage";
import { SizeSelection } from "./components/SizeSelection";
import { FlavorSelection } from "./components/FlavorSelection";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { SpinWheel } from "./components/SpinWheel";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/sizes",
    Component: SizeSelection,
  },
  {
    path: "/flavors",
    Component: FlavorSelection,
  },
  {
    path: "/spin",
    Component: SpinWheel,
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

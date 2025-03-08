import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import CreateOrder from "./CreateOrder.jsx";
import ViewOrder, { loader as viewLoader } from "./ViewOrder.jsx";
import AppLayout from "./AppLayout.jsx";
import Signup, { action as signupAction } from "./Signup.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AppLayoutForProtected from "./AppLayoutForProtected.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/signup", element: <Signup />, action: signupAction },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayoutForProtected />
      </ProtectedRoute>
    ),
    children: [
      { path: "/createOrder", element: <CreateOrder /> },
      { path: "/viewOrder", element: <ViewOrder />, loader: viewLoader },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

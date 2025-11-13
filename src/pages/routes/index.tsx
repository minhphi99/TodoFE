import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import App from "../../App";
import ForgotPassword from "../Auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotpw",
    element: <ForgotPassword />,
  },
]);

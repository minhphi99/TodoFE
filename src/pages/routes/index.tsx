import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import App from "../../App";

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
]);

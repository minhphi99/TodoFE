import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import App from "../../App";
import ForgotPassword from "../Auth/ForgotPassword";
import TodoDetail from "../Todo/TodoDetail";
import Todo from "../Todo/TodoList";
import ResetPassword from "../Auth/ResetPassword";
import EditTodo from "../Todo/EditTodo";
import LoginWithGoogle from "../Google OAuth/LoginWithGoogle";
import Profile from "../Todo/Profile";

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
    path: "/auth/google/callback",
    element: <LoginWithGoogle />,
  },
  {
    path: "/forgotpw",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpw/:token",
    element: <ResetPassword />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/todo/:id",
    element: <TodoDetail />,
  },
  {
    path: "/todo/edit/:id",
    element: <EditTodo />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

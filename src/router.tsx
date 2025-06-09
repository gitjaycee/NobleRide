import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Admin from "./components/Admin";
import Shop from "./components/Shop";

export const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/SignIn", element: <SignIn/>},
    {path: "/SignUp", element: <SignUp/>},
    {path: "/Admin", element: <Admin/>},
    {path: "/Shop", element: <Shop/>},
])
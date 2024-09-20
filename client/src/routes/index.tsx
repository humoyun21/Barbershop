import {useRoutes} from "react-router-dom";
import Auth from "./auth/Auth";
import SignIn from "./auth/sign-in/SignIn";
import SignUp from "./auth/sign-up/SignUp";

const index = () => {
  return useRoutes([
    {
        path: "/auth",
        element: <Auth/>,
        children: [
            {
                path: "sign-in",
                element: <SignIn/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            }
        ]
    }
  ])
}

export default index
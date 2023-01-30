import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Main from "../Components/Layout/Main";
import MyProfile from "../Components/MyProfile/MyProfile";
import Login from "../Components/Shared/LogIn/Login";
import SignUp from "../Components/Shared/SignUp/SignUp";

const route = createBrowserRouter([
    {
        path: '/',
        element: <Main> </Main>,
        children:[
            {
                path: '/',
                element: <Home> </Home>
            },
           
            {   path: '/login',
                element: <Login> </Login> 
            },
            {
                path: '/signup',
                element: <SignUp> </SignUp>

            },
            {
                path: '/my-profile',
                element: <MyProfile> </MyProfile>
            }
        ]
    
    }
   

]) 

export default route 
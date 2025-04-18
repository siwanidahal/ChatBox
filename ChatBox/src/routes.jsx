
import { createBrowserRouter } from "react-router";
import Login from "./component/login";
import Signup from "./component/signup";
import WhatsAppUI from "./App";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup", 
    element: <Signup />,
  },
   {

     path:"/chat",
   element:<WhatsAppUI/>
   }

]);

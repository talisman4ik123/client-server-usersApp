import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/registration",
    element: <Registration/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/users",
    element: <Users/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App

import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Schedule from './components/Schedule';
import Login from './components/Login';
import Classinfo from './components/Classinfo';
import { useLocation } from 'react-router-dom';
import { turnon,turnoff } from "./reducers/drawerinfo";
import { useDispatch } from "react-redux";

function App() {
  
  const Layout = () => {
    const dispatch = useDispatch();
    // const drawer = useSelector((state) => state.drawer.value);
    const location = useLocation();

    useEffect(()=>{
      if(location.pathname === '/schedule'){
        dispatch(turnoff());
        // console.log(location);
        // console.log(drawer);
      }
      else{
        dispatch(turnon());
        // console.log(location);
        // console.log(drawer);
      }
    },[location,dispatch]);

    return(
    <div className="App">
      <Header />
      <Navbar />
      <div className="Window-view-port">
        <div className="Navbar-shadow"></div>
        <div className="view-port-wrapper"><Outlet /> </div>
      </div>
    </div>)
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:
      [{
        path: "/",
        element: <Home/>,
      },
      {
        path: "/schedule",
        element: <Schedule/>,
      },
      {
        path: '/:classid',
        element: <Classinfo/>,
      },
    ],
      errorElement: <div>errrorr</div>
    },
    {
      path: '/login',
      element: <Login/>
    }
    // {
    //   path: "/schedule",
    //   element: <Schedule/>,
    // },
  ]);

  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

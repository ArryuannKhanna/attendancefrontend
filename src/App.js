import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Schedule from './components/Schedule';
import Login from './components/Login';
import Classinfo from './components/Classinfo';
import SigninS from './components/SigninS';
import SigninT from './components/SigninT';
import { fetchdata } from "./reducers/classesinfo";

import { useLocation } from 'react-router-dom';
import { turnon,turnoff } from "./reducers/drawerinfo";
import { useDispatch,useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import { settoken } from './reducers/token';

function App() {

  const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    // const dispatch_t = useDispatch();
    
    // useEffect(()=>{
    //   dispatch_t(settoken(token));
    // },[dispatch_t,token])
  
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  };

  const Layout = () => {
    // const navigate = useNavigate(); 
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    // const drawer = useSelector((state) => state.drawer.value);
    const classes_array = useSelector((state) => state.classesarray);
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

    useEffect(() => {
      if(classes_array.status === 'idle'){
        dispatch(fetchdata());}
    },[dispatch,classes_array]);

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
      element: (
        <RequireAuth>
          <Layout/>
        </RequireAuth>
      ),
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
    },
    {
      path: '/signupS',
      element: <SigninS/>
    },
    {
      path: '/signupT',
      element: <SigninT/>
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

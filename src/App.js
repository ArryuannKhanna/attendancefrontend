import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Classinfo from "./components/Classinfo";
import SigninS from "./components/SigninS";
import SigninT from "./components/SigninT";
import ErrorP from "./components/ErrorP";

import { fetchdata } from "./reducers/classesinfo";
import { useLocation } from "react-router-dom";
import { turnon, turnoff } from "./reducers/drawerinfo";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
// import { settoken } from './reducers/token';

function App() {
  const StudentAccessLevel = ({ children }) => {
    const location = useLocation();
    const type = localStorage.getItem("type");

    if (type !== "Student") {
      return (
        <Navigate to="/404_NOT_FOUND" state={{ from: location }} replace />
      );
    }
    return children;
  };
  const TeacherAccessLevel = ({ children }) => {
    const location = useLocation();
    const type = localStorage.getItem("type");

    if (type !== "Teacher") {
      return (
        <Navigate to="/404_NOT_FOUND" state={{ from: location }} replace />
      );
    }
    return children;
  };

  const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  const LayoutTeacher = () => {
    const dispatch = useDispatch();
    const classes_array = useSelector((state) => state.classesarray);
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === "/schedule") {
        dispatch(turnoff());
        // console.log(location);
        // console.log(drawer);
      } else {
        dispatch(turnon());
        // console.log(location);
        // console.log(drawer);
      }
    }, [location, dispatch]);

    useEffect(() => {
      if (classes_array.status === "idle") {
        dispatch(fetchdata());
      }
    }, [dispatch, classes_array]);

    return (
      <div className="App">
        <Header />
        <Navbar />
        <div className="Window-view-port">
          <div className="Navbar-shadow"></div>
          <div className="view-port-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const Layout = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes_array = useSelector((state) => state.classesarray);
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === "/schedule") {
        dispatch(turnoff());
        // console.log(location);
        // console.log(drawer);
      } else {
        dispatch(turnon());
        // console.log(location);
        // console.log(drawer);
      }
    }, [location, dispatch]);

    useEffect(() => {
      if (classes_array.status === "idle") {
        dispatch(fetchdata());
      }
    }, [dispatch, classes_array]);

    return (
      <div className="App">
        <Header />
        <Navbar />
        <div className="Window-view-port">
          <div className="Navbar-shadow"></div>
          <div className="view-port-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          {/* <StudentAccessLevel> */}
            <Layout />
          {/* </StudentAccessLevel> */}
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/schedule",
          element: <Schedule />,
        },
        {
          path: "/:classid",
          element: <Classinfo />,
        },
      ],
      errorElement: <div>errrorr</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signupS",
      element: <SigninS />,
    },
    {
      path: "/signupT",
      element: <SigninT />,
    },
    {
      path: "/Teacher",
      element: (
        <RequireAuth>
          {/* <TeacherAccessLevel> */}
            <LayoutTeacher />
          {/* </TeacherAccessLevel> */}
        </RequireAuth>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: ":classid",
          element: <Classinfo />
        }
      ],
    },
    {
      path: "/404_NOT_FOUND",
      element: <ErrorP />,
    },
    // {
    //   path: "/schedule",
    //   element: <Schedule/>,
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

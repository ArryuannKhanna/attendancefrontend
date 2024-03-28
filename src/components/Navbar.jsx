import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
// import { turnon,turnoff } from "../reducers/drawerinfo";
import {useSelector } from "react-redux";
// import { UseSelector } from "react-redux";

const Navbar = () => {
  const drawer = useSelector((state) => state.drawer.value);

  const classes_enrolled = [
    {
      name: "English",
      code: "xyz123",
      teacher: "Mr Sandeep"
    },
    {
      name: "Punjabi",
      code: "127ff3",
      teacher: "Mr Purania Singh Jathani"
    },
    {
      name: "Science",
      code: "12uff3",
      teacher: "Mr Jay Singh Shah"
    },
    {
      name: "German",
      teacher: "Mr Jayash"
    },
  ]

  return (
    <>
      <div className="Navbar-main">
        <div className="Navbar-content">
          <div className="Navbar-Home">
            <NavLink to="/">HOME</NavLink>
          </div>
          <div className="Navbar-Schedule">
            <NavLink to="/schedule">SCHEDULE</NavLink>
          </div>
          <div className="Navbar-Chat">CHAT</div>
        </div>
        { drawer?
        (<div className="Navbar-dynamic-content">
              CLASSES
              {classes_enrolled.map((item,index)=>(
                <div key = {index} className="Navbar-dynamic-block">
                  <div className="Navbar-dynamic-profile"></div>
                  <div className="Navbar-dynamic-details">
                     <div className="Navbar-dynamic-name">{item.name}</div>
                     <div className="Navbar-dynamic-code">{item.teacher}</div>
                  </div>
                  </div>           
              ))}
        </div>):null
        }
      </div>           
    </>
  );
};

export default Navbar;

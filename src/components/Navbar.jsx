import React, { useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const classesArray = useSelector((state) => state.classesarray);
  const drawer = useSelector((state) => state.drawer.value);
  const userType = localStorage.getItem('type');

  useEffect(() => {
    console.log(classesArray);
  }, [classesArray]);

  return (
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
      {drawer && (
        <div className="Navbar-dynamic-content">
          CLASSES
          {classesArray.data && Array.isArray(classesArray.data) && classesArray.data.map((item, index) => (
            <div key={index} className="Navbar-dynamic-block">
              <div className="Navbar-dynamic-profile"></div>
              <div className="Navbar-dynamic-details">
                <div className="Navbar-dynamic-name">{item.name}</div>
                <div className="Navbar-dynamic-code">{userType === 'student' ? item.host_id.user.username : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

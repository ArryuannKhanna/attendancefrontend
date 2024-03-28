import React from 'react';
import './Header.css';
import { CiMenuFries } from "react-icons/ci";
import { useParams } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

const Header = () => {
  const { classid } = useParams();
  
  return (
    <>
    <nav className='Header-main'>
        <div className="Header-main-left">
            <span className='Menu-icon'><CiMenuFries /></span>
            <span>AUTOMARK</span>
        </div>
        <div className="Header-main-middle">
          {classid}
        </div>
        <div className="Header-main-right">
            <span>HELP</span>
            <span className="Profile-icon">
                {/* <div className="Profile-icon"></div> */}
            </span>
        </div>
    </nav>
    <nav className='Header-shadow'></nav>
    </>
  )
}

export default Header
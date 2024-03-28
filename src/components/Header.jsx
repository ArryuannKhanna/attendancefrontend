import React from 'react';
import './Header.css';
import { CiMenuFries } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { UseDispatch, useDispatch } from 'react-redux';
// import { settoken,removetoken } from '../reducers/token'
// import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { classid } = useParams();
  // const {token,gettoken} = props;
  const navigate = useNavigate();

  // const dispatch = useDispatch();

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
            <span onClick={()=>{console.log('clicked it');localStorage.removeItem('token');navigate('/login')}}>HELP</span>
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
import React, { useState } from 'react';
import './Header.css';
import { CiMenuFries } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { UseDispatch, useDispatch } from 'react-redux';
// import { settoken,removetoken } from '../reducers/token'
// import { NavLink } from 'react-router-dom';

const Header = () => {
  const { classid } = useParams();
  // const {token,gettoken} = props;
  const navigate = useNavigate();
  const [join,setjoin] = useState(true);

  const [form, setForm] = useState({
    name: '',
});

  const handleChange = (event) => {
    const {name,value} = event.target;
    // console.log(name);
    setForm(prevform => ({[name]:value}));
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:8000/joinclassroom/${form.name}`,{
      method:"PATCH",
      headers:{
        "Authorization":`Token ${token}`,
        "Content-Type":"application/json"
      }
    })
    const data = await response.json();

    if(response.ok){
      console.log(data);
      // navigate('/', { replace: true, state: { updatedData: data } });
      window.location.reload();
    }
    else{
      console.error("The requested class doesn't exists");
    }


  }

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
            <span onClick={()=>{setjoin(!join);}}>JOIN</span>
            <span className={join?"join-form hidden":"join-form"}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Course-code
                    <input type="text" name="name" value={form.name} onChange={handleChange}/>
                </label>
                <button type="submit">
                    LOGIN
                </button>
            </form>
            </span>
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
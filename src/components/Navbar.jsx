import React, { useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
// import { turnon,turnoff } from "../reducers/drawerinfo";
import { useSelector} from "react-redux";
// import { fetchdata } from "../reducers/classesinfo";
// import { UseSelector } from "react-redux";

const Navbar = () => {
  // const dispatch = useDispatch();
  // const classes_array = useSelector((state) => state.classesarray);
  const classes_array = {
    data: [
      {
        name: "Yoga Class",
        host_id: {
          user: {
            username: "yoga_master123"
          }
        }
      },
      {
        name: "Pilates Workshop",
        host_id: {
          user: {
            username: "pilates_pro456"
          }
        }
      },
      {
        name: "Zumba Party",
        host_id: {
          user: {
            username: "zumba_queen789"
          }
        }
      }
    ]
  };
  

  const drawer = useSelector((state) => state.drawer.value);

  useEffect(()=>{
    console.log(classes_array);
  },[classes_array]);

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

        </div>
        { drawer?
        (<div className="Navbar-dynamic-content">
              CLASSES
              {classes_array.data.map((item,index)=>(
                <div key = {index} className="Navbar-dynamic-block">
                  <div className="Navbar-dynamic-profile"></div>
                  <div className="Navbar-dynamic-details">
                     <div className="Navbar-dynamic-name">{item.name}</div>
                     <div className="Navbar-dynamic-code">{item.host_id.user.username}</div>
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

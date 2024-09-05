import React, { useEffect } from 'react';
import './Home.css';
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';

const Home = () => {
  const type = localStorage.getItem('type');

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
  
  useEffect(()=>{
    if (sessionStorage.getItem("isReloaded") !== "true") {
      sessionStorage.setItem("isReloaded", "true");
      window.location.reload();
  }
  },[])
  const classes_enrolled = [
    {
      name: "English",
      course_code: "xyz123",
      teacher: "Mr Sandeep"
    },
    {
      name: "Punjabi",
      course_code: "127ff3",
      teacher: "Mr Purania Singh Jathani"
    },
    {
      name: "Science",
      course_code: "12uff3",
      teacher: "Mr Jay Singh Shah"
    },
    {
      name: "German",
      course_code: "34f3f3",
      teacher: "Mr Jayash"
    },
  ]
  return (
    <div className='Home-wrapper'>
      <div className="Home-grid">
        {classes_enrolled.map((item,index)=>(
          <div key={index} className="grid-item">
            <div className="grid-upper">
             <Link style={{textAlign:'left'}} to={`${item.course_code}/`}><div className='grid-course-name'>{item.name}</div></Link>
              <div className='grid-course-code'>{item.course_code}</div>
              <div className='grid-course-teacher'>{item.name}</div>
            </div>
          
        </div>
        ))}
      </div>
      {/* home Lorem ipsum dolor, sit amet consectetur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere reprehenderit id dicta temporibus maxime eos, laborum amet tenetur voluptate, porro aliquam rerum? Sed repudiandae quos doloribus, ab officia non? */}
    </div>
  )
}

export default Home
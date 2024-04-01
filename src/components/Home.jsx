import React from 'react';
import './Home.css';
import { useSelector} from "react-redux";

const Home = () => {
  const classes_array = useSelector((state) => state.classesarray);

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
    <div className='Home-wrapper'>
      <div className="Home-grid">
        {classes_array.data.map((item,index)=>(
          <div key={index} className="grid-item">
            <div className="grid-upper">
              <div className='grid-course-name'>{item.name}</div>
              <div className='grid-course-code'>{item.course_code}</div>
              <div className='grid-course-teacher'>{item.host_id.user.username}</div>
            </div>
          
        </div>
        ))}
      </div>
      {/* home Lorem ipsum dolor, sit amet consectetur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere reprehenderit id dicta temporibus maxime eos, laborum amet tenetur voluptate, porro aliquam rerum? Sed repudiandae quos doloribus, ab officia non? */}
    </div>
  )
}

export default Home
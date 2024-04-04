import React, { useState } from 'react';
import './Home.css';
import { useSelector } from "react-redux";

const Home = () => {
  const classes_array = useSelector((state) => state.classesarray);
  const [classCode, setClassCode] = useState('');

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
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send a request to the backend with the class code
    console.log("Class code submitted:", classCode);
    // Reset the input field after submitting
    setClassCode('');
  };

  return (
    <div className='Home-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className="Home-grid">
          <div className='grid-item'>
            <div className="grid-upper">
              <div className='grid-course-name'>New class</div>
              <input
                className="grid-course-code"
                type="text"
                placeholder="Enter class code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
              <button type="submit" >Submit</button>
            </div>
          </div>
          {classes_array.data.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="grid-upper">
                <div className='grid-course-name'>{item.name}</div>
                <div className='grid-course-code'>{item.course_code}</div>
                <div className='grid-course-teacher'>{item.host_id.user.username}</div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Home;

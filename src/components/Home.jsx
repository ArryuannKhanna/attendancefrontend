import React, { useState, useEffect } from 'react';
import './Home.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchdata } from "../reducers/classesinfo";

const Home = () => {
  const dispatch = useDispatch();
  const classesArray = useSelector((state) => state.classesarray);
  console.log('classesArray:', classesArray); // Add this line for debugging
  const userType = localStorage.getItem('type');
  const [classCode, setClassCode] = useState('');

  useEffect(() => {
    dispatch(fetchdata()); // Dispatch the fetchdata thunk action when the component mounts
  }, [dispatch]);

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
          {classesArray.data && Array.isArray(classesArray.data) && classesArray.data.length > 0 && (
            classesArray.data.map((item, index) => (
              <div key={index} className="grid-item">
                <div className="grid-upper">
                  <div className='grid-course-name'>{item.name}</div>
                  <div className='grid-course-code'>{item.course_code}</div>
                  <div className='grid-course-teacher'>{userType === 'student' ? item.host_id.user.username : ''}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </div>
  );
}

export default Home;

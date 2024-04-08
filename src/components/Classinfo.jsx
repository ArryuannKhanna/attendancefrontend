import React, { useEffect, useState } from 'react';
import './Classinfo.css';
import { useParams } from 'react-router-dom';

const Classinfo = () => {
    const { classid } = useParams();

    const [classinfo,setclassinfo] = useState({
        course_name:'',
        course_code:'',
        teacher:''
    });

    const [sessioninfo,setsessioninfo] = useState([]);
    // const [presentinfo,setpresentinfo] = useState([]);
    const [presentpercentage,setpresentpercentage] = useState(0);
    const [totalclasses,settotalclasses] = useState(0);
    const [attendedclasses,setattendedclasses] = useState(0);

     useEffect(() => {
        const fetchInfo = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/classinfo/${classid}`, {
                method: "GET",
                headers:{
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                console.error(`The error is huge ${response.status}`);
                return;
            }
    
            const data = await response.json();

            setclassinfo(()=>({
                course_code:data.course_code,
                teacher:data.host_id.user.username,
                name:data.name
            }));
            console.log('hehe yeh le response',data);
        }

        const fetchData = async () => {
            console.log("Fetching data for class ID:", classid);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:8000/classroomsessions/${classid}`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json"
                },
            });
    
            if (!response.ok) {
                console.error(`The error is huge ${response.status}`);
                return;
            }
    
            const data = await response.json();

            if (Array.isArray(data)&& data.length > 0) {
                let userid = data[0].user_info.id; // Assuming 'user_info' is directly under objects in 'data'
                // console.log('this is the user id', userid);
          
                // If you need to update 'sessioninfo' based on 'userid'
                let total_attendance = 0;
                let total_sessions = 0;
                const updatedSessionInfo = data.map(user => {
                  const ispresent = user.students_present.includes(userid);
                  ispresent? total_attendance+=1:total_attendance+=0;
                  total_sessions+=1;
                  return { ...user, 'present': ispresent };
                });
                settotalclasses(total_sessions);
                setattendedclasses(total_attendance);
                const val = total_attendance/total_sessions * 100;
                setpresentpercentage(Math.round(val));
                setsessioninfo(updatedSessionInfo);
                // console.log('This is the updated',val);
              }else
              {
                console.log('not an array');
              }
        };
    
        fetchData();
        fetchInfo();
    }, [classid]);  // Added classid as a dependency to useEffect

    return (
        <>
            <div className='classinfo-wrapper'>
                <div className="classinfo-content">
                    <div className="classinfo-class">
                        {classinfo.name}
                    </div>
                    <div className="classinfo-code">
                        {classinfo.course_code}
                    </div>
                    <div className="classinfo-teacher">
                        Dr. {classinfo.teacher}
                    </div>
                </div>
            </div>
            <div className="info-sections">
                <div className='attendance'>
                    <div className='classinfo-code'>
                        <b>Attendance:</b> {presentpercentage}%
                    </div>
                    <div className='classinfo-code'>
                        <b>Total classes:</b> {totalclasses}
                    </div>
                    <div className='classinfo-code'>
                        <b>Attended classes:</b> {attendedclasses}
                    </div>
                </div>
                <div className='sessions'>
                    <div className='session'><b>Sessions: </b></div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                {/* <th>Time</th> */}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessioninfo.map((session,index) => (
                                <tr key={session.id}>
                                    <td>{index+1}</td>
                                    <td>{session.date}</td>
                                    {/* <td>{session.time}</td> */}
                                    <td>{session.present ? 'Present' : 'Absent'}</td>
                                    {/* <td>Present</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Classinfo;
import React, { useEffect, useState } from 'react';
import './Classinfo.css';
import { useParams } from 'react-router-dom';

const Classinfo = () => {
    const { classid } = useParams();
    const percentage = '80%';
    const total_classes = '10';
    const attended_classes = '8';

    const [classinfo,setclassinfo] = useState({
        course_name:'',
        course_code:'',
        teacher:''
    })

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
            console.log(data);
        };
    
        fetchData();
        fetchInfo();
    }, [classid]);  // Added classid as a dependency to useEffect
    

    const sessions = [
        {
            id: 1,
            session: 'Session 1',
            date: '2023-05-01',
            time: '09:00 AM - 11:00 AM',
            present: true
        },
        {
            id: 2,
            session: 'Session 2',
            date: '2023-05-02',
            time: '09:00 AM - 11:00 AM',
            present: false
        }
    ];

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
                        <b>Attendance:</b> {percentage}
                    </div>
                    <div className='classinfo-code'>
                        <b>Total classes:</b> {total_classes}
                    </div>
                    <div className='classinfo-code'>
                        <b>Attended classes:</b> {attended_classes}
                    </div>
                </div>
                <div className='sessions'>
                    <div className='session'><b>Sessions: </b></div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session) => (
                                <tr key={session.id}>
                                    <td>{session.id}</td>
                                    <td>{session.date}</td>
                                    <td>{session.time}</td>
                                    <td>{session.present ? 'Present' : 'Absent'}</td>
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
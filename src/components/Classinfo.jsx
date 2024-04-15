import React, { useEffect, useState, useRef } from "react";
import "./Classinfo.css";
import { useParams } from "react-router-dom";

const Classinfo = () => {
    // const { classid } = useParams();

    const [streaming, setStreaming] = useState(false);
    const [wsConnected, setWsConnected] = useState(false);
    const videoRef = useRef(null);
    const wsRef = useRef(null);
    const timerRef = useRef(null);


  const type = localStorage.getItem("type");
  const [videosession,setvideosession] = useState(false);

  const { classid } = useParams();

  const [classinfo, setclassinfo] = useState({
    course_name: "",
    course_code: "",
    teacher: "",
  });

  const [sessioninfo, setsessioninfo] = useState([]);
  // const [presentinfo,setpresentinfo] = useState([]);
  const [presentpercentage, setpresentpercentage] = useState(0);
  const [totalclasses, settotalclasses] = useState(0);
  const [attendedclasses, setattendedclasses] = useState(0);

       
  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/classinfo/${classid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`The error is huge ${response.status}`);
        return;
      }

      const data = await response.json();

      setclassinfo(() => ({
        course_code: data.course_code,
        teacher: data.host_id.user.username,
        name: data.name,
      }));
      console.log("hehe yeh le response", data);
    };

    const fetchData = async () => {
      console.log("Fetching data for class ID:", classid);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/classroomsessions/${classid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`The error is huge ${response.status}`);
        return;
      }

      const data = await response.json();

      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        let userid = data[0].user_info.username; // Assuming 'user_info' is directly under objects in 'data'
        // console.log('this is the user id', userid);

        // If you need to update 'sessioninfo' based on 'userid'
        let total_attendance = 0;
        let total_sessions = 0;
        const updatedSessionInfo = data.map((user) => {
          console.log("look here",user.students_present);
          console.log("hhhh",userid);
          const ispresent = user.students_present.find(user => user.user.username === userid) ;
          ispresent ? (total_attendance += 1) : (total_attendance += 0);
          total_sessions += 1;
          return { ...user, present: ispresent };
        });
        settotalclasses(total_sessions);
        setattendedclasses(total_attendance);
        const val = (total_attendance / total_sessions) * 100;
        setpresentpercentage(Math.round(val));
        setsessioninfo(updatedSessionInfo);
        console.log("this is the updated session info",updatedSessionInfo);
        // console.log('This is the updated',val);
      } else {
        console.log("not an array");
      }
    };

    fetchData();
    fetchInfo();
  }, [classid]); // Added classid as a dependency to useEffect




//

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setStreaming(true);

            // Assuming WebSocket server URL as 'wss://your-websocket-server.com/ws'
            wsRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/session/${classid}/`);
            wsRef.current.onopen = () => {
              console.log('WebSocket Connected');
              setWsConnected(true);
              captureAndSendFrame();
          };
          wsRef.current.onerror = (error) => {
              console.error('WebSocket Error: ', error);
              setWsConnected(false); // Update connection state on error
          };
          wsRef.current.onclose = () => {
              console.log('WebSocket Disconnected');
              setWsConnected(false);
          };
      } catch (error) {
          console.error('Error accessing the camera: ', error);
      }
  }
};

const captureAndSendFrame = () => {
  if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !videoRef.current) {
      console.log("WebSocket is not open or video is not available.");
      return;
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const video = videoRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(blob => {
      wsRef.current.send(blob);
  }, 'image/jpeg');
  timerRef.current = setTimeout(captureAndSendFrame, 100);
};

const stopCamera = () => {
  if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
  }
  setStreaming(false);
  if (wsRef.current) {
      wsRef.current.close();
  }
  clearTimeout(timerRef.current);
};

useEffect(() => {
  return () => stopCamera();
}, []);

const handleStartsession = async () => {
  const token = localStorage.getItem("token");
  const body_data = {
    "classroom":classid,
  }
  const response = await fetch(
    "http://127.0.0.1:8000/startsession/",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(body_data)
    }
  );

  if (!response.ok) {
    console.error(`The error is huge ${response.status}`);
    return;
  }
  const data = await response.json();
  console.log("this is the data which is being console logged lmaoooooo",data);
  // fetchData();
  // window.location.reload();

      // console.log("Fetching data for class ID:", classid);
      // const token = localStorage.getItem("token");
}
const fetchdata = async () => {
  const token = localStorage.getItem('token')

  const response1 = await fetch(
    `http://127.0.0.1:8000/classroomsessions/${classid}`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response1.ok) {
    console.error(`The error is huge ${response1.status}`);
    return;
  }

  const data1 = await response1.json();

  console.log(data1);
  if (Array.isArray(data1) && data1.length > 0) {
    let userid = data1[0].user_info.username; // Assuming 'user_info' is directly under objects in 'data'
    // console.log('this is the user id', userid);

    // If you need to update 'sessioninfo' based on 'userid'
    let total_attendance = 0;
    let total_sessions = 0;
    const updatedSessionInfo = data1.map((user) => {
      console.log("look here",user.students_present);
      console.log("hhhh",userid);
      const ispresent = user.students_present.find(user => user.user.username === userid) ;
      ispresent ? (total_attendance += 1) : (total_attendance += 0);
      total_sessions += 1;
      return { ...user, present: ispresent };
    });
    settotalclasses(total_sessions);
    setattendedclasses(total_attendance);
    const val = (total_attendance / total_sessions) * 100;
    setpresentpercentage(Math.round(val));
    setsessioninfo(updatedSessionInfo);
    console.log("this is the updated session info",updatedSessionInfo);
    // console.log('This is the updated',val);
  } else {
    console.log("not an array");
  }
}
  return (
    <>
      <div className="classinfo-wrapper">
        <div className="classinfo-content">
          <div className="classinfo-class">{classinfo.name}</div>
          <div className="classinfo-code">{classinfo.course_code}</div>
          <div className="classinfo-teacher">Dr. {classinfo.teacher}</div>
        </div>
      </div>
      <div className="info-sections">
        {type === "Student" ? (
          <div className="attendance">
            <div className="classinfo-code">
              <b>Attendance:</b> {presentpercentage}%
            </div>
            <div className="classinfo-code">
              <b>Total classes:</b> {totalclasses}
            </div>
            <div className="classinfo-code">
              <b>Attended classes:</b> {attendedclasses}
            </div>
          </div>
        ) : (
          <div className="attendance">
            <div className="classinfo-code">
              <b>SESSION HISTORY</b>
            </div>
            <div className="classinfo-code">
              <b>STUDENTS ST</b>
            </div>
            <div className="classinfo-code" onClick={()=>{setvideosession((prev)=>(!prev));if(!videosession)handleStartsession();fetchdata();}}>
              <b>START SESSION</b>
            </div>
          </div>
        )}

        <div className="sessions">
          <div className="session">
          {type === 'Student' ? (<b>Sessions: </b>) : ( <>{videosession === false?(<b>Session History: </b>):(<b>Start Session </b>)}</>)}
          </div>
          {videosession === false?
          (<table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                {/* <th>Time</th> */}
                {type === "Student" ?(<th>Status</th>):(<th>Students Present</th>)}
              </tr>
            </thead>
            <tbody>
            {sessioninfo.map((session, index) => (
                <tr key={session.id}>
                  <td>{index + 1}</td>
                  <td>{session.date}</td>
                  {/* <td>{session.time}</td> */}
                  {type === 'Student'?(<td>{session.present ? "Present" : "Absent"}</td>):(<td>{session.students_present.length}/{session.total_students}</td>)}
                  {/* <td>Present</td> */}
                </tr>
              ))}
            </tbody>
            </table>):(
              <>
            <div style={{ textAlign: 'center' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '400px' }}></video>
            <p>WebSocket Status: {wsConnected ? "Connected" : "Disconnected"}</p>
            {!streaming ? (
                <button onClick={startCamera} disabled={wsConnected}>Start Camera</button>
            ) : (
                <button onClick={stopCamera} disabled={!wsConnected}>Stop Camera</button>
            )}
        </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Classinfo;

import React, { useState } from 'react';
import './Login.css';  // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import { fetchdata } from "../reducers/classesinfo";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
    const dispatch = useDispatch();
    const classes_array = useSelector((state) => state.classesarray);
    // Removed useEffect if it's not being used, or complete the logic inside it
    const navigate = useNavigate();
    // useEffect(()=>{
        

    // },[])

    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = {
            username: form.name,  // example of form field
            password: form.password,  // example of form field
        };
    
        const response = await fetch("http://127.0.0.1:8000/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',  // Specify the content type as JSON
            },
            body: JSON.stringify(formData)  // Convert the JavaScript object to a JSON string
        });
        const data = await response.json();
    
        console.log(data);

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('type',data.type);
            dispatch(fetchdata());
            if(data.type === 'Teacher'){
                navigate('/Teacher');
            }
            else
             navigate('/');
        } else {
            // Handle errors, e.g., show an error message
            console.error('Login failed:', data);
        }
    };

    return (
        <div>
            <span>LOGIN</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Username
                    <input type="text" name="name" onChange={handleChange} value={form.name} />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" onChange={handleChange} value={form.password} />
                </label>
                <button type="submit">
                    LOGIN
                </button>
            </form>
        </div>
    );
}

export default Login;

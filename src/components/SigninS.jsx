import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninS = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        password: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = {
            user:{
                username: form.name,  // example of form field
                password: form.password,  // example of form field
                email: form.email
            }
        };
    
        const response = await fetch("http://127.0.0.1:8000/registerstudent/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',  // Specify the content type as JSON
            },
            body: JSON.stringify(formData)  // Convert the JavaScript object to a JSON string
        });
        const data = await response.json();
    
        console.log(data);

        if (response.ok) {
            // localStorage.setItem('token', data.token);
            navigate('/login');
        } else {
            // Handle errors, e.g., show an error message
            console.error('Signin failed:', data);
        }
    };

  return (
     <div>
            <span>SIGNUP STUDENT</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Username
                    <input type="text" name="name" onChange={handleChange} value={form.name} />
                </label>

                <label htmlFor="email">
                    Email
                    <input type="email" name="email" onChange={handleChange} value={form.email} />
                </label>

                <label htmlFor="password">
                    Password
                    <input type="password" name="password" onChange={handleChange} value={form.password} />
                </label>
                
                <button type="submit">
                    SIGNUP
                </button>
            </form>
        </div>
  )
}

export default SigninS
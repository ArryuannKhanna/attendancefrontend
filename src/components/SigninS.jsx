import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninS = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        password: '',
        email: ''
    });
    const [file, setfile] = useState(null);

    const handlefilechange = (event) => {
        setfile(event.target.files[0]);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();

    formData.append('user', JSON.stringify({
        username: form.name,
        password: form.password,
        email: form.email
    }));
    formData.append('photo', file);

        // console.log('this is the form',[...formData]);
    
        try {
            const response = await fetch("http://127.0.0.1:8000/registerstudent/", {
                method: "POST",
                body: formData  // Send FormData directly
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                // Assuming you navigate after successful registration
                navigate('/login');
            } else {
                // Handle errors
                console.error('Signup failed:', data);
            }
        } catch (error) {
            console.error('Network or server error:', error);
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

                <label htmlFor="photo">
                    Photo
                    <input type="file" accept="image/*" onChange={handlefilechange} />
                </label>
                
                <button type="submit">
                    SIGNUP
                </button>
            </form>
        </div>
  )
}

export default SigninS
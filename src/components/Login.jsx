import React, { useState } from 'react';
import './Login.css';  // Make sure the path is correct

const Login = () => {
    // Removed useEffect if it's not being used, or complete the logic inside it

    const [form, setForm] = useState({
        name: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
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

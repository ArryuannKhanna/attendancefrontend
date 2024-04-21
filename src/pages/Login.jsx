import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Footer, Navbar } from "../components";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/login`, { username, password });
      localStorage.setItem("username", username);
      localStorage.setItem("userType", response.data.userType);
      // Handle successful login response
      console.log(response.data);
    } catch (error) {
      // Handle error
      setError("Failed to log in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label for="display-4">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
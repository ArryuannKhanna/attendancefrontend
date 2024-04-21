import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Student = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student"); // Default to "student"
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userType", userType);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(`http://127.0.0.1:8000/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("name", name);

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <div className="form my-3 d-flex justify-content-between align-items-center">
              <label>User Type</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                />
                <label className="form-check-label">Student</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={() => setUserType("teacher")}
                />
                <label className="form-check-label">Teacher</label>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {userType === "student" && (
                <div className="form my-3">
                  <label htmlFor="Image">Profile Image</label>
                  <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
              <div className="my-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Student;

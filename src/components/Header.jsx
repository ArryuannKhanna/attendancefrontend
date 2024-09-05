import React, { useState } from "react";
import "./Header.css";
import { CiMenuFries } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const type = localStorage.getItem("type");
  const token = localStorage.getItem("token");

  const { classid } = useParams();
  const navigate = useNavigate();
  const [join, setjoin] = useState(true);

  const [form, setForm] = useState({
    name: "",
  });
  const [form1, setForm1] = useState({
    code: "",
    name: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevform) => ({ [name]: value }));
  };

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setForm1((prevform) => ({...prevform,[name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://127.0.0.1:8000/joinclassroom/${form.name}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      window.location.reload();
    } else {
      console.error("The requested class doesn't exist");
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const content = {
      "course_code":form1.code,
      "name":form1.name
    }
    const response = await fetch(
      `http://127.0.0.1:8000/addclassroom/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      window.location.reload();
    } else {
      console.error("The requested class doesn't exist");
    }
  };

  return (
    <>
      <nav className="Header-main">
        <div className="Header-main-left">
        <span className="Menu-icon">
            <CiMenuFries />
          </span>
        {token ? (
          <Link to="/" className="btn btn-light">AUTOMARK</Link>
        ) : (
          <Link to="/LandingPage" className="btn btn-light">AUTOMARK</Link>
        )}
        </div>
        <div className="Header-main-middle">{classid}</div>
        <div className="Header-main-right">
          {token ? (
            type === "Student" ? (
              <>
                <span
                  onClick={() => {
                    setjoin(!join);
                  }}
                >
                  JOIN
                </span>  
                <span className={join ? "join-form hidden" : "join-form"}>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                      Course-code
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </label>
                    <button type="submit">JOIN</button>
                  </form>
                </span>
              </>
            ) : (
              <>
                <span
                  onClick={() => {
                    setjoin(!join);
                  }}
                >
                  CREATE
                </span>  
                <span className={join ? "join-form hidden" : "join-form"}>
                  <form onSubmit={handleSubmit1}>
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        name="name"
                        value={form1.name}
                        onChange={handleChange1}
                      />
                    </label>
                    <label htmlFor="name">
                      Course-code
                      <input
                        type="text"
                        name="code"
                        value={form1.code}
                        onChange={handleChange1}
                      />
                    </label>
                    <button type="submit">CREATE</button>
                  </form>
                </span>
              </>
            )
          ) : (
            <div className="Header-auth-links">
              <Link to="/login" className="btn btn-secondary me-2">Login</Link>
              <Link to="/Signup" className="btn btn-secondary me-2">Register</Link>
            </div>
          )}
          {token && (
            <span
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              LOGOUT
            </span>
          )}
          <span className="Profile-icon"></span>
        </div>
      </nav>
      <nav className="Header-shadow"></nav>
    </>
  );
};

export default Header;

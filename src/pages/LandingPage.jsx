import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pages/LandingPage.css";

const LandingPage = () => {
    return (
        <>
            <Header />
            <div className="hero border-1 pb-3">
                <div className="card bg-dark text-white border-0 mx-3">
                    <img
                        className="card-img img-fluid"
                        src="/main.png.jpg"
                        alt="Card"
                        height={500}
                    /><div className="card-img-overlay d-flex align-items-center">
                        <div className="container text-white">
                            <h5 className="card-title fs-1 fw-bold">Welcome to our Attendance System</h5>
                            <div>
                                <h6 className="fw-bold">Key features</h6>
                                <ul className="list-unstyled">
                                    <li className="fw-bold">Automated attendance tracking using face recognition</li>
                                    <li className="fw-bold">User-friendly interface for both teachers and students</li>
                                    <li className="fw-bold">Real-time attendance monitoring and reporting</li>
                                </ul>
                            </div>
                            <section id="get-started">
                                <Link to="/login" className="btn btn-success">Get Started</Link>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;

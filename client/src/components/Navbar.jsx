import React,{useState,useEffect} from "react";
import "./css/Navbar.css";
import {CircleUserRound, LogIn} from "lucide-react";
import Logo from "../assets/logo.png";

function Navbar() {
   const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
       const threshold = window.innerHeight * 0.8;
      setShow(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
  <nav className={`navbar navbar-expand-lg bg-body-tertiary ps-5 pe-5 navbar-scroll ${show ? "show" : ""}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} className="logo-img me-3" alt="JobsNext" />JobsNext
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Browse Jobs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                List Job
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >
                Rate My CV
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div className="login-btn">
          <a style={{color:"#000000"}}><LogIn style={{width: "20px", height:"20px", color:"#000000"}} /> Sign In</a>
          <button class="btn btn-success ms-4"><CircleUserRound style={{width: "20px", height:"20px"}} /> Register Today</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

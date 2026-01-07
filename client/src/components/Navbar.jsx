import React from "react";
import "./css/Navbar.css";
import {CircleUserRound, LogIn} from "lucide-react";
import Logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary ps-sm-5 pe-sm-5 ps-5 ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={Logo} className="logo-img" alt="JobsNext" />JobsNext
        </a>
        <button
          class="navbar-toggler"
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
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" >
                Disabled
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">
                Help
              </a>
            </li>
          </ul>
        </div>
        <div className="login-btn">
          <a><LogIn style={{width: "20px", height:"20px"}} /> Sign In</a>
          <button class="btn btn-success ms-4"><CircleUserRound style={{width: "20px", height:"20px"}} /> Register Today</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

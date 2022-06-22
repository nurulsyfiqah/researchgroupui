import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Images/resgm-logo-2.png"
import "../Assets/Styles/component.css"

export default function Navbar() {
    return (
        <nav className="navbar navbar-account navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid mt-1 mb-1">
          <img
            src= {Logo}
            alt="resgm-logo"
            width="auto"
            height="70"
            className="d-inline-block align-text-top mt-1 mb-1 nav_logo"
          />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                </div>
                <div className="d-flex">
                    <div className="nav-item dropdown">
                        <button className="btn dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Nurul Syfiqah
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <li><Link to="/signup" className="dropdown-item">Profile</Link></li>
                          <li><Link to="/login" className="dropdown-item">Logout</Link></li>
                        </ul>
                      </div>
                </div>
              </div>
          </div>
        </nav>
    );
}
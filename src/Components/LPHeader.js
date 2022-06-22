import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Images/resgm-logo-2.png"
import "../Assets/Styles/component.css"

export default function LandHeader() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
            <div className="container-fluid mt-1 mb-1">
                <img
                src= {Logo}
                alt="resgm-logo"
                width="auto"
                height="70em"
                className="img-liquid d-inline-block align-text-top mt-1 mb-1 nav_logo"
                />
                <div className="ms-auto d-lg-flex container_signin">
                <Link className="btn btn_transparent" to="/login">Login</Link>
                </div>
            </div>
            </nav>
        </div>
    );
}
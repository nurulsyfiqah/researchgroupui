import React from "react";
import Logo from "../Assets/Images/resgm-logo-2.png"
import { Link } from "react-router-dom"
import "../Assets/Styles/component.css"

export default function BasicHeader() {
    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid mt-1 mb-1">
            <Link to="/">
                <img
                    src= {Logo}
                    alt="resgm-logo"
                    height="40"
                    className="d-inline-block align-text-top mt-1 mb-1 nav_logo"
                />
            </Link>
        </div>
      </nav>
    );
}
import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack as BackIcon } from "react-icons/io";
import Logo from "../Assets/Images/resgm-logo-2.png"
import "../Assets/Styles/component.css"

export default function EditPostHeader() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid mt-1 mb-1">
                <div className="align-middle">
                    <Link to="/blog"><BackIcon className="back-icon mt-3"/></Link>
                    <img
                        src= {Logo}
                        alt="resgm-logo"
                        height="40"
                        className="d-inline-block align-text-top mt-1 mb-1 nav_logo"
                    />
                </div>
                <div>
                </div>
            </div>
        </nav>

    );
}
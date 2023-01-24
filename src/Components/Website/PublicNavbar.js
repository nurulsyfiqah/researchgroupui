import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import Logo from "../../Assets/Images/resgm-logo-v2-empty.png";
import {ReactSession} from "react-client-session";

export default function PublicNavbar() {

    // check if there is session under account in localstorage
    // let username = ReactSession.get("account");
    const { username } = useParams();
    // if username undefined or null, set a new username
    if (username === undefined || username === null) {
        ReactSession.set("username", username);
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light header-public">
            <div className="container-fluid">
                <img
                    src= {Logo}
                    alt="resgm-logo"
                    height="40"
                    className="d-inline-block align-text-top mt-1 mb-1"
                />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link"  to={`/${username}`}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/${username}/publication`}>Publication</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to={`/${username}/team`}>Team</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to={`/${username}/article`}>Article</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
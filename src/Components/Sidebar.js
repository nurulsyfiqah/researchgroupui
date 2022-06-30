import React, { useState, useEffect }  from 'react'
import { NavLink, Link } from 'react-router-dom';
import Logo from "../Assets/Images/resgm-logo-v2-empty.png"
import LogoIcon from "../Assets/Images/resgm-logo-v2-small.png"
import { FaBars as MenuIcon, FaUserCircle as ProfileIcon, FaUsers as GroupIcon, FaTasks as ProgressIcon } from "react-icons/fa";
import { GiSoapExperiment as ResearchIcon } from "react-icons/gi";
import { BiWorld as WebsiteIcon } from "react-icons/bi";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { MdOutlineArticle as BlogIcon } from "react-icons/md";

export default function Sidebar({content}) {

    const [show, setShow] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { height, width } = useWindowDimensions();

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

    function activeSidebar(e) {

    }

    return (
        <main className={ show ? `space-toggle` : null }>
            <header className={ `header ${show ? 'space-toggle' : null}` } >
                <div className="header-toggle" onClick={() => setShow(!show)}>
                    <MenuIcon/>
                </div>
            </header>

            <aside className={ `sidebar  ${show ? 'show-sidebar' : null}` }>
                <nav className="nav-sidebar">
                    <div>
                        <Link to="/home" className="nav-logo">
                            <img width="auto" height="40" src={ show && width > 768 ? Logo : LogoIcon} alt="team" />
                        </Link>
                        <div className="nav-list">
                            <NavLink to="/home"  className="nav-link-sidebar">
                                <ProfileIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Profile</span>
                            </NavLink>
                            <NavLink to="/research" className="nav-link-sidebar">
                                <ResearchIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Research</span>
                            </NavLink>
                            <NavLink to="/group" className="nav-link-sidebar">
                                <GroupIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Group</span>
                            </NavLink>
                            <NavLink to="/tracker" className="nav-link-sidebar">
                                <ProgressIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Tracker</span>
                            </NavLink>
                            <NavLink to="/blog" className="nav-link-sidebar">
                                <BlogIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Blog</span>
                            </NavLink>
                        </div>
                    </div>
                    <NavLink to="/" className="nav-logo">
                        <LogoutIcon className="nav-logo-icon"/>
                        <span className="nav-logo-name">Logout</span>
                    </NavLink>
                </nav>
            </aside>
            { content }
        </main>
    )
}
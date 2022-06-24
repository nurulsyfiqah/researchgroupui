import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom';
import Logo from "../Assets/Images/resgm-logo-v2-empty.png"
import LogoIcon from "../Assets/Images/resgm-logo-v2-small.png"
import { FaBars as MenuIcon, FaHome as HomeIcon, FaUsers as GroupIcon, FaTasks as ProgressIcon } from "react-icons/fa";
import { GiSoapExperiment as ResearchIcon } from "react-icons/gi";
import { BiWorld as WebsiteIcon } from "react-icons/bi";
import { FiLogOut as LogoutIcon } from "react-icons/fi";
import { MdOutlineArticle as BlogIcon } from "react-icons/md";
import { BsFillBellFill as ActivityIcon } from "react-icons/bs";

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
                            <Link to="/home" className="nav-link-sidebar active">
                                <ActivityIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Activity</span>
                            </Link>
                            <Link to="/research" className="nav-link-sidebar">
                                <ResearchIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Research</span>
                            </Link>
                            <Link to="/group" className="nav-link-sidebar">
                                <GroupIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Group</span>
                            </Link>
                            <Link to="/tracker" className="nav-link-sidebar">
                                <ProgressIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Tracker</span>
                            </Link>
                            <Link to="/blog" className="nav-link-sidebar">
                                <BlogIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Blog</span>
                            </Link>
                            <Link to="/website" className="nav-link-sidebar">
                                <WebsiteIcon className="nav-link-icon"/>
                                <span className="nav-link-name">Website</span>
                            </Link>
                        </div>
                    </div>
                    <Link to="/logout" className="nav-logo">
                        <LogoutIcon className="nav-logo-icon"/>
                        <span className="nav-logo-name">Logout</span>
                    </Link>
                </nav>
            </aside>
            { content }
        </main>
    )
}
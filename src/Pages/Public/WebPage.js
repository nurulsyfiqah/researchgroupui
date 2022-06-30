import React, { useEffect } from 'react'
import {useParams} from "react-router-dom";
import PublicNavbar from "../../Components/Website/PublicNavbar";
import About from "../../Components/Website/Home/About";
import {ToastContainer} from "react-toastify";


export default function WebPage() {
    const { username } = useParams();

    const getAccountFromServer=()=>{

    }

    return (
        <div>
           <WebComponent />
        </div>
    )
}

function WebComponent() {
    return (
        <div className="">
            <PublicNavbar />
            <About />
        </div>
    )
}
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import Sidebar from "../Components/Sidebar";
import Home from "../Components/Home/Home";

export default function HomePage() {
    const account = ReactSession.get("account");
    console.log(account)
    return (
        <div>
            <Sidebar content={<HomePageComponent />} />
        </div>
    )
}

function HomePageComponent() {
    return (
        <div >
            <ToastContainer/>
            <Home />
        </div>
    )
}
import React from "react";
import { ToastContainer } from "react-toastify";
import { ReactSession } from 'react-client-session';
import Sidebar from "../Components/Sidebar";
import Home from "../Components/Home/Home";

export default function HomePage() {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    console.log(account)
    console.log(user)
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
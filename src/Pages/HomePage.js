import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import Sidebar from "../Components/Sidebar";
import base_url from "../Service/serviceapi"

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
        <div className="group_page">
            <ToastContainer/>
            Home
        </div>
    )
}

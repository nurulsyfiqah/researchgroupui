import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import base_url from "../Service/serviceapi"

export default function HomePage() {
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

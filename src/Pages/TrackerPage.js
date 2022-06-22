import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import base_url from "../Service/serviceapi"

export default function TrackerPage() {
    return (
        <div>
            <Sidebar content={<TrackerPageComponent />} />
        </div>
    )
}

function TrackerPageComponent() {
    return (
        <div className="group_page">
            <ToastContainer/>
            Tracker
        </div>
    )
}

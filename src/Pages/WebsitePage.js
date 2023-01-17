import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import {base_url} from "../Service/serviceapi"

export default function WebsitePage() {
    return (
        <div>
            <Sidebar content={<WebsitePageComponent />} />
        </div>
    )
}

function WebsitePageComponent() {
    return (
        <div className="">
             <ToastContainer />
            Website
        </div>
    )
}

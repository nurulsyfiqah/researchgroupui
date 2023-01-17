import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import Research from "../Components/Research/Research"
import VerifyPublication from "../Components/Research/VerifyPublication";

export default function ResearchPage() {
    return (
        <div>
            <Sidebar content={<ResearchPageComponent />} />
        </div>
    )
}

function ResearchPageComponent() {


    return (
        <div className="">
             <ToastContainer />
            <Research />            
        </div>
    )
}
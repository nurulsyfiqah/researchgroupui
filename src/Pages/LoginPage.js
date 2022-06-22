import React from "react";
import BasicHeader from "../Components/BasicHeader.js"
import Login from "../Components/Login.js"
import Footer from "../Components/Footer.js";

export default function LoginPage() {
    return (
        <div className="d-flex flex-column justify-content-between">
            <div>
                <BasicHeader />
                <Login />
            </div>
           <Footer />
        </div>
    )
}
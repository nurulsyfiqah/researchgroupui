import React from "react";
import BasicHeader from "../Components/BasicHeader.js"
import SignUp from "../Components/SignUp.js"
import Footer from "../Components/Footer.js"
import {ToastContainer} from "react-toastify";

export default function SignUpPage() {
    return (
        <div className="d-flex flex-column justify-content-between">
            <div>
                <BasicHeader />
                <SignUp />
                <Footer />
            </div>
        </div>
    )
}
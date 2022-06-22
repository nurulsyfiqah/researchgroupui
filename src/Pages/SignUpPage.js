import React from "react";
import BasicHeader from "../Components/BasicHeader.js"
import SignUp from "../Components/SignUp.js"
import Footer from "../Components/Footer.js"

export default function SignUpPage() {
    return (
        <div className="d-flex flex-column justify-content-between">
           <BasicHeader />
           <SignUp />
           <Footer />
        </div>
    )
}
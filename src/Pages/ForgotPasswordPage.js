import React from 'react';
import BasicHeader from "../Components/BasicHeader";
import ForgotPassword from "../Components/ForgotPassword";
import Footer from "../Components/Footer";
import {ToastContainer} from "react-toastify";

export default function ForgotPasswordPage() {
    return (
        <div className="d-flex flex-column justify-content-between">
            <div>
                 <ToastContainer  />
                <BasicHeader />
                <ForgotPassword />
            </div>
            <Footer />
        </div>
    )
}
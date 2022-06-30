import React from 'react';
import BasicHeader from "../Components/BasicHeader";
import ForgotPassword from "../Components/ForgotPassword";
import Footer from "../Components/Footer";

export default function ForgotPasswordPage() {
    return (
        <div className="d-flex flex-column justify-content-between">
            <div>
                <BasicHeader />
                <ForgotPassword />
            </div>
            <Footer />
        </div>
    )
}
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../Components/Sidebar';
import ViewPublication from '../Components/Research/ViewPublication';

export default function ViewPublicationPage() {
    return (
        <div>
            <Sidebar content={<ViewPublicationPageComponent />} />
        </div>
    )
}

function ViewPublicationPageComponent() {
    return (
        <div className="">
             <ToastContainer />
            <ViewPublication />
        </div>
    )
}
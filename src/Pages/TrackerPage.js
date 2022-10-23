import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import base_url from "../Service/serviceapi"
import TrackerList from "../Components/Tracker/TrackerList";
import CreatePerTrackerModal from "../Components/Tracker/CreatePerTrackerModal";
import CreateGrpTrackerModal from "../Components/Tracker/CreateGrpTrackerModal";

export default function TrackerPage() {
    return (
        <div>
            <Sidebar content={<TrackerPageComponent />} />
        </div>
    )
}

function TrackerPageComponent() {
    const [showCreatePerModal, setShowCreatePerModal] = useState(false)
    const [showCreateGrpModal, setShowCreateGrpModal] = useState(false)

    const showPerModal = (e) => {
        setShowCreatePerModal(true);
    }

    const showGrpModal = (e) => {
        setShowCreateGrpModal(true);
    }

    return (
        <div className="group_page">
            <ToastContainer/>
            <h2 className="page_title">Tracker</h2>

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button className="btn btn-sm btn_dark_normal" type="button" onClick={showGrpModal}>Create Group Tracker</button>
                <button className="btn btn-dark btn-sm" type="button" onClick={showPerModal} >Create Personal Tracker</button>
            </div>
            <TrackerList />
            {/* <CreatePerTrackerModal hide={()=>setShowCreatePerModal(false)}/> */}
            {
                showCreatePerModal ? <CreatePerTrackerModal hide={()=>setShowCreatePerModal(false)}/> : ''
            }
            {
                showCreateGrpModal ? <CreateGrpTrackerModal hide={()=>setShowCreateGrpModal(false)}/> : ''
            }
        </div>

    )
}
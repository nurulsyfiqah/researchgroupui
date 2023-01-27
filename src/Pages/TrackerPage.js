import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../Components/Sidebar";
import {base_url} from "../Service/serviceapi";
import TrackerList from "../Components/Tracker/TrackerList";
import CreatePerTrackerModal from "../Components/Tracker/CreatePerTrackerModal";
import CreateGrpTrackerModal from "../Components/Tracker/CreateGrpTrackerModal";
import {ReactSession} from "react-client-session";
import axios from "axios";

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

    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    const [data, setData] = useState([]);
    const [change, setChange] = useState(0);
    const [userGroup, setUserGroup] = useState([]);

    const showPerModal = () => {
        setShowCreatePerModal(true);
    }

    const showGrpModal = () => {
        getUserGroup();
        setShowCreateGrpModal(true);
    }

    const getUserGroup = () => {
        axios.get(`${base_url}/group/member/${user.id}`).then((
            response)=>{
            setUserGroup(response.data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const getDataFromServer = () => {
        axios.get(`${base_url}/tracker/all/${user.id}`)
        .then((response)=>{
            setData(response.data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })

    }

    useEffect(()=>{
        getDataFromServer();
    }, [change])

    return (
        <div className="group_page">
             <ToastContainer />
            <h2 className="page_title">Tracker</h2>

            <div className="d-grid gap-2 d-flex justify-content-md-start mb-3">
                <button className="btn btn-sm btn_dark_normal" type="button" onClick={showGrpModal}>Create Group Tracker</button>
                <button className="btn btn-dark btn-sm" type="button" onClick={showPerModal} >Create Personal Tracker</button>
            </div>
            
            {
                data.length > 0 ?
                    data.map((d, index)=>(
                        <TrackerList tracker={d} change={()=>{setChange(change+1)}} index={index}/>
                    ))
                    :
                    <div className="card mt-4">
                        <div className="card-body">
                            No tracker created yet
                        </div>
                    </div>
            }

            {/* <CreatePerTrackerModal hide={()=>setShowCreatePerModal(false)}/> */}
            {
                showCreatePerModal ? <CreatePerTrackerModal hide={()=>setShowCreatePerModal(false)} action="create" change={()=>{setChange(change+1)}}/> : ''
            }
            {
                showCreateGrpModal ? <CreateGrpTrackerModal  hide={()=>setShowCreateGrpModal(false)} action="create" change={()=>{setChange(change+1)}} group={userGroup} /> : ''
            }
        </div>

    )
}
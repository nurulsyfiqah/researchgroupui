import React, {  useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IoPersonAddSharp as AddMemberIcon, IoAdd as AddAnnouncementIcon } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import axios from "axios";
import {base_url} from "../Service/serviceapi"
import Sidebar from "../Components/Sidebar";
import MemberList from "../Components/Group/MemberList";
import AddMemberModal from "../Components/Group/AddMemberModal";
import AnnouncementList from "../Components/Group/AnnouncementList";
import AddAnnouncementModal from "../Components/Group/AddAnnouncementModal"
import GroupSetting from "../Components/Group/GroupSetting"

export default function GroupDashboardPage() {

    return (
        <div>
            <Sidebar content={<GroupDashboardPageComponent />} />
        </div>
    )
}

function GroupDashboardPageComponent() {
    const user = ReactSession.get("user");
    const { groupId } = useParams();
    const [group, setGroup] = useState([])
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [annModal, setAnnModal] = useState(false)
    const [createdAnn, setCreatedAnn] = useState(0)

    const [announcement, setAnnouncement] = useState([])
    const [tracker, setTracker] = useState([])

    // const getDataFromServer= () =>{
    //     axios.get(`${base_url}/group/${groupId}`).then((
    //         response)=>{
    //         const data = response.data;
    //         console.log(data)
    //         setGroup(data)
    //     }, (error)=>{
    //         toast.error("Something went wrong on Server")
    //     })
    // }

    const getDataFromServer= async () =>{
        let group = `${base_url}/group/${groupId}`
        let announcement = `${base_url}/group/announcement/${groupId}`
        let tracker = `${base_url}/tracker/group/${groupId}`

        const requestGroup = axios.get(group);
        const requestAnnouncement = axios.get(announcement);
        const requestTracker = axios.get(tracker);

        const [response1, response2, response3] = await axios.all([requestGroup, requestAnnouncement, requestTracker])
        setGroup(response1.data)
        setAnnouncement(response2.data)
        setTracker(response3.date)
        console.log(response2.data)
        
    }

    useEffect(() =>{
        getDataFromServer()
    },[createdAnn])

    const showAnnModal=()=>{
        return setAnnModal(true)
    }


    return (
        <div className="group_page container">
            <ToastContainer hideProgressBar autoClose={1500}/>
            <h1 className="page_title">{ group.name }</h1>
            <p>{ group.description }</p>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-ann" type="button" role="tab" aria-controls="nav-home"
                            aria-selected="true">Announcement
                    </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-member"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Member
                    </button>
                    {
                        (user.id === group.createdById) ?
                        <button className="nav-link" id="nav-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-setting"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Setting
                        </button>
                        :
                        ""
                    }
                    

                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-ann" role="tabpanel" aria-labelledby="nav-home-tab">
                    {
                        (user.id === group.createdById) ? 
                        <div className="w-100 text-end">
                            <button type="button" className="btn btn_dark_icon mt-2 mb-2" onClick={()=>showAnnModal()} ><AddAnnouncementIcon /></button>
                        </div>
                        : <div className="my-3"></div>
                    }
                    
                    {
                        
                         <AnnouncementList edit={()=>setCreatedAnn(createdAnn + 1)} group={group} tracker={tracker} announcement={announcement}/> 
                        
                    }

                    {
                        annModal === true ? <AddAnnouncementModal group={group} hide={()=>setAnnModal(false)} edit={()=>setCreatedAnn(createdAnn + 1)}/> : ''
                    }

                </div>

                <div className="tab-pane fade" id="nav-member" role="tabpanel" aria-labelledby="nav-profile-tab">
                    {
                        (user.id === group.createdById) ? 
                            <div className="w-100 text-end">
                                <button type="button" className="btn btn_dark_icon mt-2 mb-2" onClick={()=>setAddMemberModal(true)}><AddMemberIcon /></button>
                            </div>
                        :
                        <div className="my-3"></div>
                    }

                    <MemberList members={group} change={()=>setCreatedAnn(createdAnn + 1)}/>

                    {
                        addMemberModal ?  <AddMemberModal group={group} change={()=>setCreatedAnn(createdAnn + 1)} hide={()=>setAddMemberModal(false)}/> : ""
                    }
                </div>

                <div className="tab-pane fade" id="nav-setting" role="tabpanel" aria-labelledby="nav-home-tab">
                    <GroupSetting group={group} change={()=>setCreatedAnn(createdAnn + 1)}/>
                </div>
            </div>

        </div>
    )
}
import React, {  useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IoPersonAddSharp as AddMemberIcon, IoAdd as AddAnnouncementIcon } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import base_url from "../Service/serviceapi"
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
    const { groupId } = useParams();
    const [group, setGroup] = useState([])
    const [announcement, setAnnouncement] = useState([])
    const [annModal, setAnnModal] = useState(false)

    useEffect(() =>{
        getGroupFromServer()
        getAnnouncementFromServer()
    },[])

    const getGroupFromServer = ()=>{
        axios.get(`${base_url}/group/${groupId}`).then(
            (response)=>{
                const data = response.data;
                // label the status indicator

                data.member.forEach(function(item, index) {
                   if (item.status === 0) {
                       item.status = "Not Registered"
                   } else if (item.status === 1) {
                       item.status = "Registered"
                   }
                });
                setGroup(data)
                console.log(group)
                //toast.info("Group loaded from Server !!",{position:"top-right"})
            },
            (error)=>{
                toast.error("Something went wrong on Server")
            }
        )
    }

    const getAnnouncementFromServer=()=>{
        axios.get(`${base_url}/group/announcement/all`).then(
            (response)=>{
                // label the status indicator
                console.log(response.data)
                setAnnouncement(response.data)
                console.log(announcement)
                //toast.info("Group loaded from Server !!",{position:"top-right"})
            },
            (error)=>{
                toast.error("Something went wrong on Server")
            }
        )
    }

    const showAnnModal=()=>{
        return setAnnModal(true)
    }

    return (
        <div className="group_page container">
            <ToastContainer/>
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
                    <button className="nav-link" id="nav-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-setting"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Setting
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-ann" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="w-100 text-end">
                        <button type="button" className="btn btn_dark_icon mt-2 mb-2" onClick={()=>showAnnModal()} ><AddAnnouncementIcon /></button>
                    </div>
                    {
                        announcement.length > 0 ? <AnnouncementList announcement={announcement}/> : "No announcement yet"
                    }

                    {
                        annModal === true ? <AddAnnouncementModal group={group} hide={()=>setAnnModal(false)}/> : ''
                    }

                </div>

                <div className="tab-pane fade" id="nav-member" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="w-100 text-end">
                        <button type="button" className="btn btn_dark_icon mt-2 mb-2" data-bs-toggle="modal" data-bs-target="#addMemberModal"><AddMemberIcon /></button>
                    </div>
                    <MemberList members={group} />
                </div>

                <div className="tab-pane fade" id="nav-setting" role="tabpanel" aria-labelledby="nav-home-tab">
                    <GroupSetting group={group}/>
                </div>
            </div>


            <AddMemberModal group={group}/>
        </div>
    )
}
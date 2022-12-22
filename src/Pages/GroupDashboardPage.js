import React, {  useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IoPersonAddSharp as AddMemberIcon, IoAdd as AddAnnouncementIcon } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
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
    const user = ReactSession.get("user");
    const { groupId } = useParams();
    const [group, setGroup] = useState([])
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [announcement, setAnnouncement] = useState([])
    const [annModal, setAnnModal] = useState(false)
    const [createdAnn, setCreatedAnn] = useState(0)

    // useEffect(() =>{
    //     getGroupFromServer()
    // },[createdAnn])

    useEffect(() =>{
        getDataFromServer()
    },[createdAnn])

    const getDataFromServer=()=>{
        let group = `${base_url}/group/${groupId}`
        let announcement = `${base_url}/group/announcement/${groupId}`

        const requestGroup = axios.get(group);
        const requestAnnouncement = axios.get(announcement);

        axios.all([requestGroup, requestAnnouncement]).then(axios.spread((...responses) => {
            responses[0].data.member.forEach(function(item, index) {
               if (item.status === 0) {
                   item.status = "Not Registered"
               } else if (item.status === 1) {
                   item.status = "Registered"
               }
            });
            setGroup(responses[0].data)
            setAnnouncement(responses[1].data)
            
            console.log(responses[0].data)
            console.log(responses[1].data)
            
          })).catch(errors => {
            // react on errors.
          })
    }

    // const getGroupFromServer = ()=>{
    //     axios.get(`${base_url}/group/${groupId}`).then(
    //         (response)=>{
    //             const data = response.data;
    //             // label the status indicator

    //             data.member.forEach(function(item, index) {
    //                if (item.status === 0) {
    //                    item.status = "Not Registered"
    //                } else if (item.status === 1) {
    //                    item.status = "Registered"
    //                }
    //             });
    //             setGroup(data)
    //             console.log(group)
    //             //toast.info("Group loaded from Server !!",{position:"top-right"})
    //         },
    //         (error)=>{
    //             toast.error("Something went wrong on Server", {autoClose: 1500,hideProgressBar: true})
    //         }
    //     )
    // }

    // const getAnnouncementFromServer=()=>{
    //     console.log(groupId)
    //     axios.get(`${base_url}/group/announcement/${groupId}`).then(
    //         (response)=>{
    //             setAnnouncement(response.data)
    //             console.log(announcement)
    //             console.log(announcement.length)
    //         },
    //         (error)=>{
    //             toast.error("Something went wrong on Server", {autoClose: 1500,hideProgressBar: true})
    //         }
    //     )
    // }

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
                        announcement.length > 0 ? <AnnouncementList announcement={announcement} edit={()=>setCreatedAnn(createdAnn + 1)} group={group}/> 
                        : 
                        <div className="card mt-3">
                            <div className="card-body">
                                No announcement available
                            </div>
                        </div>
                    }

                    {
                        annModal === true ? <AddAnnouncementModal group={group} hide={()=>setAnnModal(false)} create={()=>setCreatedAnn(createdAnn + 1)}/> : ''
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
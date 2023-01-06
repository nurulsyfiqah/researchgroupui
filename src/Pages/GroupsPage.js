import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GroupCard from "../Components/Group/GroupCard";
import CreateGroupCard from "../Components/Group/CreateGroupCard";
import CreateGroupModal from "../Components/Group/CreateGroupModal";
import Sidebar from "../Components/Sidebar";
import {base_url} from "../Service/serviceapi"
import { ReactSession } from 'react-client-session';

export default function GroupsPage() {
    return (
        <div>
            <Sidebar content={<GroupPageComponent />} />
        </div>
    )
}

function GroupPageComponent() {

    const user = ReactSession.get("user");
    const [groups, setGroups] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [groupCreated, setGroupCreated] = useState(false)

    // get list of groups from server
    useEffect(() =>{
        getAllGroupsFromServer()
    }, [groupCreated])

    const getAllGroupsFromServer = ()=>{
        console.log("user id "+user.id)
        axios.get(`${base_url}/group/member/${user.id}`).then(
            (response)=>{
                setGroups(response.data)
                console.log(response.data)
                //toast.info("All Group loaded from Server !!",{position:"top-right"})
            },
            (error)=>{
                toast.error("Something went wrong on Server. We are looking at it. !!")
            }
        )
    }

  return (
    <div className="group_page">
        <ToastContainer/>
        <h1 className="page_title">Groups</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2 g-lg-3">
            <CreateGroupCard  showModal={()=>setShowModal(true)} />
            {
                groups.length > 0 ?
                    groups.map((group)=>(
                        <GroupCard key={group.id} group={group}/>
                    ))
                    :
                    ""
            }

        </div>
        {
            showModal ? <CreateGroupModal create={()=>setGroupCreated(true)} hide={()=>setShowModal(false)}/> : ''
        }

    </div>
  )
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import GroupCard from "../Components/Group/GroupCard";
import CreateGroupCard from "../Components/Group/CreateGroupCard";
import CreateGroupModal from "../Components/Group/CreateGroupModal";
import Sidebar from "../Components/Sidebar";
import base_url from "../Service/serviceapi"

export default function GroupsPage() {
    return (
        <div>
            <Sidebar content={<GroupPageComponent />} />
        </div>
    )
}

function GroupPageComponent() {

    const [groups, setGroups] = useState([])

    useEffect(() =>{
        getAllGroupsFromServer()
    }, [])

    const getAllGroupsFromServer = ()=>{
        axios.get(`${base_url}/group`).then(
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
            <CreateGroupCard />
            {
                groups.length > 0 ?
                    groups.map((group)=>(
                        <GroupCard key={group.id} group={group}/>
                    ))
                    :
                    ""
            }

        </div>
        <CreateGroupModal />
    </div>
  )
}
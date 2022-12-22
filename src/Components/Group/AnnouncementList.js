import React, {useState} from 'react';
import parse from 'html-react-parser';
import moment from "moment";
import EditAnnouncementModal from "./EditAnnouncementModal"
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";
import { ReactSession } from 'react-client-session';

export default function AnnouncementList({announcement, edit, group}) {
    const user = ReactSession.get("user");
    const [editedAnn, setEditedAnn] = useState(0)
    console.log(announcement.length)

    const editedStatus=()=>{
        setEditedAnn(editedAnn + 1);
        edit()
    }

    return (
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {
                    announcement?.map((ann, index)=>{
                        return (
                            <AnnouncementBody key={index} ann={ann} edit={editedStatus} group={group}/>
                        )
                    })
                }
            </div>
    )
}

function AnnouncementBody({myKey, ann, edit, group}) {
    const user = ReactSession.get("user");
    const [editAnnModal, setEditAnnModal] = useState(false)
    const [editedAnn, setEditedAnn] = useState(0)

    const showEditAnnModal=()=>{
        return setEditAnnModal(true)
    }

    const editedStatus=()=>{
        setEditedAnn(editedAnn + 1);
        edit()
    }

    function formatDate1(date) {
        //2022-06-20T11:10:12.000+00:00
        moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        const d = new Date(date)
        return moment(d).format('Do MMMM YYYY, HH:mmA')
    }

    const deleteAnn=()=>{
        axios({
            method: 'DELETE',
            url: `${base_url}/group/announcement/delete/${ann.id}`
        })
            .then(function(response){
                toast.success("Successfully deleted", {autoClose: 1500,hideProgressBar: true})
                edit()
                //window.location.reload()
            }, (error) => {
                toast.error("Error in deleting", {autoClose: 1500,hideProgressBar: true})
            })
    }

    return (
        <div className="accordion-item" key={`key_${myKey}`}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#ann${ann.id}`} aria-expanded="false"
                        aria-controls="flush-collapseOne">
                    {ann.title}
                </button>
            </h2>
            <div id={`ann${ann.id}`} className="accordion-collapse collapse"
                 aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    { ann.content.length > 0 ? parse(ann.content) : "No content"}
                    <blockquote><small>Created by { ann.createdByName } on { formatDate1(ann.createdDate) }</small></blockquote>
                    {
                        (user.id === group.createdById) ? 
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end my-1">
                            <button className="btn btn_dark_normal btn-sm me-md-1" id={`edit_${ann.id}`} type="button" onClick={()=>showEditAnnModal()}>Edit</button>
                            <button className="btn btn-danger btn-sm" id={`del_${ann.id}`} type="button" onClick={deleteAnn}>Delete</button>
                        </div>
                        : "" 
                    }
                    
                </div>
            </div>

            {
                editAnnModal === true ? <EditAnnouncementModal ann={ann} hide={()=>setEditAnnModal(false)} edit={editedStatus}/> : ""
            }

        </div>


    )
}
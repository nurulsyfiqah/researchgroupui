import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {base_url} from "../../Service/serviceapi";
import {toast} from "react-toastify";
import { ReactSession } from 'react-client-session';
import {contentStatus} from "../../Helper/util/util";
import parse from 'html-react-parser';
import moment from "moment";
import EditAnnouncementModal from "./EditAnnouncementModal"
import axios from "axios";
import TimeAgo from 'react-timeago'

export default function AnnouncementList({edit, group, announcement, tracker}) {
    const user = ReactSession.get("user");
    const { groupId } = useParams();
    const [editedAnn, setEditedAnn] = useState(0)

    const editedStatus=()=>{
        setEditedAnn(editedAnn + 1);
        edit()
    }

    return (
        <div>
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {
                    Array.isArray(announcement) ? 
                    announcement.length > 0 ? 
                    announcement?.map((ann, index)=>{
                        return (
                            <AnnouncementBody key={index} ann={ann} edit={editedStatus} group={group}/>
                        )
                    })
                    :
                    <div className="card">
                        <div className="card-body">
                            No announcement yet
                        </div>
                    </div>
                    : 
                    <div className="card">
                        <div className="card-body">
                        No announcement yet
                        </div>
                    </div>
                }
                
            </div>
            <div>
                {
                    tracker?.map((tracker, index)=>{
                        return (
                            <TrackerBody tracker={tracker}/>
                        )
                    })
                }
            </div>

        </div>
            
    )
}

function formatDate1(date) {
    //2022-06-20T11:10:12.000+00:00
    moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    const d = new Date(date)
    return moment(d).format('Do MMMM YYYY, HH:mmA')
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

    // publish the announcement
    const publishAnn=()=>{
        ann.status = 1;
        axios({
            method: 'PUT',
            url: `${base_url}/group/announcement/publish`,
            data: ann
        })
            .then(function(response){
                toast.success("Successfully published", {autoClose: 1500,hideProgressBar: true})
                edit()
                //window.location.reload()
            }, (error) => {
                toast.error("Error in publishing", {autoClose: 1500,hideProgressBar: true})
            })
    }

    // unpublish the announcement
    const unpublishAnn=()=>{
        ann.status = 0;
        axios({
            method: 'PUT',
            url: `${base_url}/group/announcement/update`,
            data: ann
        })
            .then(function(response){
                toast.success("Successfully unpublished", {autoClose: 1500,hideProgressBar: true})
                edit()
                //window.location.reload()
            }, (error) => {
                toast.error("Error in publishing", {autoClose: 1500,hideProgressBar: true})
            })
    }
    if (ann.createdById === user.id && (ann.status === 0 || ann.status === 1)) {
    return (
        <div className="accordion-item" key={`key_${myKey}`}>
        <h2 className="accordion-header">
            <button className="accordion-button collapsed d-flex justify-content-md-between" type="button" data-bs-toggle="collapse"
                    data-bs-target={`#ann${ann.id}`} aria-expanded="false"
                    aria-controls="flush-collapseOne">
                        <div>  <div>{ann.title}<span className="mx-2"> {contentStatus(ann.status)}</span></div></div>
                        <div> <small className="text-muted"><TimeAgo date={ann.createdDate} /></small> </div>
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
                        <button className="btn btn-danger btn-sm" id={`del_${ann.id}`} type="button" onClick={deleteAnn}>Delete</button>
                        <button className="btn btn_dark_normal btn-sm" id={`edit_${ann.id}`} type="button" onClick={()=>showEditAnnModal()}>Edit</button>
                        <button className={`btn btn-secondary btn-sm me-md-1 ${ann.status === 0 ? "d-none" : ""}`} id={`unpub_${ann.id}`} type="button" onClick={()=>unpublishAnn()}>Unpublish</button>
                        <button className={`btn btn-outline-dark btn-sm me-md-1 ${ann.status === 1 ? "d-none" : ""}`} id={`pub_${ann.id}`} type="button" onClick={()=>publishAnn()}>Publish</button>
                    </div>
                    : "No Announcement yet" 
                }
                
            </div>
        </div>

        {
            editAnnModal === true ? <EditAnnouncementModal ann={ann} hide={()=>setEditAnnModal(false)} edit={editedStatus}/> : ""
        }

    </div>
    )
    } else if (ann.createdById !== user.id && ann.status === 1) {
        return (
            <div className="accordion-item" key={`key_${myKey}`}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#ann${ann.id}`} aria-expanded="false"
                        aria-controls="flush-collapseOne">
                    <div>{ann.title}</div>
                    <div> <small className="text-muted mx-2"><TimeAgo date={ann.createdDate} /></small> </div>
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
                            <button className="btn btn-danger btn-sm" id={`del_${ann.id}`} type="button" onClick={deleteAnn}>Delete</button>
                            <button className="btn btn_dark_normal btn-sm" id={`edit_${ann.id}`} type="button" onClick={()=>showEditAnnModal()}>Edit</button>
                            <button className={`btn btn-secondary btn-sm me-md-1 ${ann.status === 0 ? "d-none" : ""}`} id={`unpub_${ann.id}`} type="button" onClick={()=>unpublishAnn()}>Unpublish</button>
                            <button className={`btn btn-outline-dark btn-sm me-md-1 ${ann.status === 1 ? "d-none" : ""}`} id={`pub_${ann.id}`} type="button" onClick={()=>publishAnn()}>Publish</button>
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
    } else {
        return (
            <div></div>
        )
    }
}

function TrackerBody(tracker) {
    return (
        <div className="accordion-item" key={`key_${tracker.id}`}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#tracker${tracker.id}`} aria-expanded="false"
                        aria-controls="flush-collapseOne">
                    {tracker.title}
                </button>
            </h2>
            <div id={`tracker${tracker.id}`} className="accordion-collapse collapse"
                 aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                    { tracker.details.length > 0 ? parse(tracker.details) : "No content"}
                </div>
            </div>
        </div>
    )
}
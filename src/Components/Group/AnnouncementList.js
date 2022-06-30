import React, {useState} from 'react';
import parse from 'html-react-parser';
import moment from "moment";
import EditAnnouncementModal from "./EditAnnouncementModal"
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";

export default function AnnouncementList({announcement}) {

    return (
        <div className="">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {
                    announcement.length > 0 ?
                        announcement.map((ann, index)=>(
                            <AnnouncementBody key={index} ann={ann}/>
                        ))
                        :
                        ""
                }
            </div>
        </div>
    )
}

function AnnouncementBody({myKey, ann}) {
    const [editAnnModal, setEditAnnModal] = useState(false)

    const showEditAnnModal=()=>{
        return setEditAnnModal(true)
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
                toast.success("Successfully deleted")
                window.location.reload()
            }, (error) => {
                toast.error("Error in deleting")
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
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn_dark_normal btn-sm me-md-1" id={`edit_${ann.id}`} type="button" onClick={()=>showEditAnnModal()}>Edit</button>
                        <button className="btn btn-danger btn-sm" id={`del_${ann.id}`} type="button" onClick={deleteAnn}>Delete</button>
                    </div>
                    <blockquote><small>Created by { ann.createdBy } on { formatDate1(ann.createdDate) }</small></blockquote>
                    { ann.content.length > 0 ? parse(ann.content) : "No content"}
                </div>
            </div>

            {
                editAnnModal === true ? <EditAnnouncementModal ann={ann} hide={()=>setEditAnnModal(false)}/> : ""
            }

        </div>


    )
}
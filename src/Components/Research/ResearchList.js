import { ChangeHistory } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import EditPublicationModal from './EditPublicationModal';
import {base_url} from "../../Service/serviceapi";
import { toast } from 'react-toastify';

export default function ResearchList({publication, change}) { 
    const [modal, setModal] = useState(false);

    const getData = () => {
        console.log(publication)
        setModal(true)
    }

    const deletePub = () => {
        console.log(publication.id)
        axios({
            method: 'DELETE',
            url:  `${base_url}/publication/delete/${publication.id}`,

        })
        .then(function(response){
            toast.success("Publication deleted successfully", {autoClose:1500, hideProgressBar:true});
            change();
        }, (error) => {
            toast.error("Error in deleting publication", {autoClose:1500, hideProgressBar:true});
        })
    }

    const updateHighlight = (e) => {
        let highlight = e.target.value;
        if (highlight === "true") {
            highlight = "false";
        } else {
            highlight = "true";
        }
        axios({
            method: 'PUT',
            url:  `${base_url}/publication/updatehighlight?highlight=${highlight}&publicationId=${publication.id}`,
        })
        .then(function(response){
            toast.success("Publication highlighted successfully", {autoClose:1500, hideProgressBar:true});
            change();
        }, (error) => {
            toast.error("Error in highlighting publication", {autoClose:1500, hideProgressBar:true});
        })
    }

    return(
        <div key={publication.id}>
            <div className="card my-1" >
                <div className="card-body">
                    <h5 className="card-title">{ publication.title!=null ? publication.title : "No Title" }</h5>
                    <div className="card-text"> 
                        <div> { publication.authors } </div>
                        <div> { publication.journal } </div>
                        <div className="text-clamping mt-2"> { publication.description } </div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-danger btn-sm" type="button" onClick={() =>deletePub()}>Delete</button>
                        <button className="btn btn-outline-dark btn-sm" type="button" value={publication.highlighted} onClick={updateHighlight}>{ publication.highlighted ? "Highlighted" : "Highlight" }</button>
                        <button className="btn btn_dark_normal btn-sm" type="button" onClick={() =>getData()}>Edit</button>
                    </div>  
                </div>
            </div>
            {
                modal === true ? <EditPublicationModal publication={ publication } hide={()=>setModal(false)} change={change}/> : ''
            }
        </div>
    )
}
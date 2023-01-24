import { ChangeHistory } from '@mui/icons-material';
import axios from 'axios';
import React, { useState } from 'react';
import EditPublicationModal from './EditPublicationModal';
import {base_url} from "../../Service/serviceapi";
import { toast } from 'react-toastify';
import {addMaterialBtn, addDetailList, displayExcelFile, isObjectExist} from "../../Helper/util/util";

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
            change();
            toast.success("Publication highlight successfully updated", {autoClose:1500, hideProgressBar:true});
        }, (error) => {
            toast.error("Error in highlighting publication", {autoClose:1500, hideProgressBar:true});
        })
    }

    return(
        <div key={publication.id}>
            <div className="card my-1" >
                <div className="card-body">
                    <h5 className="card-title">{ publication.title!=null ? publication.title : "No Title" }</h5>
                    <div className="card-text my-1"> 
                        <div className="fst-italic fw-light"> { publication.authors } </div>
                        <div> { publication.journal } </div>
                        <div> { publication.doi !== '' ? publication.doi : ''} </div>
                        <div className="text-clamping mt-2"> { publication.description } </div>
                    </div>
                    <div className="row">
                    {
                        isObjectExist(publication, "additionalDetails") ? 
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">Details</div>
                            <div className="">
                                <ul>
                                { addDetailList(publication.additionalDetails) }
                                </ul>
                            </div>
                        </div>
                        :
                        ""
                    }

                    { 
                        isObjectExist(publication, "filePath") ? 
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">File</div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <ul>
                                { addMaterialBtn(publication.file, "file", publication.filePath)}
                                </ul>
                            </div>
                        </div>
                    
                        : "" 
                    }

                    {
                        isObjectExist(publication, "addAddFilePath")? 
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">Additional File(s)</div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <ul>
                                { addMaterialBtn(publication.addAddFilePath, "file") }
                                </ul>
                            </div>
                        </div>
                        :
                        ""
                    }
                    
                    { 
                        isObjectExist(publication, "link")? 
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">Link</div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <ul>{ addMaterialBtn(publication.link, "g_scholar") }</ul>
                            </div>
                        </div>
                        : ""
                    }

                    {
                        isObjectExist(publication, "additionalLinks") ?
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">Additional Link(s)</div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <ul>{ addMaterialBtn(publication.additionalLinks, "add_link") }</ul>
                            
                            </div>
                        </div>
                        :
                        ""
                    }
                    
                    { 
                        isObjectExist(publication, "link") ? 
                        <div className="my-1 col-md-6">
                            <div className="fw-bold">Link</div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <ul>{ addMaterialBtn(publication.link, "g_scholar") }</ul>
                            </div>
                        </div>
                        : ""
                    }
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
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {base_url} from "../../../Service/serviceapi"
import { ReactSession } from 'react-client-session';
import { ToastContainer, toast } from 'react-toastify';
import {addMaterialBtn, addDetailList, displayExcelFile, isObjectExist} from '../../../Helper/util/util';

export default function PublicationList({publication}) {
    const [pub, setPub] = useState(null);

    return(
        <div key={publication.id}>
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
                </div>
                
            </div>

        </div>
        </div>
    )
}
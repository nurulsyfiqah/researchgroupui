import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {base_url} from "../../../Service/serviceapi"
import { ReactSession } from 'react-client-session';
import { ToastContainer, toast } from 'react-toastify';

export default function PublicationList({publication}) {
    const [pub, setPub] = useState(null);

    const materialBtn=(item, type, index)=>{
        if ((item !== null || item !== undefined || item !== "") && type === "file") {
            var ext = item.split('.').pop();
            if(ext === "pdf"){
                return(
                    <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">PDF</a>
                )
            } else if(ext === "pptx" || ext === "ppt"){
                return(
                    <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>ppt</a>
                )
            } else if(ext === "docx" || ext === "doc"){
                return(
                    <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>doc</a>
                )
            } else if(ext === "xlsx" || ext === "xls"){
                return(
                    <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>xls</a>
                )
            } else if(ext === "png" || ext === "jpg" || ext === "jpeg"){
                return(
                    <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>img</a>
                )
            }

        } else if ((item !== null || item !== undefined || item !== "") && type === "g_scholar") {
            return(
                <a href={`${item}`} key={index} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">Google Scholar</a>
            )
        } else if (type === "add_link") {
            return(
                <a href={`${item.value}`} key={index} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">{item.title}</a>
            )
        }
        else {
            return null
        }
    }

    return(
        <div key={publication.id}>
           <div className="card my-2" key={`${publication.id}`}>
                <div className="row g-0">
                    {/* <div className="col-md-3">
                        <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                    </div> */}
                    <div className="col-md-12">
                        <div className="card-body h-100">
                            <h5 className="card-title">{publication.title}</h5>
                            <p className="card-text text-clamping">{publication.pubAbstract}</p>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                { materialBtn(publication.filePath, "file") }
                                { materialBtn(publication.link, "g_scholar") }
                                {
                                    publication.additionalDetails !== null ?
                                    publication.additionalDetails.map((item, index) => {
                                        return(
                                            materialBtn(item, "add_link", index)
                                        )
                                    })
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                            </div>
        </div>
    )
}
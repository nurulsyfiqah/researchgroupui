import React, { useEffect, useState } from 'react';
import ResearchList from './ResearchList';
import AddPublication from './AddPublication';
import VerifyPublication from './VerifyPublication';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import base_url from "../../Service/serviceapi";
import { ReactSession } from 'react-client-session';

export default function Research() {

    const [publications, setPublications] = useState([]);
    const [pub, setPub] = useState([]);
    const [change, setChange] = useState(0);
    
    const account = ReactSession.get("account");


    // get the scraped data from the google scholar
    const scrapePublication=()=>{   
        axios({
            method: 'GET',
            url: base_url + '/publication?gscLink=https://scholar.google.ca/citations?user=hKfga9oAAAAJ' ,
          })
            .then(function (response) {
                const data = response.data;
                setPublications(data);
            }, (error) => {
                toast.error("Something went wrong on Server")
            })
    }

    useEffect(() => {
        scrapePublication()
    }, []);

    useEffect(() => {getPublicationFromServer()}, [change]);

    // get the publication
    const getPublicationFromServer=()=>{

        axios.get(`${base_url}/publication/all?id=${account.id}`).then((
            response)=>{
            const data = response.data;
            console.log(data)
            setPub(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    return (
        <div className="my-4 py-2">
            <h2 className="page_title">Research</h2>

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Research
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-add-research" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Add
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Verify
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                     aria-labelledby="pills-home-tab">
                    {
                        pub.length > 0 ?
                            pub.map((p) => (
                                <ResearchList publication={p} change={()=>{setChange(change+1)}}/>
                            ))
                            :
                            <div class="card"><div class="card-body">There is no publication added</div></div>
                    }
                    
                </div>

                <div className="tab-pane fade add_research_container" id="pills-add-research" role="tabpanel"
                     aria-labelledby="pills-profile-tab">
                    <AddPublication/>
                </div>

                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                {
                publications.length > 0 ?
                    publications.map((publication) => (
                        <VerifyPublication publication={publication} />
                    ))
                    :
                    <div class="card"><div class="card-body">There is no publication that need to be verified.</div></div>
                }
                </div>
            </div>

        </div>
    )
}
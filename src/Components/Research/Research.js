import React, { useEffect, useState, useCallback } from 'react';
import ResearchList from './ResearchList';
import AddPublication from './AddPublication';
import VerifyPublication from './VerifyPublication';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import { ReactSession } from 'react-client-session';
import { isObjectExist } from '../../Helper/util/util';

export default function Research() {

    const [publications, setPublications] = useState([]);
    const [pub, setPub] = useState([]);
    const [change, setChange] = useState(0);
    const [gsLink, setgsLink] = useState(false);
    
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    let [activeTab, setActiveTab] = useState('research_tab');

    // get the scraped data from the google scholar
    const scrapePublication=()=>{   

        const formdata = new FormData();
        formdata.append("gscLink", user.googleScholarLink);
        formdata.append("userId", user.id);
        if (isObjectExist(user, "googleScholarLink")) {
            axios({
            method: 'POST',
            // url: `${base_url}/publication?gscLink=${user.googleScholarLink}&userId=${user.id}`
            url: `${base_url}/publication/scrape/author`,
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
            .then(function (response) {
                const data = response.data; 
                setPublications(data);
            }, (error) => {
                toast.error("Something went wrong on Server")
            })
        }
    }

    useEffect(() => {
        scrapePublication()
        setgsLink(true)
    }, []);

    function removePublication(id){
        //get the index of the object in the array.
        const indexOfObject = publications.findIndex(object => {
            return object.id === id;
        });        
        // remove the element at that index.
        publications.splice(indexOfObject, 1);
        setPublications([...publications])
    }

    useEffect(() => {getPublicationFromServer()}, [change]);

    // get the publication
    const getPublicationFromServer=()=>{

        axios.get(`${base_url}/publication/all?id=${user.id}`).then((
            response)=>{
            const data = response.data;
            setPub(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const changeActiveTab = (tab) => {
        setActiveTab(tab.target.value);
    };

    const tab = (e) => {
        setActiveTab(e);
    }
    
    return (
        <div className="my-4 py-2">
            <h2 className="page_title">Research</h2>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${(activeTab === "research_tab" ? "active" : "")}`} id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true" value="research_tab" onClick={()=>changeActiveTab}>Research
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${(activeTab === "add_tab" ? "active" : "")}`} id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-add-research" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false" value="add_tab" onClick={()=>changeActiveTab}>Add
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${(activeTab === "verify_tab" ? "active" : "")}`} id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false" value="verify_tab" onClick={()=>changeActiveTab}>Verify
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">

                <div className={`tab-pane fade ${(activeTab === "research_tab" ? "show active" : "")}`} id="pills-home" role="tabpanel"
                     aria-labelledby="pills-home-tab">
                    {
                        pub.length > 0 ?
                            pub.map((p, index) => (
                                <ResearchList key={index} publication={p} change={()=>{setChange(change+1)}} />
                            ))
                            :
                            <div className="card"><div className="card-body">There is no publication added</div></div>
                    }
                    
                </div>

                <div className={`tab-pane fade  add_research_container ${(activeTab === "add_tab" ? "show active" : "")}`} id="pills-add-research" role="tabpanel"
                     aria-labelledby="pills-profile-tab">
                    <AddPublication change={()=>{setChange(change+1)}} active={()=>{tab('research_tab')}}/>
                </div>

                <div className={`tab-pane fade ${(activeTab === "verify_tab" ? "show active" : "")}`} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                {
                publications.length > 0 ?
                    publications.map((publication, index) => (
                        <VerifyPublication key={index} publication={publication} user={user}  change={()=>{setChange(change+1)}} removepub={()=>removePublication(publication.id)}/>
                    ))
                    :
                    <div className="card"><div className="card-body">There is no publication that need to be verified.</div></div>
                }
                </div>
            </div>

        </div>
    )
}
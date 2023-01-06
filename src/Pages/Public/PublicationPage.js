import React, {useState, useEffect} from 'react';
import Navbar from '../../Components/Website/PublicNavbar'
import PublicationList from '../../Components/Website/Publication/PublicationList'
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';

export default function PublicationPage() {
    const researcher_id = ReactSession.get("researcher_id");
    console.log(researcher_id)
    const [pub, setPub] = useState([]);

    const getPublicationFromServer=()=>{
        axios.get(`http://localhost:8080/publication/all?id=${researcher_id }`).then((
            response)=>{
            const data = response.data;
            console.log(data)
            setPub(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }
    
    useEffect(()=>{
        getPublicationFromServer();
    },[])
    
    return (
        <div>
            <Navbar />
            <div className="my-4 mx-4 py-2 px-1">
                <h2 className="page_title">Publication</h2>

                {
                    pub.length ?
                        pub.map((p) => (
                            <PublicationList publication={p} />
                        ))
                        :
                        <div class="card"><div class="card-body">There is no publication added</div></div>
                }

            </div>
        </div>
    )
}
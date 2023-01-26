import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import {base_url} from "../../Service/serviceapi";
import { ToastContainer, toast } from "react-toastify";
import {ReactSession} from "react-client-session";
import { isObjectExist } from '../../Helper/util/util';

export default function VerifyPublication({ publication, change,removepub}) {

    const articleLink = isObjectExist(publication, "link") ? publication.link : "";
    const user = ReactSession.get("user");

    const skipPublication = () => {
        publication.userId = user.id;
        axios({
            method: 'PUT',
            url: `${base_url}/user/publication/reject`,
            data: publication,
          })
            .then(function (response) {
                // return result
                // toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
                removepub()
            }, (error) => {
                toast.error("Something went wrong on Server", {autoClose: 1500,hideProgressBar: true})
            })
    }


    const verifyPublication = () => {
        try {
            const encodedArticleLink = encodeURIComponent(articleLink);
            axios({
                method: 'GET',
                url: base_url + '/publication/article1?articleLink='+encodedArticleLink+'&userId='+user.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).then(function(response) {
                if (response.status === 200) {
                    const data = response.data;
                    
                    if (data.hasOwnProperty("userId") && data.hasOwnProperty("title")) {
                        data.userId = user.id;
                        console.log(response)
                        removepub()
                        change()
                        toast.success("Verified", {autoClose: 1500,hideProgressBar: true})
                    }
                    
                } else {
                    toast.error("Unable to verify",{autoClose: 1500,hideProgressBar: true})
                    change()
                }
               
            });

            // const data = response.data;
            // console.log(data)
            // // if (data != null) {
            // //     removepub()
            // //     toast.success("Verified", {autoClose: 1500,hideProgressBar: true})
            // //     change()
            // // } else {
            // //     toast.error("Unable to verfy",{autoClose: 1500,hideProgressBar: true})
            // //     change()
            // // }
            // const verifiedPub = response.data;
            // if (data.hasOwn Property("userId")) {
            //     data.userId = user.id;
            // }
            // const addResponse = await axios({
            //     method: 'POST',
            //     url: base_url + '/publication/add',
            //     data : verifiedPub
            //   });
            //   addResponse
            //   removepub()
            //   change()
        } catch (error) {
            toast.error("Something went wrong on Server",{autoClose: 1500,hideProgressBar: true})
        }
    }

    const previewPub=(e)=> {
        window.open(
            e.target.value,
            '_blank' // <- This is what makes it open in a new window.
        );
        // window.location.href = e.target.value;
    }

    return(
        <div key={`pub_${ isObjectExist(publication, "id") ? publication.id : ""}`}>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{ isObjectExist(publication, "title") ? publication.title : "" }</h5>
                    <div className="card-text"> 
                        <div> {  isObjectExist(publication, "authors") ? publication.authors : "" } </div>
                        <div> {  isObjectExist(publication, "journal") ? publication.journal : ""} </div>
                    </div>
                        
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-secondary btn-sm me-md-2" type="button" onClick={skipPublication}>Skip</button>
                        <button className="btn btn-outline-dark btn-sm me-md-2" value={ publication.link } onClick={previewPub}>View</button>
                        <button className="btn btn_dark_normal btn-sm" type="button" onClick={ verifyPublication }>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
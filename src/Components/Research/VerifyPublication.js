import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import {base_url} from "../../Service/serviceapi";
import { ToastContainer, toast } from "react-toastify";
import {ReactSession} from "react-client-session";

export default function VerifyPublication({publication, change, user, removepub}) {

    const articleLink = publication.link;

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
                const data = response.data;
                removepub()
            }, (error) => {
                toast.error("Something went wrong on Server", {autoClose: 1500,hideProgressBar: true})
            })
    }

    // const verifyPublication = () => {
    //     // scrape the article data from the link
    //     axios({
    //         method: 'POST',
    //         url: base_url + '/publication/article1?articleLink='+articleLink,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //       })
    //         .then(function (response) {
    //             // return result
    //             const data = response.data;
    //             const verifiedPub = response.data;
    //             if (data.hasOwnProperty("userId")) {
    //                 data.userId = user.id;
    //             }

    //             axios({
    //                 method: 'POST',
    //                 url: base_url + '/publication/add' ,
    //                 data : verifiedPub
    //               })
    //                 .then(function (response) {
    //                     // return result
    //                     toast.success("Verified", {autoClose: 1500,hideProgressBar: true})
    //                     removepub()
    //                     change()
    //                 }, (error) => {
    //                     toast.error("Something went wrong on Server",{autoClose: 1500,hideProgressBar: true})
    //                 })

    //         }, (error) => {
    //             toast.error("Something went wrong on Server",{autoClose: 1500,hideProgressBar: true})
    //         })
    //     // save the publication data to db
    // }
    const verifyPublication = async () => {
        try {
            const encodedArticleLink = encodeURIComponent(articleLink);
            const response = await axios({
                method: 'POST',
                url: base_url + '/publication/article1?articleLink='+encodedArticleLink,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              });

            const data = response.data;
            console.log(data)
            // if (data != null) {
            //     removepub()
            //     toast.success("Verified", {autoClose: 1500,hideProgressBar: true})
            //     change()
            // } else {
            //     toast.error("Unable to verfy",{autoClose: 1500,hideProgressBar: true})
            //     change()
            // }
            const verifiedPub = response.data;
            if (data.hasOwnProperty("userId")) {
                data.userId = user.id;
            }
            const addResponse = await axios({
                method: 'POST',
                url: base_url + '/publication/add',
                data : verifiedPub
              });
              addResponse
              removepub()
              change()
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
        <div key={publication.id} id={`pub_${publication.id}`}>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{ publication.title }</h5>
                    <div className="card-text"> 
                        <div> { publication.authors } </div>
                        <div> { publication.journal } </div>
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
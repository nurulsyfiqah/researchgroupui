import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import base_url from "../../Service/serviceapi";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyPublication({publication, change}) {
    
    const articleLink = publication.link;

    const verifyPublication = () => {
        console.log("verify btn clicked")
        // scrape the article data from the link
        axios({
            method: 'GET',
            url: base_url + '/publication/article?articleLink=' + articleLink ,
          })
            .then(function (response) {
                // return result
                const data = response.data;
                console.log(data)
            }, (error) => {
                toast.error("Something went wrong on Server")
            })
        // save the publication data to db
    }

    const previewPub=(e)=> {
        console.log(e.target.value);
        window.open(
            e.target.value,
            '_blank' // <- This is what makes it open in a new window.
        );
        // window.location.href = e.target.value;
    }

    return(
        <div>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{ publication.title }</h5>
                    <p className="card-text"> 
                        <div> { publication.author } </div>
                        <div> { publication.journal } </div>
                    </p>
                        
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-secondary btn-sm me-md-2" type="button">Cancel</button>
                        <button className="btn btn-outline-dark btn-sm me-md-2" value={ publication.link } onClick={previewPub}>View</button>
                        <button className="btn btn_dark_normal btn-sm" type="button" onClick={ verifyPublication }>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
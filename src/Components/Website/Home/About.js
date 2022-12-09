import React, {useEffect, useState} from 'react';
import Placeholder from '../../../Assets/Images/image-placeholder.jpg'
import axios from 'axios';
import base_url from "../../../Service/serviceapi";
import { SocialIcon } from 'react-social-icons';
import {ToastContainer, toast} from "react-toastify";

export default function About({account, user}) {

    return (
        <div className="p-3">
            <div className="row mt-4">
                <div className="col-md-3 mb-1">
                    <img
                        src= {Placeholder}
                        alt="resgm-logo"
                        height="140em"
                        className="d-inline-block align-text-top mt-1 mb-1 nav_logo mx-auto d-block"
                    />
                </div>
                <div className="col-md-9 align-self-center">
                    <h3 className="text-bold">{ account !== null ? account.lastName: ''}, { account !== null ? account.firstName : ''}</h3>
                    <h5>Penultimate Software Engineering Student in University Malaya</h5>
                    <div className="row justify-content-lg-start">
                        {
                            user !== null ? 
                            user.socialMedia.map((item, index)=>{
                                return(
                                    <SocialIcon url={item} style={{ height: 30, width: 30 }} className="mx-2" />
                                )
                            })
                            : ''
                        }
                    </div>
                </div>
            </div>

            <div className="text-justify mt-2">
                {user !== null ? user.about : ''}
            </div>

            <hr/>
            <div className="mt-2">
                <h3 className="my-2">Highlight</h3>
                <div className="card my-2">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body h-100">
                                <h5 className="card-title">Research Title 1</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body h-100">
                                <h5 className="card-title">Research Title 2</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
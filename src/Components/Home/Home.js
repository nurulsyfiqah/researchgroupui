import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { FaGlobeAmericas as WebsiteIcon, FaEdit as EditIcon} from "react-icons/fa";
import ui_url from '../../Service/serviceui';
import Placeholder from '../../Assets/Images/image-placeholder.jpg'
import { SocialIcon } from 'react-social-icons';
import {UploadImageModal, EditSocialLinkModal, EditDomainModal, EditInfoModal, EditAboutModal, EditAffiliationModal} from "./HomeModal"
import axios from "axios";
import base_url from "../../Service/serviceapi";

export default function Home() {

    const acc = ReactSession.get("account");
    const [imageModal, setImageModal] = useState(false)
    const [socialLinkModal, setSocialLinkModal] = useState(false)
    const [domainModal, setDomainModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [aboutModal, setAboutModal] = useState(false)
    const [affiliationModal, setAffiliationModal] = useState(false)
    const [user, setUser] = useState([]);
    const [account, setAccount] = useState([]);
    const [change, setChange] =useState(0);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${base_url}/user/getuserbyaccountid/${acc.id}`,
        }).then(function(response){
            setUser(response.data)
        })

        axios({
            method: 'GET',
            url: `${base_url}/account/getaccountbyid/${acc.id}`,
        }).then(function(response){
            setAccount(response.data)
        })
    },[change]);

    const showImageModal = () => {
        return setImageModal(true)
    }

    const showSocialLinkModal = () => {
        return setSocialLinkModal(true)
    }

    const showDomainModal = () => {
        return setDomainModal(true)
    }

    const showInfoModal = () => {
        return setInfoModal(true)
    }

    const showAboutModal = () => {
        return setAboutModal(true)
    }

    const showAffiliationModal = () => {
        return setAffiliationModal(true)
    }

    return(
        <div className="row my-4">

            <div className="col-md-4 mt-4">
                <div className="card my-2" style={{height: 200, width: "auto", overflow: "hidden"}}>
                    <div className="card-header d-flex justify-content-between" >
                        <div>Image</div>
                        <EditIcon className="icon_dark" onClick={() =>showImageModal()} />
                    </div>
                    <img src={Placeholder} className="img-fluid mx-auto d-block" alt="placeholder"/>
                </div>

                {
                    imageModal === true ? <UploadImageModal data={null} hide={()=>setImageModal(false)}/> : ''
                }

                <div className="card my-2">
                    <div className="card-body text-center">
                        <WebsiteIcon className="icon_dark h3"/>
                        <div className="text-bold">Preview Website</div>
                        <Link target="_blank" to={`/${account.username}`}> { `${ui_url}/${account.username}` } </Link>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Social Links</div>
                        <EditIcon className="icon_dark" onClick={() =>showSocialLinkModal()} />
                    </div>
                    <div className="card-body">
                        {
                            ('socialMedia' in user) ? 
                            user.socialMedia.map((data, index)=>{
                                return(
                                    <div className="my-1" key={data}>
                                        <SocialIcon url={data} target="_blank" style={{ height: 35, width: 35 }}/>
                                        <span className="ms-3"><Link to={data} target="_blank"> {data}</Link></span>
                                    </div>
                                    )
                            })
                            : 'No social links added'
                        }
                    </div>
                </div>
                {
                    socialLinkModal === true ? <EditSocialLinkModal data={user} hide={()=>setSocialLinkModal(false)} change={()=>{setChange(change+1)}} /> : ''
                }
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Domain</div>
                        <EditIcon className="icon_dark" onClick={() =>showDomainModal()} />
                    </div>
                    <div className="card-body">
                        <h5>
                            {
                                user.domain ? user.domain.map(data =>
                                    <span className="badge bg-secondary m-1">{data}</span>
                                ) : 'No social links added yet'
                            }
                        </h5>
                    </div>
                </div>
            </div>
            {
                domainModal === true ? <EditDomainModal data={user} hide={()=>setDomainModal(false)} change={()=>{setChange(change+1)}} /> : ''
            }
            <div className="col-md-8 mt-4">
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Personal Information</div>
                        <EditIcon className="icon_dark" onClick={() =>showInfoModal()} />
                    </div>
                    <div className="card-body">
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Username</div>
                            <div className="col-md-8">{account.username}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Published Name</div>
                            <div className="col-md-8">{user.publishedName !== "" ? user.publishedName : "-"}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">First Name</div>
                            <div className="col-md-8">{user.firstName}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Last Name</div>
                            <div className="col-md-8">{user.lastName}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Email</div>
                            <div className="col-md-8">{account.email}</div>
                        </div>
                    </div>
                </div>
                {
                    infoModal === true ? <EditInfoModal data={user} account={account} hide={()=>setInfoModal(false)}  change={()=>{setChange(change+1)}}/> : ''
                }
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>About</div>
                        <EditIcon className="icon_dark" onClick={() =>showAboutModal()} />
                    </div>
                    <div className="card-body">
                        { ('about') in user ? user.about : '' }
                    </div>
                </div>
                {
                    aboutModal === true ? <EditAboutModal data={user} hide={()=>setAboutModal(false)}  change={()=>{setChange(change+1)}}/> : ''
                }
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Affiliation</div>
                        <EditIcon className="icon_dark" onClick={() =>showAffiliationModal()} />
                    </div>
                    <div className="card-body">
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Institution</div>
                            <div className="col-md-9">University of Malaya</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Department</div>
                            <div className="col-md-9">Software Engineering</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Position</div>
                            <div className="col-md-9">Student</div>
                        </div>
                    </div>
                </div>
                {
                    affiliationModal === true ? <EditAffiliationModal data={user} hide={()=>setAffiliationModal(false)} change={()=>{setChange(change+1)}}/> : ''
                }
            </div>

        </div>
    )
}
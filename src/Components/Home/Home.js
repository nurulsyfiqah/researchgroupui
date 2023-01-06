import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { FaGlobeAmericas as WebsiteIcon, FaEdit as EditIcon, FaPlus as AddIcon} from "react-icons/fa";
import ui_url from '../../Service/serviceui';
import Placeholder from '../../Assets/Images/image-placeholder.jpg'
import { SocialIcon } from 'react-social-icons';
import {UploadImageModal, EditSocialLinkModal, EditDomainModal, EditInfoModal, EditAboutModal, AddAffiliationModal ,EditAffiliationModal} from "./HomeModal"
import axios from "axios";
import {base_url, upload_url} from "../../Service/serviceapi";
import moment from 'moment';

export default function Home() {

    const [imageModal, setImageModal] = useState(false)
    const [socialLinkModal, setSocialLinkModal] = useState(false)
    const [domainModal, setDomainModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [aboutModal, setAboutModal] = useState(false)
    const [addAffiliationModal, setAddAffiliationModal] = useState(false)
    const [affiliationModal, setAffiliationModal] = useState(false)
    const [user, setUser] = useState([]);
    const [account, setAccount] = useState([]);
    const [change, setChange] =useState(0);
    const [affiliation, setAffiliation] = useState([]);

    useEffect(() => {
        console.log("ho")
        const acc = ReactSession.get("account");
        console.log(acc)
        setAccount(acc);
        axios({
            method: 'GET',
            url: `${base_url}/user/getuserbyaccountid/${acc.id}`,
        }).then(function(response){
            setUser(response.data)
            ReactSession.set("user", response.data);
            console.log(response.data)
        })
        console.log(user)
        // axios({
        //     method: 'GET',
        //     url: `${base_url}/account/getaccountbyid/${acc.id}`,
        // }).then(function(response){
        //     setAccount(response.data)
        // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const showAffiliationModal = (dataAff) => {
        console.log(dataAff)
        setAffiliation(dataAff)
        return setAffiliationModal(true)
    }

    const showAddAffiliationModal = () => {
        return setAddAffiliationModal(true)
    }

    const replaceURL=(url)=>{
        console.log(url)
        if (url === "" || url === undefined) {
            return Placeholder
        } else {
            url = url.replace("C:\\Users\\user\\", "http://127.0.0.1:8081/")
            // var PREFIX = "C:\\Users\\user\\";
            // if (url.startsWith(PREFIX)) {
            // // PREFIX is exactly at the beginning
            // url = url.slice(PREFIX.length);
            // }
            console.log(url)
            return url
        }
    }

    const previewWebsite = () => {
        return window.open(`${ui_url}/${account.username}`, '_blank');
    }

    return(
        <div className="row my-4">

            <div className="col-md-4 mt-4">
                <div className="card my-2" style={{height: 250, width: "auto", overflow: "hidden"}}>
                    <div className="card-header d-flex justify-content-between" >
                        <div>Image</div>
                        <EditIcon className="icon_dark" onClick={() =>showImageModal()}/>
                    </div>
                    {
                        (user !== null && user.hasOwnProperty('image')) ? <img src={`${upload_url}${user.image}`}  style={{overflow: "hidden", height: "250px", width: "auto", objectFit: "cover"}} className="img-fluid mx-auto d-block" alt="placeholder"/> : <img src={Placeholder} className="img-fluid mx-auto d-block" alt="placeholder"/>
                    }
                    
                </div>

                {
                    imageModal === true ? <UploadImageModal data={user} hide={()=>setImageModal(false)} change={()=>setChange(change+1)}/> : ''
                }

                <div className="card my-2">
                    <div className="card-body text-center">
                        <WebsiteIcon className="icon_dark h3"/>
                        <div className="text-bold">Preview Website</div>
                        <div className="preview_website_link" onClick={previewWebsite} style={{cursor:"pointer"}} >{ account || account.hasOwnProperty("username") ? `${ui_url}/${account.username}` : ""  } </div>
                        </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Social Links</div>
                        <EditIcon className="icon_dark" onClick={() =>showSocialLinkModal()} />
                    </div>
                    <div className="card-body">
                        {
                            (user && user.hasOwnProperty('socialMedia')) ? 
                            user.socialMedia.map((data, index)=>{
                                return(
                                    <div className="my-1 text-truncate" key={data}>
                                        <SocialIcon url={data} target="_blank" style={{ height: 35, width: 35 }}/>
                                        <span className="ms-3"><a href={data} target="_blank" rel='noreferrer'>{data}</a></span>
                                        {/* <span className='ms-3 ' style={{cursor:'pointer'}} onClick={view()} data-value={data}>{data}</span> */}
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
                        <h4>
                            {
                                user !== null && user.hasOwnProperty("domain") ? user.domain.map(data =>
                                    <span className="badge bg-secondary m-1 text-clamping-row">{data}</span>
                                ) : ''
                            }
                        </h4>
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
                            <div className="col-md-8">{account != null && account.hasOwnProperty("username") ? account.username : ""}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Published Name</div>
                            <div className="col-md-8">{user != null && user.hasOwnProperty("publishedName") ? user.publishedName : ""}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">First Name</div>
                            <div className="col-md-8">{user != null && user.hasOwnProperty("firstName") ? user.firstName: ""}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Last Name</div>
                            <div className="col-md-8">{user != null && user.hasOwnProperty("lastName") ? user.lastName : ""}</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-4 fw-bold">Email</div>
                            <div className="col-md-8">{account != null && account.hasOwnProperty("email") ? account.email : ""}</div>
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
                        { user != null && user.hasOwnProperty("about") ? user.about : '' }
                    </div>
                </div>
                {
                    aboutModal === true ? <EditAboutModal data={user} hide={()=>setAboutModal(false)}  change={()=>{setChange(change+1)}}/> : ''
                }
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Affiliation</div>
                        <AddIcon className="icon_dark" onClick={() =>showAddAffiliationModal()} />
                    </div>
                    {
                        user != null && user.hasOwnProperty("affiliation") ? 
                        user.affiliation.map((data, index) => {
                            function formatDate(date) {
                                //2022-06-20T11:10:12.000+00:00
                                moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
                                const d = new Date(date)
                                return moment(d).format('Do MMMM YYYY')
                            }
                            return(
                                <div className="p-3">
                                <div className="row my-1">
                                    <div className="col-md-3 fw-bold">Organization</div>
                                    <div className="col-md-9">{data.organization}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-md-3 fw-bold">Position</div>
                                    <div className="col-md-9">{data.position}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-md-3 fw-bold">Start Date</div>
                                    <div className="col-md-9">{formatDate(data.startDate)}</div>
                                </div>
                                <div className="row my-1">
                                    <div className="col-md-3 fw-bold">End Date</div>
                                    <div className="col-md-9">{formatDate(data.endDate)}</div>
                                </div>
                                <div className="d-grid d-md-flex justify-content-md-end me-2">
                                    <EditIcon className="icon_dark" onClick={() =>showAffiliationModal(data)}/>
                                </div>
                            </div>
                            )
                        })
                        :
                        <div className="p-3">No affiliation added</div>
                    }
                </div>
                
                {
                    addAffiliationModal === true ? <AddAffiliationModal hide={()=>setAddAffiliationModal(false)} change={()=>{setChange(change+1)}}/> : ''
                }
                {
                    affiliationModal === true ? <EditAffiliationModal data={affiliation} allData={user.affiliation} hide={()=>setAffiliationModal(false)} change={()=>{setChange(change+1)}}/> : ''
                }
            </div>

        </div>
    )
}
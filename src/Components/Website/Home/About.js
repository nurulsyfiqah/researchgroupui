import React, {useEffect, useState} from 'react';
import SubscriptionModal from '../Subscription/SubscriptionModal';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import { base_url, upload_url } from '../../../Service/serviceapi';
import { image_placeholder, base64toImage, addMaterialBtn, isObjectExist, addDetailList } from '../../../Helper/util/util';

export default function About({account, user}) {

    const [highlightedPublications, setHighlightedPublications] = useState(null);
    const[show, setShow] = useState(false);
    
    const getHighlightedPublicationsFromServer = () => {
        axios({
            method: 'GET',
            url: `${base_url}/publication/highlighted/${user.id}`,
        }).then((response) => {
            setHighlightedPublications(response.data);
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getHighlightedPublicationsFromServer();
    }, [])

    const setSubModal=()=>{
        setShow(true);
        console.log(show);
    }

    return (
        <div className="p-3">
            <div className="row mt-4">
                <div className="col-md-3 mb-1">
                <div className="">
                    <img
                        src= {user.image !== "" ? base64toImage(user.imageBinary.data, user.image) : image_placeholder()}
                        alt="user_image"
                        className="img-fluid mx-auto d-inline-block align-text-top my-1 nav_logo d-block"
                        style={{overflow: "hidden", height: "190px", width: "150px", objectFit: "cover"}}
                    />
                </div>
                </div>
                <div className="col-md-9 align-self-center">
                    <h3 className="text-bold">{ account !== null ? account.lastName: ''}, { account !== null ? account.firstName : ''}</h3>
                    <h5>Penultimate Software Engineering Student in University Malaya</h5>
                    <div className="row justify-content-lg-start">
                        {
                            user !== null ? 
                            user.socialMedia.map((item, index)=>{
                                return(
                                    <SocialIcon key={`icon_${index}`} url={item} style={{ height: 30, width: 30 }} className="mx-2" />
                                )
                            })
                            : ''
                        }
                    </div>
                    <button className="btn btn-danger btn-sm my-2" onClick={setSubModal}>Subscribe</button>
                </div>
            </div>

            <div className="text-justify mt-2">
                {user !== null ? user.about : ''}
            </div>

            <hr/>
            <div className="mt-2">
                <h3 className="my-2">Highlight</h3>
                {
                    highlightedPublications !== null ?
                    highlightedPublications.map((item, index)=>{
                        return(
                            <div className="card my-2" key={`highlighted_${index}`}>
                                <div className="row g-0">
                                    {/* <div className="col-md-3">
                                        <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                                    </div> */}
                                    <div className="col-md-12">
                                        <div className="card-body h-100">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text text-clamping">{item.pubAbstract}</p>

                                            <div className="row">
                                            {
                                                isObjectExist(item, "additionalDetails") ? 
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">Details</div>
                                                    <div className="">
                                                        <ul>
                                                        { addDetailList(item.additionalDetails) }
                                                        </ul>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }

                                            { 
                                                isObjectExist(item, "filePath") ? 
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">File</div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        <ul>
                                                        { addMaterialBtn(item.file, "file", item.filePath)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            
                                                : "" 
                                            }

                                            {
                                                isObjectExist(item, "addAddFilePath")? 
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">Additional File(s)</div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        <ul>
                                                        { addMaterialBtn(item.addAddFilePath, "file") }
                                                        </ul>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }
                                            
                                            { 
                                                isObjectExist(item, "link")? 
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">Link</div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        <ul>{ addMaterialBtn(item.link, "g_scholar") }</ul>
                                                    </div>
                                                </div>
                                                : ""
                                            }

                                            {
                                                isObjectExist(item, "additionalLinks") ?
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">Additional Link(s)</div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        <ul>{ addMaterialBtn(item.additionalLinks, "add_link") }</ul>
                                                    
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }
                                            
                                            { 
                                                isObjectExist(item, "link") ? 
                                                <div className="my-1 col-md-6">
                                                    <div className="fw-bold">Link</div>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        <ul>{ addMaterialBtn(item.link, "g_scholar") }</ul>
                                                    </div>
                                                </div>
                                                : ""
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                })
                :
                ""
            }
            </div>
            {
                show ? <SubscriptionModal account={account} user={user} hide={()=>setShow(false)}/> : ""
            }
        </div>
    )
}
import React, { useState } from 'react';
import {BsXLg} from "react-icons/bs";
import {toast} from "react-toastify";
import base_url from "../../Service/serviceapi";
import axios from "axios";
import emailjs from '@emailjs/browser';
import moment from "moment";
import Picker from 'emoji-picker-react';
import {ReactSession} from "react-client-session";


export default function CreateGroupModal({create, hide}) {
    const account = ReactSession.get("account");
    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [domain, setDomain] = useState("")
    const [domainList, setDomainList] = useState([])
    const [emailList, setEmailList] = useState(  []);
    const [email, setEmail] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const groupNameUpdate=(e)=>{
        setGroupName(e.target.value);
    }

    const descriptionUpdate=(e)=>{
        setDescription(e.target.value);
    }

    const domainUpdate=(e)=>{
        setDomain(e.target.value);
    }

    const emailUpdate = e => {
        setEmail(e.target.value)
    }

    const emailListUpdate = () => {
        setEmailList([...emailList, {
            memberEmail:email,
            status:0,
            memberId: ""
        }])
        setEmail([])
        console.log(emailList)
    };

    const removeEmail = (index) => {
        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const params = {
        name: groupName,
        icon: chosenEmoji != null ? chosenEmoji.emoji : '',
        description: description,
        domain: domainList,
        member: emailList,
        createdBy: account.id,
        createdDate: moment().format(),
        status: 0,
    }

    // 1. submit form to create group
    const handleSubmit=(e) => {
        e.preventDefault();
        params.domain = domainList
        console.log(params)
        axios({
            method: 'POST',
            url: `${base_url}/group/create`,
            data: params
        })
            .then(function (response) {
                // 2. send invitation email to members
                var count = 0;
                toast.success("Group created successfully", {autoClose: 1500,hideProgressBar: true})
                create()
                hide()
                if(response){
                    // window.location.reload(true);
                    if (emailList.length > 0) {
                        emailList.forEach((email, index) => {
                            const emailParams = {
                                service_id: "service_nc347wl",
                                template_id: "template_a9a7mi9",
                                user_id: "VJgY9rNMYrcl4jBgg",
                                template_params: {
                                    'to_email': email.memberEmail,
                                    'reply_to': 'nurulsyfiqah25@gmail.com',
                                    'group_name': groupName,
                                    'creator': 'nurul',
                                    'message': '',
                                    'system_name': 'Research Group Management System'
                                }
                            }
                            // emailjs.send(emailParams.service_id, emailParams.template_id, emailParams.template_params, emailParams.user_id)
                            //     .then((result) => {
                            //         if (result.status === 200) {
                            //             count++;
                            //             if (count >= emailList.length) {
                            //                 toast.success("Invitations had been sent")
                            //                 window.location.reload(false)
                            //             }
                            //         }
                            //     }, (error) => {
                            //         console.log(error.text);
                            //     });
                        })
                    }
                }

            })
            .catch(function (error) {
                toast.error("Group fail to be created", {autoClose: 1500,hideProgressBar: true})
                console.log(error)
            })
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true"  style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-md-3 p-1">
                    <div className="modal-body">
                        <h3>Create Your Research Group</h3>
                        <p>Collaborate closely with a group of people inside your research</p>
                        <div className="d-flex justify-content-center">
                            <div className="circle">
                                {chosenEmoji ? (
                                    <span>{chosenEmoji.emoji}</span>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <label className="form-label" htmlFor="name">Group Icon</label>
                        <Picker native={true} onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%', height: '13em' }} disableSearchBar={false}/>
                        <label className="form-label" htmlFor="name">Group Name</label>
                        <div className="input-group input-group-sm mb-1">
                            <input type="text" className="form-control" id="name" name="name" onChange={groupNameUpdate}/>
                        </div>
                        <label className="form-label"  htmlFor="descrption">Description</label>
                         <div className="input-group mb-1">
                            <textarea className="form-control" id="descrption" name="description" onChange={descriptionUpdate}></textarea>
                        </div>
                        <label className="form-label"  htmlFor="dom ain">Domain</label>
                        <div className="input-group input-group-sm mb-1">
                            <input type="text" className="form-control" id="domain" name="domain" onChange={domainUpdate}/>
                        </div>
                        <label className="form-label">Invite Members by Email</label>
                        <div className="input-group input-group-sm mb-1">
                            <input type="text" className="form-control" name="email" id="email" value={email} onChange={emailUpdate}/>
                            <button className="btn btn-outline-dark" type="button" onClick={emailListUpdate}>Add</button>
                        </div>
                        <div className="email_list">
                            {
                                emailList.length > 0 ?
                                    emailList.map((email, index) =>(
                                        <div className="row justify-content-between">
                                            <div key={index} className="col-8"> {email.memberEmail} </div>
                                            <div className="col-2"><div className="float-end" type="button" id="`${index}`" onClick={() => removeEmail(index)}> <BsXLg/> </div></div>
                                        </div>
                                    ))
                                    :
                                    "No added member's email yet"
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary me-2" onClick={hide} >Close</button>
                        <button type="submit" className="btn btn-sm btn_dark" onClick={handleSubmit}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
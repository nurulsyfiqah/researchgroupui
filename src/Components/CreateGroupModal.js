import React, { useState } from 'react';
import {BsXLg} from "react-icons/bs";
import {toast} from "react-toastify";
import base_url from "../Service/serviceapi";
import axios from "axios";
import emailjs from '@emailjs/browser';
import moment from "moment";


export default function CreateGroupModal() {
    const [group, setGroup] = useState({})


    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [domain, setDomain] = useState("")
    const [emailList, setEmailList] = useState(  []);
    const [email, setEmail] = useState([]);

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

    const params = {
        name: groupName,
        description: description,
        domain: domain,
        member: emailList,
        createdBy: "Nurul",
        createdDate: moment().format(),
        status: 0,
    }

    // 1. submit form to create group
    const handleSubmit=(e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${base_url}/group/create`,
            data: params
        })
            .then(function (response) {
                // 2. send invitation email to members
                var count = 0;
                toast.success("Group created successfully")
                if(response){
                    window.location.reload(true);
                    // if (emailList.length > 0) {
                    //     emailList.forEach((email, index) => {
                    //         const emailParams = {
                    //             service_id: "service_nc347wl",
                    //             template_id: "template_a9a7mi9",
                    //             user_id: "VJgY9rNMYrcl4jBgg",
                    //             template_params: {
                    //                 'to_email': email.memberEmail,
                    //                 'reply_to': 'nurulsyfiqah25@gmail.com',
                    //                 'group_name': groupName,
                    //                 'creator': 'nurul',
                    //                 'message': '',
                    //                 'system_name': 'Research Group Management System'
                    //             }
                    //         }
                    //         emailjs.send(emailParams.service_id, emailParams.template_id, emailParams.template_params, emailParams.user_id)
                    //             .then((result) => {
                    //                 if (result.status === 200) {
                    //                     count++;
                    //                     if (count >= emailList.length) {
                    //                         toast.success("Invitation had been sent")
                    //                         window.location.reload(false)
                    //                     }
                    //                 }
                    //             }, (error) => {
                    //                 console.log(error.text);
                    //             });
                    //     })
                    // }
                }

            })
            .catch(function (error) {
                toast.error("Group fail to be created")
                console.log(error)
            })
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-4">
                    <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <h3>Create Your Group</h3>
                        <p>Collaborate closely with a group of people inside your project</p>
                        <label className="form-label" htmlFor="name">Group Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="name" name="name" onChange={groupNameUpdate}/>
                        </div>
                        <label className="form-label"  htmlFor="descrption">Description</label>
                         <div className="input-group mb-3">
                            <textarea className="form-control" id="descrption" name="description" onChange={descriptionUpdate}></textarea>
                        </div>
                        <label className="form-label"  htmlFor="dom ain">Domain</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="domain" name="domain" onChange={domainUpdate}/>
                        </div>
                        <label className="form-label">Invite Members by Email</label>
                        <div className="input-group mb-3">
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
                        <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn_dark">Done</button>
                    </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
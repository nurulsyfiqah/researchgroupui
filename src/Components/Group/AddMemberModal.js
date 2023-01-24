import React, { useState } from 'react';
import {BsXLg} from "react-icons/bs";
import {toast} from "react-toastify";
import _ from "lodash";
import {base_url} from "../../Service/serviceapi";
import axios from "axios";


export default function AddMemberModal({group, change, hide}) {
    const [email, setEmail] = useState([]);
    let [emailList, setEmailList] = useState([]);
    const [invitedMembers, setInvitedMembers] = useState(group.member);
    const [error, setError] = useState("");

    let flag = true;
    const input = group;

    const emailListUpdate = () => {

        if (email.length > 0) {
            if (!_.some(emailList, ['memberEmail', email]) && !_.some(invitedMembers, ['memberEmail', email])) {
                setEmailList([...emailList, {
                    memberEmail:email,
                    status:0,
                    memberId: ""
                }])
            } else {
                setError("Member had been invited")
            }
        } else {
            setError("Email field should not be empty")
        }
        setEmail([])
        if(flag) {
            input.member = group.member;
            flag=false;
        }
        console.log(emailList)
    };

    const emailUpdate = e => {
        setError("")
        setEmail(e.target.value)
    }

    const removeEmail = (index) => {
        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };

    const submitHandler =(e)=>{
        e.preventDefault()
        // combine previous member and additional member
        Array.prototype.push.apply(input.member,emailList);
        

        input.member.forEach(function(item, index) {
            if (item.status === "Not Registered") {
                item.status = 0
            } else if (item.status === "Registered") {
                item.status = 1
            }
        });
        console.log(input)

        const formdata = new FormData();
        formdata.append("group", JSON.stringify(input));
        formdata.append("newMember", JSON.stringify(emailList));
        console.log([...formdata])
        axios({
            method: 'PUT',
            url: `${base_url}/group/update1`,
            data: formdata,
            header: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function(Response) {
                toast.success("Successfully inviting everyone", {autoClose: 1500,hideProgressBar: true});
                hide()
                change()
                //window.location.reload();
            }, (error)=>{
                toast.error(error.text);
                hide()
                //window.location.reload();
            })
    }

    return (
        <div>
            <div className="modal show fade" id="addMemberModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'block', backgroundColor:'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h6 className="modal-title" id="exampleModalLabel">Add members to {group.name}</h6>
                            <label className="form-label">Invite Members by Email</label>
                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" className="form-control" name="email" id="email" value={email} onChange={emailUpdate}/>
                                    <button className="btn btn-outline-dark" type="button" onClick={emailListUpdate}>Add</button>
                                </div>
                            {
                                error !== "" ? <div className="text-danger">{error}</div> : ""
                            }
                                <div className="email_list">
                                    {
                                        emailList.length > 0 ?
                                            emailList.map((email, index) =>(
                                                <div className="row justify-content-between" key={index}>
                                                    <div key={index} className="col-8"> {email.memberEmail} </div>
                                                    <div className="col-2"><div className="float-end" type="button" id={`${index}`} onClick={() => removeEmail(index)}> <BsXLg/> </div></div>
                                                </div>
                                            ))
                                            :
                                            "No added member's email yet"
                                    }
                                </div>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                            <button onClick={submitHandler} className="btn btn-sm btn_dark">Invite</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
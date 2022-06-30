import React, { useState } from 'react';
import {BsXLg} from "react-icons/bs";
import {toast} from "react-toastify";
import base_url from "../../Service/serviceapi";
import axios from "axios";


export default function AddMemberModal({group}) {
    const [email, setEmail] = useState([]);
    const [emailList, setEmailList] = useState([]);
    let flag = true;
    const input = {
        id: group.id,
        name: group.name,
        description: group.description,
        domain: group.domain,
        member: group.member,
        createdBy: group.createdBy,
        createdDate: group.createdDate,
        status: 0,
    }

    const emailListUpdate = () => {
        setEmailList([...emailList, {
            memberEmail:email,
            status:0,
            memberId: ""
        }])
        setEmail([])
        if(flag) {
            input.member = group.member;
            flag=false;
        }
        console.log(emailList)
    };

    const emailUpdate = e => {
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
        console.log(input)

        input.member.forEach(function(item, index) {
            if (item.status === "Not Registered") {
                item.status = 0
            } else if (item.status === "Registered") {
                item.status = 1
            }
        });

        axios({
            method: 'PUT',
            url: `${base_url}/group/update`,
            data: input
        })
            .then(function(Response) {
                toast.success("Successfully inviting everyone");
                window.location.reload();
            }, (error)=>{
                toast.error(error.text);
                //window.location.reload();
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
            <div className="modal fade" id="addMemberModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h6 className="modal-title" id="exampleModalLabel">Add members to {group.name}</h6>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn_dark">Invite</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    )
}
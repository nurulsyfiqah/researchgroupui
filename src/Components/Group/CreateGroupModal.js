    import React, { useState } from 'react';
    import {BsXLg} from "react-icons/bs";
    import {toast} from "react-toastify";
    import {base_url} from "../../Service/serviceapi";
    import axios from "axios";
    import emailjs from '@emailjs/browser';
    import moment from "moment";
    import Picker from 'emoji-picker-react';
    import {ReactSession} from "react-client-session";


    export default function CreateGroupModal({create, hide}) {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    const [name, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const [domain, setDomain] = useState("")
    const [domainList, setDomainList] = useState([])
    const [emailList, setEmailList] = useState([
        {
            memberEmail:account.email,
            memberName: user.firstName + " " + user.lastName,
            status:1,
            memberId: user.id
        }
    ]);
    const [email, setEmail] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState({
        name: "",
    });

    const groupNameUpdate=(e)=>{
        setGroupName(e.target.value);
        validateInput(e);
    }

    const descriptionUpdate=(e)=>{
        setDescription(e.target.value);
    }

    const domainUpdate=(e)=>{
        setDomain(e.target.value);
    }

    const domainListUpdate = () => {
        setDomainList([...domainList, domain])
        setDomain("")
    };

    const removeDomain = (index) => {
        const list = [...domainList];
        list.splice(index, 1);
        setDomainList(list);
    };

    const emailUpdate = e => {
        setEmail(e.target.value)
    }

    const emailListUpdate = () => {
        setEmailList([...emailList, {
            memberEmail:email,
            memberName: "",
            status:0,
            memberId: ""
        }])
        setEmail([])
    };

    const removeEmail = (index) => {
        const list = [...emailList];
        list.splice(index, 1);
        setEmailList(list);
    };

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = {...prev, [name]: ""};
            switch (name) {
                case "name":
                    if (value === "") {
                        stateObj[name] = "Please enter group name";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                default:
                    break;
            }
            return stateObj;
        });
    }

    const params = {
        name: name,
        icon: chosenEmoji != null ? chosenEmoji.emoji : '',
        description: description,
        domain: domainList,
        member: emailList,
        createdById: user.id,
        createdByName: user.firstName  + " " + user.lastName,
        createdDate: moment().format(),
        status: 0,
    }

    // 1. submit form to create group
    const handleSubmit=(e) => {
        e.preventDefault();
        // set group creator as the member
        setEmailList([...emailList], {
            memberEmail:account.email,
            status:1,
            memberId: user.id,
            memberName: ''
        })
        
        params.domain = domainList
        if (flag) {
            axios({
            method: 'POST',
            url: `${base_url}/group/create`,
            data: params,
        })
            .then(function (response)  {
                console.log(response)
                if (response.status === 201) {
                    toast.success("Group created successfully", {autoClose: 1500,hideProgressBar: true})
                } else {
                    toast.error("Group fail to be created", {autoClose: 1500,hideProgressBar: true})
                }
                create()
                hide()
            })
            .catch(function (error) {
                toast.error("Group fail to be created", {autoClose: 1500,hideProgressBar: true})
                console.log(error)
                hide()
            })
        } else {
            toast.error("Please fill in the required", {autoClose: 1500,hideProgressBar: true})
        }
        
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
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
                        <label className="form-label fw-bold my-1" htmlFor="name">Group Icon</label>
                        <Picker native={true} onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%', height: '13em' }} disableSearchBar={false}/>
                        <label className="form-label fw-bold my-1" htmlFor="name">Group Name*</label>
                        <div className="input-group input-group-sm my-1">
                            <input type="text" className="form-control" id="name" name="name" onChange={groupNameUpdate}/>
                        </div>
                        <div className='mb-1'>{error.name && <span className='text-danger'>{error.name}</span>}</div>
                        <label className="form-label fw-bold my-1"  htmlFor="descrption">Description</label>
                            <div className="input-group my-1">
                            <textarea className="form-control" id="descrption" name="description" onChange={descriptionUpdate}></textarea>
                        </div>
                        <label className="form-label fw-bold my-1"  htmlFor="dom ain">Domain</label>
                        <div className="input-group input-group-sm my-1">
                                <input type="text" className="form-control" name="domain" id="email" value={domain} onChange={(e)=>{setDomain(e.target.value)}}/>
                                <button className="btn btn-outline-dark" type="button" onClick={domainListUpdate}>Add</button>
                            </div>
                        <div className="domain_list">
                            {
                                domainList.length > 0 ?
                                    domainList.map((domain, index) =>(
                                        <div className="row justify-content-between" key={index}>
                                            <div key={index} className="col-8"> {domain} </div>
                                            <div className="col-2"><div className="float-end" type="button" id={`${index}`} onClick={() => removeDomain(index)}> <BsXLg/> </div></div>
                                        </div>
                                    ))
                                    :
                                    "No added domain yet"
                            }
                        </div>
                        <label className="form-label fw-bold my-1">Invite Members by Email</label>
                        <div className="input-group input-group-sm my-1">
                            <input type="text" className="form-control" name="email" id="email" value={email} onChange={emailUpdate}/>
                            <button className="btn btn-outline-dark" type="button" onClick={emailListUpdate}>Add</button>
                        </div>
                        <div className="email_list">
                            {
                                emailList?.map((item, index)=>{
                                    if (item.memberEmail !== account.email){
                                        return(
                                            <div className="row justify-content-between" key={index}>
                                                <div key={index} className="col-8"> {item.memberEmail} </div>
                                                <div className="col-2"><div className="float-end" type="button" id={`${index}`} onClick={() => removeEmail(index)}> <BsXLg/> </div></div>
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })
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
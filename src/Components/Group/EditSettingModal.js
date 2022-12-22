import React, {useState, useEffect} from 'react';
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";
import {BsXLg} from "react-icons/bs";

export default function EditSettingModal({group, hide, change}) {
    let [input, setInput] = useState(group);
    const [domainList, setDomainList] = useState(group.domain);
    const [domain, setDomain] = useState("");

    useEffect(() => {
        setInput(group)
    }, [])

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const domainListUpdate = () => {
        setDomainList([...domainList, domain])
        setDomain("")
        console.log(domainList)
    };

    const removeDomain = (index) => {
        const list = [...domainList];
        list.splice(index, 1);
        setDomainList(list);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        input.domain = domainList;
        input.member.forEach(function(item, index) {
            if (item.status === "Not Registered") {
                item.status = 0
            } else if (item.status === "Registered") {
                item.status = 1
            }
        });
        console.log(input)
        axios({
            method: 'PUT',
            url: `${base_url}/group/update`,
            data: input
        }).then(function(response) {
            toast.success("Successfully updated", {autoClose: 1500,hideProgressBar: true})
            change()
            hide()
            //window.location.reload()
        }, (error) => {
            toast.error("Failed to update group", {autoClose: 1500,hideProgressBar: true})
            console.log(error.text)
        })
    }


    return (
            <div className="modal show fade" id="editSettingModal" key={group.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true"  style={{display:'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit {group.name} Group Setting</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="groupNameModal" className="form-label">Name</label>
                            <div className="input-group input-group-sm mb-1">
                                <input className="form-control" id="groupNameModal" onChange={onInputChange} name="name" value={input.name}/>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="descriptionModal" className="form-label">Description</label>
                                <textarea className="form-control" id="descriptionModal" onChange={onInputChange} name="description" value={input.description}/>
                            </div>
                            <label htmlFor="groupDomainModal" className="form-label">Domain</label>
                            <div className="input-group input-group-sm mb-3">
                                <input type="text" className="form-control" name="domain" id="email" value={domain} onChange={(e)=>{setDomain(e.target.value)}}/>
                                <button className="btn btn-outline-dark" type="button" onClick={domainListUpdate}>Add</button>
                            </div>

                            <div className="domain_list">
                                {
                                    domainList.length > 0 ?
                                        domainList.map((dom, index) =>(
                                            <div className="row justify-content-between">
                                                <div key={index} className="col-8"> {dom} </div>
                                                <div className="col-2"><div className="float-end" type="button" id={`${index}`} onClick={() => removeDomain(index)}> <BsXLg/> </div></div>
                                            </div>
                                        ))
                                        :
                                        "No added domain's yet"
                                }
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal"  onClick={hide}>Close</button>
                            <button  onClick={submitHandler} className="btn btn-sm btn_dark">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
import React, {useState, useEffect} from 'react';
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";

export default function EditSettingModal({group, hide}) {
    console.log(group)
    let [input, setInput] = useState(group);

    useEffect(() => {
        setInput(group)
        console.log(input)
    }, [])

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
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
            toast.success("Successfully updated")
            window.location.reload()
        }, (error) => {
            toast.error("Failed to update group")
            console.log(error.text)
        })
    }


    return (
        <form onSubmit={submitHandler}>
            <div className="modal show fade" id="editSettingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true"  style={{display:'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit {input.name} Group Setting</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="groupNameModal" className="form-label">Name</label>
                                <input className="form-control" id="groupNameModal" onChange={onInputChange} name="name" value={input.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionModal" className="form-label">Description</label>
                                <textarea className="form-control" id="descriptionModal" onChange={onInputChange} name="description" value={input.description}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="groupDomainModal" className="form-label">Domain</label>
                                <input className="form-control" id="groupDomainModal" onChange={onInputChange} name="domain" value={input.domain}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  onClick={hide}>Close</button>
                            <button type="submit" className="btn btn_dark">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
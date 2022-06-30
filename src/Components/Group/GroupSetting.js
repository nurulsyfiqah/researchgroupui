import React, {useState, useEffect} from 'react';
import {FaEdit as EditIcon} from "react-icons/fa";
import EditSettingModal from  "./EditSettingModal"
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";
import moment from "moment";
import ui_url from "../../Service/serviceui";

export default function GroupSetting({group}) {

    const [modal, setModal] = useState(false)
    // useEffect(()=>{
    //     console.log(input)
    // },[])

    const onEditInformation = () =>  {
        // setInput(group)
        setModal(true)
    }

    function formatDate1(date) {
        //2022-06-20T11:10:12.000+00:00
        moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        const d = new Date(date)
        return moment(d).format('DD/MM/YYYY')
    }

    const deleteGroup = () => {
        axios({
            method: 'DELETE',
            url: `${base_url}/group/delete/${group.id}`,
            data: group
        })
            .then(function(response){
                toast.success("Successfully deleted")
                window.location.href = `${ui_url}/group/`;
            }, (error) => {
                toast.error("Error in deleting")
            })
    }


    return (
        <div>
            <div className="card my-2">
                <div className="card-header d-flex justify-content-between">
                    <div>Group Information</div>
                    <EditIcon className="icon_dark" data-bs-toggle="modal" data-bs-target="#editSettingModal" onClick={() =>onEditInformation()}/>
                </div>
                <div className="card-body">
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Name</div>
                        <div className="col-md-9">{group.name}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Description</div>
                        <div className="col-md-9">{group.description}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Domain</div>
                        <div className="col-md-9">{group.domain}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Created By</div>
                        <div className="col-md-9">{group.createdBy}</div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Created Date</div>
                        <div className="col-md-9">{ formatDate1(group.createdDate)}</div>
                    </div>
                </div>
            </div>

            <div className="card my-2">
                <div className="card-header">
                    <div>Delete Group</div>
                </div>
                <div className="card-body">
                    <div className="row my-1">
                        <div className="col-md-9 fw-bold">Delete this group</div>
                        <div className="col-md-3 text-md-end">
                            <button type="button" className="btn btn-sm btn-danger"  onClick={() =>deleteGroup()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                modal === true ? <EditSettingModal group={group} hide={()=>setModal(false)} /> : ''
            }

        </div>
    )
}
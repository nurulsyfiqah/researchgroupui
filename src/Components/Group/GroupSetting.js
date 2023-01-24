import React, {useState, useEffect} from 'react';
import {FaEdit as EditIcon} from "react-icons/fa";
import EditSettingModal from  "./EditSettingModal"
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import {toast} from "react-toastify";
import moment from "moment";
import ui_url from "../../Service/serviceui";

export default function GroupSetting({group,change}) {

    const [modal, setModal] = useState(false)
    const [changeState, setChangeState] = useState(0)

    const changeStatus=()=>{
        setChangeState(change + 1)
        change()
    }

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
        <div key={`key_${group.id}`}>
            <div className="card my-2">
                <div className="card-header d-flex justify-content-between">
                    <div>Group Information</div>
                    <EditIcon className="icon_dark" onClick={() =>onEditInformation()}/>
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
                        <div className="col-md-9">
                            {
                                group.domain ? group.domain.map(value => <span className="badge bg-secondary me-1">{value}</span> ) : 'No designated domain'
                            }

                        </div>
                    </div>
                    <div className="row my-1">
                        <div className="col-md-3 fw-bold">Created By</div>
                        <div className="col-md-9">{group.createdByName}</div>
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
                            <button type="button" className="btn btn-sm btn-danger"  data-bs-toggle="modal" data-bs-target="#deleteGroupModal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteGroupModal" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Delete Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirm to delete this group?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() =>deleteGroup()}>DELETE</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                modal === true ? <EditSettingModal group={group} hide={()=>setModal(false)} change={changeStatus} /> : ''
            }

        </div>
    )
}
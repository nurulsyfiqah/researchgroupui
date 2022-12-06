import React, { useState } from "react";
import {BsXLg} from "react-icons/bs";
import {ReactSession} from "react-client-session";
import { toast } from 'react-toastify';
import base_url from "../../Service/serviceapi";
import axios from "axios";
import moment from 'moment';

export default function CreateGrpTrackerModal({data, hide, change, action, group}) {
    const account = ReactSession.get("account");

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    let [subtasks, setSubtasks] = useState([]);
    const [subtask, setSubtask] = useState([]);
    
    const [input, setInput] = useState({
        id: typeof data !== 'undefined' ? data.id : null,
        userId: typeof data !== 'undefined' ? data.userId : account.id,
        title: typeof data !== 'undefined' ? data.title : "",
        type: typeof data !== 'undefined' ? data.type : 'Group',
        groupId: typeof data !== 'undefined' ? data.groupId : "",
        groupName: typeof data !== 'undefined' ? data.groupName : "",
        details: typeof data !== 'undefined' ? data.details : "",
        filePath: typeof data !== 'undefined' ? data.filePath : "",
        subTask: typeof data !== 'undefined' ? data.subTask : "",
        startDate: typeof data !== 'undefined' ? data.startDate : "",
        endDate: typeof data !== 'undefined' ? data.endDate : "",
    });

    const getValue = e => {
        // const {name,value} = e.target;
        const name = e.target.name;
        // const value = e.target.value;
        const value = e.target.type === 'file' ? e.target.files : e.target.value;
        // setInput({ [name]: value });
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(input)
    } 

    const subtasksUpdate = () => {
        if (subtask.length > 0) {
            setSubtasks([...subtasks, subtask])
        } else {
            alert('Please enter a task')
        }
        console.log(subtasks)
        setSubtask([]);
    };

    const subtaskUpdate = e => {
        setSubtask(e.target.value)
    }

    const removeSubtask = (index) => {
        const list = [...subtasks];
        list.splice(index, 1);
        setSubtasks(list);
        console.log(subtasks)
    };

    const submit = () => { 
        input.subTask = subtasks;
        console.log(input)

        if (action === "create") {
            axios({
                method: 'POST',
                url: `${base_url}/tracker/create`,
                data: input,
            }).then(function(response) {
                toast.success("Successfully create the task", {autoClose: 1500,hideProgressBar: true})
                hide();
                change();
            }, (error) => {
                toast.error("Error creating the task", {autoClose: 1500,hideProgressBar: true})
                hide();
            })
        } else if (action === "edit") {
            axios({
                method: 'PUT',
                url: `${base_url}/tracker/update`,
                data: input,
            }).then(function(response) {
                toast.success("Successfully update the task", {autoClose: 1500,hideProgressBar: true})
                hide();
                change();
            }, (error) => {
                toast.error("Error updating the task", {autoClose: 1500,hideProgressBar: true})
                hide();
            })
        }
    }

    const deleteTask = () => {
        axios({
            method: 'DELETE',
            url: `${base_url}/tracker/delete/${input.id}`,
            data: input,
        }).then(function(response) {
            toast.success("Successfully delete the task", {autoClose: 1500,hideProgressBar: true})
            hide();
            change();
        }, (error) => {
            toast.error("Error deleting the task", {autoClose: 1500,hideProgressBar: true})
            hide();
        })
    }

    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{ action === "create" ? "Add Task" : "Edit Task" }</h5>
                <button type="button" class="btn-close" onClick={hide}></button>
            </div>
            <div className="modal-body">
                
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Title</label>
                <input className="form-control" id="title" name="title" onChange={getValue} value={ input.title }/>
            </div>
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Group</label>
                {/* <input className="form-control" id="groupId" name="groupId" onChange={getValue} value={ input.type }/> */}
                <select class="form-select" id="groupId" name="groupId" onChange={getValue}>
                    <option value={input.groupId}>{input.groupName}</option>
                    {
                       typeof group !== 'undefined' ? group.map((item, index) => {
                            return (
                                <option value={item.id}>{item.name}</option>
                            )
                            
                        }) : null
                    }
                </select>
            </div>
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Details</label>
                <textarea className="form-control" id="details" name="details" onChange={getValue} value={ input.details }> </textarea>
            </div> 
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Add attachment</label>
                <input className="form-control" type="file" id="file" name="file" onChange={getValue} valu />
            </div>
            {/* <div className="my-2">
                <label className="fw-bold">Add subtask</label>
                <div className="input-group input-group-sm mb-1">
                    <input type="text" className="form-control" name="subtask" id="subtask" onChange={subtaskUpdate} value={subtask} />
                    <button className="btn btn-outline-dark" type="button" onClick={subtasksUpdate}>Add</button>
                </div> 
            </div>       */}
            {/* <div className="subtask_list">
                {
                    // subtasks.length > 0 ? 
                    // subtasks.map((subtask, index) => {
                    //     <div className="row justify-content-between">
                    //         <div key={index} className="col-8"> {subtask} </div>
                    //         <div className="col-2"><div className="float-end" type="button" onClick={() => removeSubtask(index)}> <BsXLg/> </div></div>
                    //     </div>                
                    // })
                    // :
                    // <div className='small'>No added subtasks yet</div>
                    subtasks.length > 0 ?
                        subtasks.map((task, index) =>(
                            <div className="row justify-content-between">
                                <div key={index} className="col-8"> {task} </div>
                                <div className="col-2"><div className="float-end" type="button" onClick={() => removeSubtask(index)}> <BsXLg/> </div></div>
                            </div>
                        ))
                        :
                                    
                        <div className='small'>No added subtask yet</div>
                }
            </div>  */}
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Start Date</label>
                <input type="date" className="form-control" id="startDate" name="startDate" onChange={getValue} defaultValue={ typeof data !== 'undefined' ? data.startDate != null ? moment(data.startDate).format('YYYY-MM-DD') : ""  : "" }/>
            </div>
            <div className="my-2 input-group-sm">
                <label className="fw-bold">End Date</label>
                <input type="date" className="form-control" id="endDate" name="endDate" onChange={getValue} defaultValue={ typeof data !== 'undefined' ? data.endDate != null ? moment(data.endDate).format('YYYY-MM-DD') : ""  : "" }/>
            </div>

            </div>
            <div className="modal-footer">
                {
                    action === "edit" ? <button type="button" className="btn btn-sm btn-danger me-2" onClick={deleteTask}>Delete</button> : ''
                }
                <button type="button" className="btn btn-sm btn_dark" onClick={submit }>Submit</button>
            </div>
            </div>
        </div>
        </div>
    )
}
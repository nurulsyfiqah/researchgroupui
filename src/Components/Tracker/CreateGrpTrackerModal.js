import React, { useState } from "react";
import {BsXLg} from "react-icons/bs";
import {ReactSession} from "react-client-session";
import { toast } from 'react-toastify';
import {base_url} from "../../Service/serviceapi";
import axios from "axios";
import moment from 'moment';
import { FourGMobiledataOutlined } from "@mui/icons-material";

export default function CreateGrpTrackerModal({data, hide, change, action, group}) {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    let [subtasks, setSubtasks] = useState([]);
    const [subtask, setSubtask] = useState([]);
    const [files, setFiles] = useState([]);
    const [input, setInput] = useState({
        id: typeof data !== 'undefined' ? data.id : null,
        userId: typeof data !== 'undefined' ? data.userId : user.id,
        title: typeof data !== 'undefined' ? data.title : "",
        type: typeof data !== 'undefined' ? data.type : 'Group',
        groupId: typeof data !== 'undefined' ? data.groupId : "",
        groupName: typeof data !== 'undefined' ? data.groupName : "",
        details: typeof data !== 'undefined' ? data.details : "",
        filePath: typeof data !== 'undefined' ? data.filePath :[],
        subTask: typeof data !== 'undefined' ? data.subTask : [],
        startDate: typeof data !== 'undefined' ? data.startDate : "",
        endDate: typeof data !== 'undefined' ? data.endDate : "",
        submissionType: typeof data !== 'undefined' ? data.submissionType : "text"
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

        if (name === 'groupId') {
            const group = e.target.options[e.target.selectedIndex].text;
            setInput(prevState => ({
                ...prevState,
                groupName: group
            }))
        }
    } 

    const getFiles = e => {
        setFiles(e.target.files)
    }

    const subtasksUpdate = () => {
        if (subtask.length > 0) {
            setSubtasks([...subtasks, subtask])
        } else {
            alert('Please enter a task')
        }
        setSubtask([]);
    };

    const subtaskUpdate = e => {
        setSubtask(e.target.value)
    }

    const removeSubtask = (index) => {
        const list = [...subtasks];
        list.splice(index, 1);
        setSubtasks(list);
    };

    const submit = () => { 
        input.subTask = subtasks;
        if (input.submissionType === '') {
            input.submissionType = 'text';
        }

        if (action === "create") {
            const formData = new FormData();
            for(const file of files) {
                formData.append('files', file);
            }
            console.log(files)
            formData.append('tracker', JSON.stringify(input));
            axios({
                method: 'POST',
                url: `${base_url}/tracker/create`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(function(response) {
                
                toast.success("Successfully create the task", {autoClose: 1500,hideProgressBar: true})
                hide();
                change();
            }, (error) => {
                toast.error("Error creating the task", {autoClose: 1500,hideProgressBar: true})
                hide();
            })
        } else if (action === "edit") {
            const formData = new FormData();
            for(const file of files) {
                formData.append('files', file);
            }
            formData.append('tracker', JSON.stringify(input));
            axios({
                method: 'PUT',
                url: `${base_url}/tracker/update`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
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
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle} key={input.id}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{ action === "create" ? "Add Task" : "Edit Task" }</h5>
                <button type="button" className="btn-close" onClick={hide}></button>
            </div>
            <div className="modal-body">
                
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Title</label>
                <input className="form-control" id="title" name="title" onChange={getValue} value={ input.title }/>
            </div>
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Group</label>
                {/* <input className="form-control" id="groupId" name="groupId" onChange={getValue} value={ input.type }/> */}
                <select className="form-select" id="groupId" name="groupId" onChange={getValue}>
                    <option value={input.groupId}>{input.groupName}</option>
                    {
                       typeof group !== 'undefined' ? group.map((item, index) => {
                        if (item.createdById === user.id) {
                            return (
                                <option value={item.id} key={index}>{item.name}</option>
                            )
                        } else {
                            return null;
                        }
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
                <input className="form-control" type="file" id="file" name="file" onChange={getFiles} multiple/>
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
            <div className="my-2 input-group-sm">
                <label className="fw-bold">Type of Submission</label>
                <select className="form-select" name="submissionType" onChange={getValue} defaultValue="text">
                    <option value="text">Text</option>
                    <option value="file">Files (i.e.: .pdf, .jpeg, .png)</option>
                </select>
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
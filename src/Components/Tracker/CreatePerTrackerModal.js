import React, {useState,useEffect} from "react";
import {ReactSession} from "react-client-session";
import { toast } from 'react-toastify';
import {BsXLg} from "react-icons/bs";
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import moment from 'moment';

export default function CreatePerTrackerModal({data, hide, change, action}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    let [input, setInput] = useState({
        id: typeof data !== 'undefined' ? data.id : null,
        userId: typeof data !== 'undefined' ? data.userId : user.id,
        title: typeof data !== 'undefined' ? data.title : "",
        type: typeof data !== 'undefined' ? 'Personal' : 'Personal',
        groupId: typeof data !== 'undefined' ? data.groupId : null,
        details: typeof data !== 'undefined' ? data.details : "",
        filePath: typeof data !== 'undefined' ? data.filePath : [],
        subTask: typeof data !== 'undefined' ? data.subTask : [],
        startDate: typeof data !== 'undefined' ? data.startDate : "",
        endDate: typeof data !== 'undefined' ? data.endDate : "",
    });
    let [subtasks, setSubtasks] = useState([]);
    let [subtasksTemp, setSubtasksTemp] = useState(input.subTask);
    let [subtask, setSubtask] = useState([]);
    let [count, setCount] = useState(0);

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
        console.log(subtask)
        count++;
        if (subtask !== '') {
            // setSubtasks([...subtasks, subtask])
            setSubtasksTemp([...subtasksTemp, subtask])
            // input.subTask = subtasksTemp;            
            // console.log(input.subTask)
        } else {
            alert('Please enter a task')
        }
        
    };

    useEffect(() => {
        input.subTask = subtasksTemp;  
        console.log(input.subTask)
        setSubtask([]);
    }, [subtasksTemp]);

    const subtaskUpdate = e => {
        let task = e.target.value;
        setSubtask(task + ":0")
    }

    const removeSubtask = (index) => {
        // const list = [...subtasks];
        const list2 = [...subtasksTemp];
        // list.splice(index, 1);
        list2.splice(index, 1);
        // setSubtasks(list);
        setSubtasksTemp(list2);
        input.subTask = list2;
    };

    const removeStatus = (index) => {
        const list = [...subtasksTemp];
        list[index] = subtasks[index] + ":0";
        setSubtasksTemp(list);
    }

    function removeAfterColon(str) {
        return str.split(':')[0]
    }

    const submit = () => {  
        // for (let i = 0; i < subtasks.length; i++) {
        //     setSubtasksTemp([...subtasksTemp, subtasks[i] + ":0"])
        // }
        // console.log(subtasks)
        input.subTask = subtasksTemp;
        console.log(input)

        if (action === "create") {
            axios({
                method: 'POST',
                url: `${base_url}/tracker/personal/create`,
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
                <label>Title</label>
                <input className="form-control" id="title" name="title" onChange={getValue} value={ input.title }/>
            </div>
            {/* <div className="my-2">
                <label>Details</label>
                <textarea className="form-control" id="act_details" name="act_details"></textarea>
            </div> */}
            <div className="my-2">
                <label>Add subtask</label>
                <div className="input-group input-group-sm mb-1">
                    <input type="text" className="form-control" name="subtask" id="subtask" onChange={subtaskUpdate} value={subtask.length > 0 ? removeAfterColon(subtask) : ""} />
                    <button className="btn btn-outline-dark" type="button" onClick={subtasksUpdate}>Add</button>
                </div> 
            </div>       
            <div className="subtask_list">
                {
                    input.subTask.length > 0 ?
                        input.subTask.map((task, index) =>(
                            <div className="row justify-content-between" key={`sub_${index}`}>
                                <div key={index} className="col-8"> { removeAfterColon(task) } </div>
                                <div className="col-2"><div className="float-end" type="button" onClick={() => removeSubtask(index)}> <BsXLg/> </div></div>
                            </div>
                        ))
                        :
                                    
                        <div className='small'>No added subtask yet</div>
                }
            </div>
            <div className="my-2 input-group-sm">
                <label>Start Date</label>
                <input type="date" className="form-control" id="startDate" name="startDate" onChange={getValue} defaultValue={ typeof data !== 'undefined' ? data.startDate != null ? moment(data.startDate).format('YYYY-MM-DD') : ""  : "" }/>
            </div>
            <div className="my-2 input-group-sm">
                <label>End Date</label>
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
import React, { useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import {ReactSession} from "react-client-session";
import axios from "axios";
import {base_url} from "../../Service/serviceapi"
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment'
import CreateGrpTrackerModal from "./CreateGrpTrackerModal";
import CreatePerTrackerModal from "./CreatePerTrackerModal";

export default function TrackerList({tracker, change, index}) {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    const [modal, setModal] = useState(false);
    const [personalModal, setPersonalModal] = useState(false);
    const [userGroup, setUserGroup] = useState([]);
    const [data, setData] = useState([]);
    const [subtask, setSubtask] = useState(tracker.subTask)

    const getData = (e) => {
        if (e.target.value === "personal") {
            setPersonalModal(true);
        } else {
            getUserGroup();
            setModal(true)
        }
    }

    const getUserGroup = () => {
        axios.get(`${base_url}/group/member/${user.id}`).then((
            response)=>{
            setUserGroup(response.data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
      });
    
    const removeSubtask = (index) => {
    };

    const handleChkChange = (e) => {
        // Destructuring
        const index = e.target.getAttribute('index');
        const taskid = e.target.getAttribute('taskid');

        let input = {
            id: taskid,
            userId: "",
            title: "",
            type: "",
            groupId: "",
            details: "",
            filePath: [],
            subTask: [],
            startDate: "",
            endDate: "",
        };      
        
        const { value } = e.target;
        

        let newSubtask = [...subtask];
        if (e.target.checked) {
            newSubtask = newSubtask.map(item => {
                if (item.startsWith(value)) {
                    return `${value}:1`;
                }
                return item;
            });
        } else {
            newSubtask = newSubtask.map(item => {
                if (item.startsWith(value)) {
                    return `${value}:0`;
                }
                return item;
            });
        }
        setSubtask(newSubtask);
        input.subTask = newSubtask;

        axios({
            method: 'PUT',
            url: `${base_url}/tracker/personal/update`,
            data: input,
        }).then(function(response) {
            toast.success("Successfully update the task", {autoClose: 1500,hideProgressBar: true})
        }, (error) => {
            toast.error("Error updating the task", {autoClose: 1500,hideProgressBar: true})
        })

      };

    // const account = ReactSession.get("username");
    // const [data, setData] = useState([]);

    // const getDataFromServer = () => {

    //     axios.get(`${base_url}/tracker/all/${user.id}`).then((
    //         response)=>{
    //         setData(response.data)
    //     }, (error)=>{
    //         toast.error("Something went wrong on Server")
    //     })

    // }

    // useEffect(()=>{
    //     getDataFromServer();
    // })
    console.log(tracker.userId + " " + user.id)
    return (
        <div key={`tr_${index}`}>
        { /* Group Tracker */ tracker.type === "Group" || tracker.type === "group" ? 
            <div className="card my-2" key={tracker.id}>
                <div className="card-body">
                    <h5 className="card-title">{ tracker.title }</h5>
                    <h4 className="card-subtitle mb-2"><span className="badge border border-dark text-dark">{ tracker.groupName }</span> </h4>
                    <h6 className="card-subtitle mb-2 text-muted">{ tracker.type } Tracker</h6>
                    <p className="card-text">{ tracker.details }</p>
                    <div>Start Date: { tracker.startDate != null ? moment(tracker.startDate).format('DD/MM/YYYY') : "-"} </div>
                    <div>End Date: { tracker.endDate != null ? moment(tracker.endDate).format('DD/MM/YYYY') : "-"} </div>
                    <div className="d-grid gap-2 d-flex justify-content-end">
                        <button className="btn btn_dark_normal btn-sm me-md-2" type="button"><Link to={`/tracker/${tracker.id}`}>View</Link></button>
                    {
                        user.id === tracker.userId ? 
                        <button className="btn btn-dark btn-sm me-md-2" type="button" onClick={getData} value="group">Edit</button>
                        :
                        ""
                    }
                    </div>
                </div>
            </div>
            : /* Group Tracker End */ /* Personal Tracker */
            <div className="card my-2" key={tracker.id}>
            <div className="card-body">
                <h5 className="card-title">{ tracker.title }</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ tracker.type } Tracker</h6>
                <div className="card-text">
                    <div>{ tracker.details }</div>
                    {/* { Array.isArray(tracker.subTask ) ? tracker.subTask.length : "not array" } */}
                    {
                        Array.isArray(tracker.subTask ) ?
                        tracker.subTask.length > 0 ?
                        tracker.subTask.map((task, index) => {
                            let splitTask = task.split(":");
                            let checkedStatus = splitTask[1] === "1" ? true : "";
                            const isChecked = subtask.find(item => item.startsWith(task))?.endsWith('1');
                            return (
                            <div className="form-check" key={index}>
                                 <input
                                    className="form-check-input"        
                                    type="checkbox"
                                    value={splitTask[0]}
                                    checked={isChecked}
                                    onChange={handleChkChange}
                                    taskid={tracker.id}
                                />
                                <label className={isChecked ? 'text-decoration-line-through' : ''}>{splitTask[0]}</label>
                            </div>
                        )
                        })
                        :
                        "No Subtask"
                        :
                        ""
                    /* Personal Tracker End */}
                </div>
                <div className="mt-2">Start Date: { tracker.startDate != null ? moment(tracker.startDate).format('DD/MM/YYYY') : "-"} </div>
                <div>End Date: { tracker.startDate != null ? moment(tracker.endDate).format('DD/MM/YYYY') : "-"} </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {/* <button className="btn btn_dark_normal btn-sm me-md-2" type="button">View</button> */}
                    <button className="btn btn-dark btn-sm me-md-2" type="button" onClick={getData} value="personal">Edit</button>
                </div>
            </div>
        </div>
        }
        {
        modal === true ? <CreateGrpTrackerModal data={ tracker } hide={()=>setModal(false)} change={change} action="edit" group={userGroup}/> : ''
        }
        {
        personalModal === true ? <CreatePerTrackerModal data={ tracker } hide={()=>setPersonalModal(false)} change={change} action="edit"/> : ''
        }
        
        </div>
    )

}
import React, { useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import {ReactSession} from "react-client-session";
import axios from "axios";
import {base_url} from "../../Service/serviceapi"
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment'
import CreateGrpTrackerModal from "./CreateGrpTrackerModal";
import CreatePerTrackerModal from "./CreatePerTrackerModal";

export default function TrackerList({tracker, change}) {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    const [modal, setModal] = useState(false);
    const [personalModal, setPersonalModal] = useState(false);
    const [userGroup, setUserGroup] = useState([]);
    const [data, setData] = useState([]);

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
            console.log(response.data)
            setUserGroup(response.data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
      });
    
    const [subtask, setSubtask] = useState([])

    const removeSubtask = (index) => {
        // const list = [...subtasks];
        // const list2 = [...subtasksTemp];
        // // list.splice(index, 1);
        // list2.splice(index, 1);
        // // setSubtasks(list);
        // setSubtasksTemp(list2);
        // input.subTask = list2;
    };

    const handleChange = (e) => {
        // Destructuring
        const { value, checked} = e.target;
        const index = e.target.getAttribute('index');
        const taskid = e.target.getAttribute('taskid');
        const subtasks  = e.target.getAttribute('allvalue');
        const subtaskArr = subtasks.split(",");
        console.log(subtaskArr)
        setSubtask(subtaskArr);
        console.log(subtask)
        // setSubtask(task => {
        //     console.log(task)
        //     const modifiedValue = subtasks.split(",");
        //     console.log(modifiedValue);
        //     return modifiedValue;
        // });

        
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
        // console.log(`${value} is ${checked}`);
         
        // Case 1 : The user checks the box

        // if (checked) {
        //     const list = [...subtask];
        //     const str = value.split(':')[0]
        //     list.splice(index, 1, `${str}:1`);
        //     setSubtask(list)
        //     console.log(subtask)
        // }
        // // Case 2  : The user unchecks the box
        // else {
        //     const list = [...subtask];
        //     const str = value.split(':')[0]
        //     list.splice(index, 1, `${str}:0`);
        //     setSubtask(list)
        //     console.log(subtask)
        // }
        // axios({
        //     method: 'PUT',
        //     url: `${base_url}/tracker/updatetask`,
        //     data: input,
        // }).then(function(response) {
        //     toast.success("Successfully update the task", {autoClose: 1500,hideProgressBar: true})
        // }, (error) => {
        //     toast.error("Error updating the task", {autoClose: 1500,hideProgressBar: true})
        // })

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

    return (
        <div key={tracker.id}>
        { /* Group Tracker */ tracker.type === "Group" || tracker.type === "group" ? 
            <div className="card my-2" key={tracker.id}>
                <div className="card-body">
                    <h5 className="card-title">{ tracker.title }</h5>
                    <h4 className="card-subtitle mb-2"><span className="badge border border-dark text-dark">{ tracker.groupName }</span> </h4>
                    <h6 className="card-subtitle mb-2 text-muted">{ tracker.type } Tracker</h6>
                    <p className="card-text">{ tracker.details }</p>
                    <div>Start Date: { tracker.startDate != null ? moment(tracker.startDate).format('DD/MM/YYYY') : "-"} </div>
                    <div>End Date: { tracker.endDate != null ? moment(tracker.endDate).format('DD/MM/YYYY') : "-"} </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={`/tracker/${tracker.id}`}>
                        <button className="btn btn_dark_normal btn-sm me-md-2" type="button">View</button>
                    </Link>
                    <button className="btn btn-dark btn-sm me-md-2" type="button" onClick={getData} value="group">Edit</button>
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
                            return (
                            <div className="form-check" key={index}>
                                <input className="form-check-input" type="checkbox" name="languages" defaultValue={task} defaultChecked={checkedStatus} id={`task_${index}_${splitTask[0]}`} onChange={handleChange} taskid={tracker.id} allvalue={tracker.subTask} index={index}/>
                                <label className="form-check-label" htmlFor={`task_${index}_${splitTask[0]}`}>
                                    {splitTask[0]}
                                </label>
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
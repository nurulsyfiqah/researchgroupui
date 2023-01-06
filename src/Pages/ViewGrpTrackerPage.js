import React, {useEffect, useState, useRef} from "react";
import Sidebar from "../Components/Sidebar";
import MUIDataTable from "mui-datatables";
import {useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { ReactSession } from "react-client-session";
import {toast} from "react-toastify";
import axios from "axios";
import {base_url} from "../Service/serviceapi";
import moment from "moment";
import classNames from "classnames";

export default function ViewGrpTrackerPage() {

    return (
        <div>
            <Sidebar content={<ViewGrpTrackerComponent />} />
        </div>
    )
}

function formatDate(date) {
    //2022-06-20T11:10:12.000+00:00
    moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    const d = new Date(date)
    return moment(d).format('DD/MM/YYYY')
}

function formatDateUTC(date){
    return moment.utc(date,"YYYY-MM-DD\THH:mm:ss\Z").format("DD/MM/YYYY");
}

function getTaskStatus(duedate) {
    // get the current date
    var d1 = new Date();
    d1 = moment(d1).format('YYYY-MM-DD')
    // format the due date
    const d = new Date(duedate)
    var d2 = moment(d).format('YYYY-MM-DD')
    if (d1 > d2) {
        return 'Overdue'
    } else if (d1 <= d2) {
        return 'Ongoing'
    }
}

function ViewGrpTrackerComponent() {
    const user = ReactSession.get("user");
    const { trackerId } = useParams();
    const [tracker, setTracker] = useState({});
    const [submission, setSubmission] = useState({
        text: '',
        file: [],
        submittedTime: '',
        userId: user.id,
        username: user.lastName + " " + user.firstName,
    });
    const [submissionFile, setSubmissionFile] = useState([]);
    const editorRef = useRef(null);
    
    const [group, setGroup] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupSubmissionDetails, setGroupSubmissionDetails] = useState([])

    const [num, setNum] = useState(0)
    const [deno, setDeno] = useState(1)
    const [counter, setCounter] = useState(0)

    const getDataFromServer=()=>{
        // get tracker data
        axios({
            method: 'GET',
            url: `${base_url}/tracker/${trackerId}`,
        }).then((response)=>{
            setTracker(response.data)
            setSubmission(getUserSubmittedDetails(response.data))
            getGroupByTrackerId(response.data.groupId)
            setNum(response.data.submittedDetails.length)

            setGroupSubmissionDetails(response.data.submittedDetails)
        }, (error)=>{
            console.log(error)
        });

    }   

    const getGroupByTrackerId = (trackerId) => {
        // get group data
        axios({
            method: 'GET',
            url: `${base_url}/group/${trackerId}`,
        }).then((response)=>{
            setGroup(response.data)
            setGroupMembers(response.data.member)
            setDeno(response.data.member.length)
        }, (error)=>{
            console.log(error)
        });
    }
    
    const getUserSubmittedDetails = (tracker) => {
        let subDetail = tracker.submittedDetails;
        let obj = subDetail.find(o => o.userId === user.id);
        return obj;
    }

    useEffect(()=>{
        getDataFromServer();
    },[counter])

    // datatable
    const columns = [
        {
            name: "memberEmail",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "memberName",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "submission",
            label: "Submission",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "memberId",
            label: "Member ID",
            options: {
                display: "excluded"
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        selectableRows: 'none',
        selectableRowsHideCheckboxes: true,
    };

    const taskStatusBadgeColour = (data) => {
        if (data === 'Overdue') {
            return classNames('badge', 'bg-danger')
        } else if (data === 'Ongoing') {
            return classNames('badge', 'bg-secondary')
        } else if (data === 'Completed') {
            return classNames('badge', 'bg-success')
        }
    }

    const calculatePercentage = (numerator, denominator) => {
        return Math.round((parseInt(numerator) / parseInt(denominator)) * 100)
    }

    const submitHandler=()=>{
        console.log("button clicked")
        var submissionDetails = editorRef.current ? editorRef.current.getContent() : "";
        submission.text = submissionDetails;
        submission.submittedTime = moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ");
        tracker.submittedDetails = [submission];

        axios({
            method: 'PUT',
            url: `${base_url}/tracker/submittask`,
            data: tracker
        }).then(function (response) {
            toast.success("Submission Successful", {autoClose:1500, hideProgressBar:true})
            setCounter(counter+1)
        }, (error)=>{
            console.log(error)
            toast.error("Submission Failed", {autoClose:1500, hideProgressBar:true})
        })
    }

    const membersSubmissionStat = (groupSubmission) => {
        let data = [];
        groupMembers.map((member) => {
            groupSubmission.map((submission) => {
                if (member.memberId === submission.userId) {
                    let obj = {
                        memberName: member.memberName !== "" ?  member.memberName : "Not registered yet",
                        submission: (submission.text !== "" || submission.file.length !== 0) ? "Submitted" : "Not Submitted",
                        date: formatDateUTC(submission.submittedTime) ,
                        memberId: member.memberId,
                        memberEmail: member.memberEmail
                    }
                    data.push(obj)
                }
                else {
                    let obj = {
                        memberName: member.memberName !== "" ?  member.memberName : "Not registered yet",
                        submission: "Not Submitted",
                        date: "-",
                        memberId: member.memberId,
                        memberEmail: member.memberEmail
                    }
                    data.push(obj)
                }
            })
        })
       
        return data;
    }
    membersSubmissionStat(groupSubmissionDetails);

    return (
        <div className="group_page">
            <h2 className="page_title">{tracker.title}</h2>
            <h4 className="card-subtitle mb-2"><span className="badge border border-dark text-dark">{ tracker.groupName }</span> </h4>
    
            {
                group.createdById === user.id ? 
                <div className="researcher_section">
                <div className="border m-auto p-2">
                    <div><b>Start : </b> {formatDate(tracker.startDate)}</div>
                    <div><b>Due: </b>{formatDate(tracker.endDate)}</div>
                    <div><b>Submission Progress: </b> {num}/{deno} Members completed
                        <div className="progress">
                            <div className="progress-bar" role="progressbar"  style={{width: `${calculatePercentage(num, deno)}%`}}  aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="border mx-auto my-2 p-2">
                    <h5 className="fw-bold">Submission Status</h5>
                    
                    <MUIDataTable
                        title={"Task Submission Status"}
                        data={membersSubmissionStat(groupSubmissionDetails)}
                        columns={columns}
                        options={options}
                    />
                    
                </div>
            </div>
            :
            <div className="member_section">
                <div className="border m-auto p-2">
                    <div><b>Start : </b> {formatDate(tracker.startDate)}</div>
                    <div><b>Due: </b>{formatDate(tracker.endDate)}</div>
                    <h4><span className={`badge ${taskStatusBadgeColour(getTaskStatus(tracker.endDate))}`}>{getTaskStatus(tracker.endDate)}</span></h4>
                    <hr/>
                    
                    {tracker.details}
                    {
                        tracker.filePath ? <div className="mt-3 my-1 fw-bold">File(s)</div> : ''
                    }
                    {
                        tracker.filePath ? 
                        tracker.filePath?.map((file, index) => {
                            return (
                                <a href={file} target="_blank" rel="noreferrer" download={file} key={index}>-- {file}</a>
                            ) 
                        })
                        :
                        "no file"
                    }
                    <hr/>
                    <label htmlFor="submittedDetails" className="form-label fw-bold">Submission Details</label>
                    {
                        tracker.submissionType === 'file' ?
                        <div className="my-3">
                            <input type="file" name="submittedDetails" className="form-control"/>
                        </div>
                        : 
                        <div className="my-1">
                            <Editor
                                    apiKey='x7k4pqsvh2rl4d7d9unpa60781ojvrfvyhzpiqduu29dbfm1'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={ submission.hasOwnProperty('text') ? submission.text : ''}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    }}
                                />
                        </div>
                    }
                </div>
                
                <div className="d-grid  d-md-flex justify-content-md-end my-2">
                    <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Submit</button>
                </div>
            </div>
            }
            
        </div>
    )
    }
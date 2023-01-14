import React, {useEffect, useState, useRef} from "react";
import Sidebar from "../Components/Sidebar";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import classNames from "classnames";
import axios from "axios";
import parse from 'html-react-parser';
import {ToastContainer, toast} from "react-toastify";
import {useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { ReactSession } from "react-client-session";
import {base_url} from "../Service/serviceapi";
import { getFileName } from "../Helper/util/util";
import { FaTrashAlt as TrashIcon } from "react-icons/fa";


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
    const account = ReactSession.get("account");
    const { trackerId } = useParams();
    const [tracker, setTracker] = useState({});
    const [submission, setSubmission] = useState({
        text: '',
        file: [],
        submittedTime: '',
        userId: user.id,
        username: user.lastName + " " + user.firstName,
        email: account.email,
    });
    const [submissionFile, setSubmissionFile] = useState([]);
    const editorRef = useRef(null);
    
    const [group, setGroup] = useState({});
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupSubmissionDetails, setGroupSubmissionDetails] = useState([])
    let [showTextContainer, setShowTextContainer] = useState(false);
    let [showSubmittedText, setShowSubmittedText] = useState(false);
    let [showFileContainer, setShowFileContainer] = useState(false);
    let [showSubmittedFile, setShowSubmittedFile] = useState(false);
    let [files, setFiles] = useState([]);


    const [num, setNum] = useState(0)
    const [deno, setDeno] = useState(1)
    const [counter, setCounter] = useState(0)

    // const history = useHistory();

    const getDataFromServer=()=>{
        // get tracker data
        axios({
            method: 'GET',
            url: `${base_url}/tracker/${trackerId}`,
        }).then((response)=>{
            console.log(response.data)
            setTracker(response.data)
            response.data.submittedTasks !== null ? setSubmission(getUserSubmittedTasks(response.data)) : []
            response.data.submittedTasks !== null ? setNum(response.data.submittedTasks.length) : setNum(0)
            getGroupByTrackerId(response.data.groupId)
            setGroupSubmissionDetails(response.data.submittedTasks)
            setFiles(submission != null ? submission.file : [])
            console.log(files)
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
            setDeno(response.data.member.length - 1)
        }, (error)=>{
            console.log(error)
        });
    }
    
    const getUserSubmittedTasks = (tracker) => {
        let subTasks = tracker.submittedTasks;
        let obj = subTasks.find(o => o.userId === user.id);
        if (tracker.submissionType == "text" && obj.hasOwnProperty("text")) {
            if (obj.text == "" || obj.text == null) {
                setShowTextContainer(true)
                setShowFileContainer(false)
            } else {
                setShowSubmittedText(true)
                setShowSubmittedFile(false)
            }
        } 

        if (tracker.submissionType == "file" && obj.hasOwnProperty("file")) {
            if (obj.file == [] && obj.file == null) {
                setShowFileContainer(true)
                setShowTextContainer(false)
            } else {
                setShowSubmittedFile(true)
                setShowSubmittedText(false)
            }
        }

        console.log(obj)
        console.log(tracker.submissionType == "text" && obj.hasOwnProperty("text"))
        console.log(tracker.submissionType == "file" && obj.hasOwnProperty("file"))
        return obj;
    }

    useEffect(()=>{
        console.log("useEffect")
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

    const handleFileChange = (e) => {
        const files = e.target.files;
        setSubmissionFile(files);
        console.log(files)
    }

    const removeFile=(index) => {
        const data = [...files]; 
        data.splice(index, 1)
        setFiles(data)
    }

    const submitHandler=()=>{
        
        var submissionText = editorRef.current ? editorRef.current.getContent() : "";
        submission.text = submissionText;
        submission.submittedTime = moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ");
        tracker.submittedTasks = [submission];
        let formdata = new FormData();
        formdata.append("trackerId", tracker.id);
        formdata.append("submission", JSON.stringify(submission));
        // formdata.append("file", submissionFile);
        
        if (submissionFile.length > 0) {
            for(const files of submissionFile) {
                formdata.append('files', files);
            }
        } 
        console.log(submissionFile)

        console.log([...formdata])
        axios({
            method: 'POST',
            url: `${base_url}/tracker/submit`,
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
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
        groupMembers?.map((member) => {
            groupSubmission?.map((submission) => {
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

    const editSubmitted = () => {
        if (tracker.submissionType == "text") {
            setShowTextContainer(true)
            setShowSubmittedText(false)
        } 

        if (tracker.submissionType == "file") {
            setShowFileContainer(true)
            setShowSubmittedFile(false)
        }
        // setShowTextContainer(true);
        // setShowSubmittedText(false);
    }

    const cancelEdittingSubmittedText = () => {
        if (tracker.submissionType == "text") {
            setShowTextContainer(false);
            setShowSubmittedText(true);
        } 

        if (tracker.submissionType == "file") {
            setShowFileContainer(false)
            setShowSubmittedFile(true)
            setFiles(submission.file)
        }
        
    }

    membersSubmissionStat(groupSubmissionDetails);
    return (
        <div className="group_page">
            <ToastContainer />
            <div className="d-flex justify-content-between">
                <div>
                    <h2 className="page_title">{tracker.title}</h2>
                    <h4 className="card-subtitle mb-2"><span className="badge border border-dark text-dark">{ tracker.groupName }</span> </h4>
                </div>
                <div className="align-middle">
                    <button type="button" className="btn btn_dark_normal btn-sm" onClick={() => history.back()}>Back</button>
                </div>
            </div>
            
    
            { /* Group Creator Section - able to see the list of submission */
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
            : /* End of Group Creator Section */ /* Member submisssion Section */
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
                    {/* Submission Section */}
                    
                    <label htmlFor="submittedTasks" className="form-label fw-bold">Submission Details</label>
                    <div className="submission_container">
                    {   tracker.submissionType === 'file' ?
                        <div className={`my-3 ${showFileContainer ? "" : "d-none"}`}>
                            <input type="file" name="files" className="form-control my-2" onChange={handleFileChange} multiple/>
                        
                            {/* File list */}
                            { files.length > 0 ? files.map((file, index) => {
                                return (
                                    <div className="d-flex justify-content-between my-2" key={index}>
                                        <div>{getFileName(file)}</div>
                                        <div>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeFile(file)}><TrashIcon/></button>
                                        </div>
                                    </div>
                                )
                            }) : '' 
                    }

                        </div>
                        : 
                        <div className={`my-1 ${showTextContainer ? "" : "d-none"}`}>
                            <Editor
                                    apiKey='x7k4pqsvh2rl4d7d9unpa60781ojvrfvyhzpiqduu29dbfm1'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={ submission !== null ? submission.hasOwnProperty('text') ? submission.text : '' : ''}
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
                   /** End of Member submisssion Section */  }
                   </div>
                   {/* End of Submission Section */}

                   {/* Submitted Task Section */}
                     <div className="submitted_task_container">
                     { tracker.submissionType === 'file' ?
                        <div className={`my-3 ${showSubmittedFile ? "" : "d-none"}`}>
                            { submission !== null ? submission.hasOwnProperty('file') ? submission.file.map((file, index) => {
                                return (
                                    <div>
                                        <a href={file} download>-- {getFileName(file)}</a>
                                    </div>
                                )
                                }) : '' : ''
                             }
                        </div>
                        : 
                        <div className={`my-1 ${showSubmittedText ? "" : "d-none"}`}>
                            <div className="submitted_text">
                                    { submission !== null ? submission.hasOwnProperty('text') ? parse(submission.text) : '' : ''}
                            </div>
                        </div>
                   /** End of Member submisssion Section */  }
                     </div>
                   {/* End of Submitted Task Section */}
                   <div className={`d-flex justify-content-md-end my-2 ${showFileContainer || showTextContainer ? "" : "d-none" }`}  >
                        <button type="button" className={`btn btn-sm btn-secondary me-md-2 ${(submission.text !== null && submission.text !== "") || submission.file !== null ? "" : "d-none"}`} onClick={cancelEdittingSubmittedText}>Cancel</button>
                        <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Submit</button>
                    </div>
                    <div className={`d-flex justify-content-md-end my-2 ${showSubmittedFile || showSubmittedText ? "" : "d-none" }`}>
                        <button type="button" className="btn btn-sm btn_dark" onClick={editSubmitted}>Edit</button>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}
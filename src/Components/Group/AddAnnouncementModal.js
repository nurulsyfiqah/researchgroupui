import React, {useState, useRef} from 'react';
import moment  from "moment";
import {ReactSession} from "react-client-session";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import {toast} from "react-toastify";

export default function AddAnnouncementModal({group, hide, edit}) {
    const account = ReactSession.get("account");
    const user = ReactSession.get("user");
    const editorRef = useRef(null);
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState({
        title: "",
        content: "",
    });

    let [input, setInput] = useState({
        groupId: "",
        title: '',
        content: '',
        createdDate: moment().format(),
        createdById: user.id,
        createdByName: user.lastName + ", " + user.firstName,
        target: '',
        status: 0
    });

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => { 
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = {...prev, [name]: ""};
            switch (name) {
                case "title":
                    if (value === "") {
                        setError(prev => ({...prev, [name]: "Please enter title"}))
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                case "content":
                    if (value === "") {
                        setError(prev => ({...prev, [name]: "Please enter content"}))
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                default:
                    break;
            }
            return stateObj;

        });

        
    }


    const publishAnn=()=>{
        if (flag) {
            input.groupId = group.id;
            input.content = editorRef.current ? editorRef.current.getContent() : "";
            input.status = 1;
            axios({
                method: 'PUT',
                url: `${base_url}/group/announcement/publish`,
                data: input
            })
                .then(function(response){
                    toast.success("Successfully published Announcement", {autoClose: 1500,hideProgressBar: true})
                    edit()
                    hide()
                    //window.location.reload()
                }, (error) => {
                    toast.error("Error in publishing Announcement", {autoClose: 1500,hideProgressBar: true})
                })
        } else {
            toast.error("Please fill in all required fields", {autoClose: 1500,hideProgressBar: true})
        }
        
    }

    const submitHandler=(e)=>{
        if (flag) {
            e.preventDefault();
            input.groupId = group.id;
            input.content = editorRef.current ? editorRef.current.getContent() : "";
            axios({
                method: 'POST',
                url: `${base_url}/group/announcement/create`,
                data: input
            })
                .then(function(response) {
                    // redirect user to edit post page
                    toast.success("Successfully create announcement", {autoClose: 1500,hideProgressBar: true})
                    edit()
                    hide()
                }, (error) => {
                    toast.error("Error in saving", {autoClose: 1500,hideProgressBar: true})
                    console.log(error.text)
                });
        } else {
            toast.error("Please fill in the required field", {autoClose: 1500,hideProgressBar: true})
        }
    }

    return(
            <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create Announcement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="my-1">
                                <label htmlFor="groupNameModal" className="fw-bold form-label">Title</label>
                                <input className="form-control" id="groupNameModal" onChange={onInputChange} name="title" value={input.title}/>
                                <div>{error.title && <span className='text-danger'>{error.title}</span>}</div>
                            </div>
                            <div className="my-1">
                                <label htmlFor="descriptionModal" className="fw-bold form-label">Description</label>
                                <Editor
                                    apiKey='x7k4pqsvh2rl4d7d9unpa60781ojvrfvyhzpiqduu29dbfm1'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue=""
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
                                <div>{error.content && <span className='text-danger'>{error.content}</span>}</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={hide}>Close</button> */}
                            <button type="button" className="btn btn-sm btn-secondary" onClick={submitHandler}>Save</button>
                            <button type="button" className="btn btn-sm btn_dark" onClick={publishAnn}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
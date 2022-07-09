import React, {useState, useRef} from 'react';
import moment  from "moment";
import {ReactSession} from "react-client-session";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";
import base_url from "../../Service/serviceapi";
import {toast} from "react-toastify";

export default function AddAnnouncementModal({group, hide, create}) {
    const account = ReactSession.get("account");
    const editorRef = useRef(null);
    let [input, setInput] = useState({
        groupId: "",
        title: '',
        content: '',
        createdDate: moment().format(),
        createdBy: account.username,
        target: ''
    });

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        input.groupId = group.id;
        input.content = editorRef.current ? editorRef.current.getContent() : "";
        axios({
            method: 'POST',
            url: `${base_url}/group/createannouncement`,
            data: input
        })
            .then(function(response) {
                // redirect user to edit post page
                toast.success("Successfully create announcement", {autoClose: 1500,hideProgressBar: true})
                hide()
                create()
            }, (error) => {
                toast.error("Error in saving", {autoClose: 1500,hideProgressBar: true})
                console.log(error.text)
            });
    }

    return(
            <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered  modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={hide}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="groupNameModal" className="form-label">Title</label>
                                <input className="form-control" id="groupNameModal" onChange={onInputChange} name="title" value={input.title}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionModal" className="form-label">Description</label>
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
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal" onClick={hide}>Close</button>
                            <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
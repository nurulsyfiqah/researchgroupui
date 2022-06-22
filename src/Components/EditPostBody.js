import React, { useRef, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Waiter, useWait } from "react-wait";
import { Editor } from '@tinymce/tinymce-react';
import "../Assets/Styles/component.css"
import moment from "moment";
import axios from "axios";
import base_url from "../Service/serviceapi";
import ui_url from "../Service/serviceui";


export default function EditPostBody() {

    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const { blogId } = useParams();
    const [post, setPost] = useState([]);
    const [input, setInput] = useState({
        id: blogId,
        userId: "",
        title: "",
        date:  moment().format(),
        status: 0,
        content: editorRef.current ? editorRef.current.getContent() : "",
        imagePath: "",
        category: "testing",
        keyword: [],
        commentOption: 0,
    })
    const { startWaiting, endWaiting, isWaiting } = useWait();

    const params = {
        id: blogId,
        userId: "",
        title: "",
        date:  moment().format(),
        status: 0,
        content: editorRef.current ? editorRef.current.getContent() : "",
        imagePath: "",
        category: "testing",
        keyword: [],
        commentOption: 0,
    }

    // get the post section

    useEffect(()=>{
        getPostFromServer()
    })

    const getPostFromServer=()=>{
        axios.get(`${base_url}/blog/edit/${blogId}`).then(response => {
            setPost(response.data)
            setInput(response.data)
            // params.userId = response.data.userId
            // params.title = response.data.title
            // params.date = response.data.date
            // params.status = response.data.status
            // params.content = response.data.content
            // params.imagePath = response.data.imagePath
            // params.category = response.data.category
            // params.keyword = response.data.keyword
            // params.commentOption = response.data.commentOption
            console.log(response.data.content)
            console.log(params)
        }, (error) => console.log(error) )
    }

    // get the pose section end

    // save the post section

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(input);
    }

    // const setPostTitle =(e)=>{
    //     setTitle(e.target.value);
    // }

    const savePost=(e) =>  {
        e.preventDefault();
        startWaiting("Saving")
        if (editorRef.current) {
            params.content =  editorRef.current ? editorRef.current.getContent() : ""
        }
        axios({
            method: 'PUT',
            url: `${base_url}/blog/update`,
            data: params
        })
            .then(function(response) {
                // redirect user to edit post page
                console.log("success"+response.data)
            }, (error) => {
                console.log(error.text)
            });
    }

    // save the post section end

    return (
        <div className="p-3">
            <div className="row title-section mb-2">
                <div className="col-md-8 form-floating mb-3">
                    <input type="text" className="form-control post-title-input" id="title" placeholder="Title" onChange={onInputChange} value={input.title}/>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end">
                    <button type="button" className="btn btn-outline-dark me-2" onClick={ savePost }>Save</button>
                    <button type="button" className="btn btn_dark_normal me-2">Preview</button>
                    <button type="button" className="btn btn_dark">Publish</button>
                </div>
            </div>

            <div className="content-section">
                <Editor
                    apiKey='x7k4pqsvh2rl4d7d9unpa60781ojvrfvyhzpiqduu29dbfm1'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={input.content}
                    init={{
                        height: 500,
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
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </div>
    );
}
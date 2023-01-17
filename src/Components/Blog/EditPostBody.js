import React, { useRef, useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify'
import { ReactSession } from "react-client-session";
import "../../Assets/Styles/component.css"
import moment from "moment";
import axios from "axios";
import {base_url} from "../../Service/serviceapi";
import ui_url from "../../Service/serviceui";


export default function EditPostBody() {
    const account = ReactSession.get("account");
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const { blogId } = useParams();
    const [post, setPost] = useState("");


    // const [input, setInput] = useState({
    //     id: blogId,
    //     userId: account.userId,
    //     title: "",
    //     date:  moment().format(),
    //     status: 0,
    //     content: editorRef.current ? editorRef.current.getContent() : "",
    //     imagePath: "",
    //     category: "testing",
    //     keyword: [],
    //     commentOption: 0,
    // })

    let params = {
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
    },[])

    const getPostFromServer=()=>{
        axios.get(`${base_url}/blog/edit/${blogId}`).then(response => {
            console.log("server "+response.data.content)
            // setInput(response.data)
            params.userId = response.data.userId
            params.title = response.data.title
            setTitle(response.data.title)
            setPost(response.data.content)
            params.date = response.data.date
            params.status = response.data.status
            params.content = response.data.content
            params.imagePath = response.data.imagePath
            params.category = response.data.category
            params.keyword = response.data.keyword
            params.commentOption = response.data.commentOption
        }, (error) => console.log(error) )
    }

    // get the pose section end

    // save the post section
    const setTitleHandler = (e) => {
        // params.title = title
        setTitle(e.target.value)
    }

    // const onInputChange = e => {
    //     const { name, value } = e.target;
    //     setInput(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // }

    const savePost=() =>  {
        //setInput({...input, [input.content]: editorRef.current.getContent()});
        //params = input;
        params.userId = account.id
        params.title = title
        params.content = editorRef.current ? editorRef.current.getContent() : "";
        console.log(params)
        axios({
            method: 'PUT',
            url: `${base_url}/blog/update`,
            data: params
        })
            .then(function(response) {
                // redirect user to edit post page
                toast.success("Successfully saved", {autoClose: 1500,hideProgressBar: true})
                console.log("successfully save"+response.data.toString)
            }, (error) => {
                toast.error("Error in saving", {autoClose: 1500,hideProgressBar: true})
                console.log(error.text)
            });
    }

    // save the post section end

    // publish the post
    const publishPost=()=> {
        savePost()
        params.status = 1;
        axios({
            method: 'PUT',
            url: `${base_url}/blog/update`,
            data: params
        })
            .then(function(response){
                toast.success("Successfully published", {autoClose: 1500,hideProgressBar: true})
            }, (error) => {
                toast.error("Error in publishing", {autoClose: 1500,hideProgressBar: true})
            })

    }

    const previewPost=()=> {
        window.open(
            `${ui_url}/${account.username}/${params.id}`,
            '_blank' // <- This is what makes it open in a new window.
        );
        // window.location.href = `${ui_url}/${account}/${params.id}`;
    }

    return (
        <div className="p-3">
            <ToastContainer autoClose={1000}    />
            <div className="row title-section mb-2">
                <div className="col-md-8 form-floating mb-3">
                    <input type="text" className="form-control post-title-input" id="title" placeholder="Title" name="title" onChange={setTitleHandler} value={title}/>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end">
                    <button className="btn btn-outline-dark me-2" onClick={ savePost }>Save</button>
                    <button className="btn btn_dark_normal me-2" onClick={() =>previewPost()}>Preview</button>
                    <button className="btn btn_dark"  onClick={ publishPost }>Publish</button>
                </div>
            </div>

            <div className="content-section">
                <Editor
                    apiKey='x7k4pqsvh2rl4d7d9unpa60781ojvrfvyhzpiqduu29dbfm1'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={post}
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
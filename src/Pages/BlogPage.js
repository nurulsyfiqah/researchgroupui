import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from "react-client-session";
import Sidebar from "../Components/Sidebar";
import BlogPostsList from "../Components/Blog/BlogPostsList";
import base_url from "../Service/serviceapi"
import ui_url from "../Service/serviceui"
import "../Assets/Styles/component.css"

export default function BlogPage() {
    return (
        <div>
            <Sidebar content={<BlogComponent />} />
        </div>
    )
}

function BlogComponent() {
    const account = ReactSession.get("account");
    const [change, setChange] = useState(0);

    const params = {
        userId: account.id,
        title: "",
        date:  moment().format(),
        status: 0,
        content: "",
        imagePath: "",
        category: "",
        keyword: [],
        commentOption: 0,
    }
    const [posts, setPosts] = useState([]);

    // When user clicks New Post, the data for the post will be sent to db, return post id
    const createPost=(e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${base_url}/blog/create`,
            data: params
        })
            .then(function(response) {
                // redirect user to edit post page
                console.log(response)
                window.location.href = `${ui_url}/blog/edit/${response.data.id}`;
            }, (error) => {
                console.log(error.text)
            });
    }

    const getPostsFromServer=()=>{

        axios.get(`${base_url}/blog/getpostsbyuserid?userId=${account.id}`).then((
            response)=>{
            const data = response.data;
            console.log(data)
            setPosts(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    // get all posts
    useEffect(()=>{
        getPostsFromServer()
    })

    return (
        <div className="">
            <ToastContainer/>
            <h1 className="page_title">Blog</h1>

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-post-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-post" type="button" role="tab" aria-controls="nav-home"
                            aria-selected="true">Post
                    </button>
                    <button className="nav-link" id="nav-comments-tab" data-bs-toggle="tab" data-bs-target="#nav-comments"
                            type="button" role="tab" aria-controls="nav-comments" aria-selected="false">Comments
                    </button>
                    <button className="nav-link" id="nav-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-setting"
                            type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Setting
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-post" role="tabpanel"
                     aria-labelledby="nav-home-tab">
                    <button className="btn btn-sm btn_dark mt-3 mb-2" onClick={ createPost } > <Link to="/blog/create" > New Post</Link></button>
                    {
                        posts.length > 0 ?
                            posts.map((post)=>(
                                <BlogPostsList post={post} change={()=>{setChange(change+1)}}/>
                            ))
                            :
                            ""
                    }
                </div>

                <div className="tab-pane fade" id="nav-comments" role="tabpanel" aria-labelledby="nav-comments-tab">
                    Comments
                </div>

                <div className="tab-pane fade" id="nav-setting" role="tabpanel"
                     aria-labelledby="nav-home-tab">Setting
                </div>

            </div>

        </div>
    )

}
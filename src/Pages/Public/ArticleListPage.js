import React, {useState,useEffect} from 'react';
import Navbar from '../../Components/Website/PublicNavbar'
import ArticleList from '../../Components/Website/Article/ArticleList'
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { ToastContainer, toast } from "react-toastify";
import {base_url} from "../../Service/serviceapi"

export default function ArticleListPage() {
    const researcher_id = ReactSession.get("researcher_id");
    const [posts, setPosts] = useState([]);
    const user = ReactSession.get("user");
    console.log(user);
    const getArticleFromServer=()=>{
        // axios.get(`${base_url}/blog/getpostsbyuserid?userId=${researcher_id}`).then((
        axios.get(`${base_url}/blog/getpostsbyuserid?userId=63b7b81c9ab53d4a60ba7a1b`).then((
            response)=>{
            const data = response.data;
            console.log(data)
            setPosts(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    useEffect(()=>{
        getArticleFromServer();
    },[])

    return (
        <div>
            <Navbar />
            <div className="my-4 mx-4 py-2 px-1">
                <h2 className="page_title">Post</h2>
                <div className='row row-cols-lg-2 row-cols-1 g-4'>
                {
                    posts.length > 0 ?
                        posts.map((p) => (
                            <ArticleList article={p}/>
                        ))
                        :
                        <div class="card"><div class="card-body">There is no post published</div></div>
                }
                </div>
            </div>
        </div>
    )
}
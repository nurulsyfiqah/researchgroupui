import React, {useState,useEffect} from 'react';
import Navbar from '../../Components/Website/PublicNavbar'
import ArticleList from '../../Components/Website/Article/ArticleList'
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { ToastContainer, toast } from "react-toastify";
import {base_url} from "../../Service/serviceapi"
import { useParams } from "react-router-dom";

export default function ArticleListPage() {
    const researcher_id = ReactSession.get("researcher_id");
    const [posts, setPosts] = useState([]);
    const user = ReactSession.get("user");
    const { username } = useParams();

    const getArticleFromServer=(userid)=>{
        axios.get(`${base_url}/blog/${researcher_id}`).then((
        // axios.get(`${base_url}/blog/getpostsbyuserid?userId=63b7b81c9ab53d4a60ba7a1b`).then((
            response)=>{
            const data = response.data;
            setPosts(data)
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const getUserByUsername = () => {
        axios.get(`${base_url}/account/${username}`)
        .then((response) => {
            const data = response.data;
            axios.get(`${base_url}/user/account/${data}`).then((
                response)=>{
                const data = response.data;
                getArticleFromServer(data.id);
            }, (error)=>{
                toast.error("Something went wrong on Server")
            })
        }, (error) => {
            toast.error("Something went wrong on Server")
        })
    }

    useEffect(()=>{
        getUserByUsername();
        // getArticleFromServer();
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
                        <div className="card"><div className="card-body">There is no post published</div></div>
                }
                </div>
            </div>
        </div>
    )
}
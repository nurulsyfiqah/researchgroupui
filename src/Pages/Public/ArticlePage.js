import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import  axios from 'axios';
import Navbar from '../../Components/Website/PublicNavbar'
import Article from '../../Components/Website/Article/ViewArticle'
import base_url from "../../Service/serviceapi"
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

export default function ArticlePage() {

    const postId = useParams()
    console.log(postId)
    const [post, setPost] = useState([])
    console.log("post stat " + (post.length))

    useEffect(()=>{
        getArticleFromServer()
    })

    const getArticleFromServer =()=>{
        axios.get(`${base_url}/${postId.username}/${postId.articleid}`).then((
            response)=>{
            const data = response.data;
            console.log(data)
            setPost(data)
            console.log(post === undefined)
            }, (error)=>{
            console.log(error.text)
            }
        )
    }

    return (
        <div>
            <Navbar />
            {
                post.length === undefined  ? <Article post={post}/> : ""
            }
            <hr />
            <div className="text-center">Share this article</div>
            <div className="d-flex flex-row justify-content-center mb-4">
                <FacebookShareButton
                    url={"https://orcid.org/0000-0001-9624-3506"}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <FacebookIcon size={36} round={true}/>
                </FacebookShareButton>

                <TwitterShareButton
                    url={"https://orcid.org/0000-0001-9624-3506"}
                    quote={post.title}
                    hashtag="#research"
                    className=" m-2"
                >
                    <TwitterIcon size={36} round={true}/>
                </TwitterShareButton>

                <LinkedinShareButton
                    url={"https://orcid.org/0000-0001-9624-3506"}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <LinkedinIcon size={36} round={true}/>
                </LinkedinShareButton>

            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import  axios from 'axios';
import Navbar from '../../Components/Website/PublicNavbar'
import Article from '../../Components/Website/Article/ViewArticle'
import {base_url} from "../../Service/serviceapi"
import { base_url as ui_url } from '../../Service/serviceui';
import { useLocation } from 'react-router-dom';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    TelegramIcon,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

export default function ArticlePage() {

    const postId = useParams()
    const [post, setPost] = useState([])
    const location = useLocation();    

    useEffect(()=>{
        getArticleFromServer()
    })

    const getArticleFromServer =()=>{
        axios.get(`${base_url}/${postId.username}/${postId.articleid}`).then((
            response)=>{
            const data = response.data;
            setPost(data)
            }, (error)=>{
            console.log(error.text)
            }
        )
    }
    console.log(base_url + '/' + post.username + '/' +post.articleid)

    return (
        <div>
            <Navbar />
            {
                post.length === undefined  ? <Article post={post}/> : ""
            }
            <hr />
            <div className="text-center">Share this article</div>
            <div className="d-flex flex-row justify-content-center mb-4">
                <EmailShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <EmailIcon size={36} round={true}/>
                </EmailShareButton>
                <FacebookShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <FacebookIcon size={36} round={true}/>
                </FacebookShareButton>

                <TwitterShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className=" m-2"
                >
                    <TwitterIcon size={36} round={true}/>
                </TwitterShareButton>

                <LinkedinShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <LinkedinIcon size={36} round={true}/>
                </LinkedinShareButton>
                <TelegramShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <TelegramIcon size={36} round={true}/>
                </TelegramShareButton>
                <WhatsappShareButton
                    url={`${ui_url}/${postId.username}/${postId.articleid}`}
                    quote={post.title}
                    hashtag="#research"
                    className="m-2"
                >
                    <WhatsappIcon size={36} round={true}/>
                </WhatsappShareButton>
            </div>
        </div>
    )
}
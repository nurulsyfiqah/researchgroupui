import React, { useState } from "react";
import { IoIosEye as PreviewIcon, IoMdTrash as TrashIcon } from "react-icons/io";
import { MdCancelScheduleSend as UnpublishIcon, MdSend as PublishIcon } from "react-icons/md";
import { BsShareFill as ShareIcon, BsFillChatLeftFill as CommentIcon } from "react-icons/bs";
import { Link } from "react-router-dom"
import {ReactSession} from "react-client-session";
import moment from "moment"
import SharePostModal from './SharePostModal'
import axios from "axios";
import base_url from "../../Service/serviceapi";
import ui_url from "../../Service/serviceui";
import {toast} from "react-toastify";

export default function BlogPostsList({post, change}) {

    const account = ReactSession.get("username");
    console.log(account);
    const [modal, setModal] = useState(false);
    const [tempData, setTempData] = useState([]);

    let params = {
        id: post.id,
        userId: post.userId,
        title: post.title,
        date:  post.date,
        status: post.status,
        content: post.content,
        imagePath: post.imagePath,
        category: post.category,
        keyword: post.keyword,
        commentOption: post.commentOption,
    }

    const getData = () => {
        console.log(post)
        let tempData = post
        setTempData(post)
        return setModal(true)
    }

    function setStatusDesc(status) {
        switch (status){
            case 0:
                return "Draft";
            case 1:
                return "Published";
            default:
                return "Draft";
        }
    }

    function setStatusColour(status) {
        switch (status){
            case 0:
                return "text-danger";
            case 1:
                return "text-success";
            default:
                return "text-danger";
        }
    }

    function formatDate1(date) {
        //2022-06-20T11:10:12.000+00:00
        moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        const d = new Date(date)
        return moment(d).format('Do MMMM YYYY')
    }

    // publish the post
    const publishPost=()=> {
        params.status = 1;
        axios({
            method: 'PUT',
            url: `${base_url}/blog/update`,
            data: params
        })
            .then(function(response){
                toast.success("Successfully published", {autoClose: 1500,hideProgressBar: true})
                change()
                //window.location.reload()
            }, (error) => {
                toast.error("Error in publishing", {autoClose: 1500,hideProgressBar: true})
            })
    }

    //unpublish post
    const unPublishPost=()=> {
        params.status = 0;
        axios({
            method: 'PUT',
            url: `${base_url}/blog/update`,
            data: params
        })
            .then(function(response){
                toast.success("Successfully unpublished", {autoClose: 1500,hideProgressBar: true})
                change()
                //window.location.reload()
            }, (error) => {
                toast.error("Error in unpublishing", {autoClose: 1500,hideProgressBar: true})
            })
    }

    const previewPost=()=> {
        window.open(
            `${ui_url}/${account}/${params.id}`,
            '_blank' // <- This is what makes it open in a new window.
        );
        // window.location.href = `${ui_url}/${account}/${params.id}`;
    }

    const deletePost=()=> {
        axios({
            method: 'DELETE',
            url: `${base_url}/blog/delete/${post.id}`,
            data: params
        })
            .then(function(response){
                toast.success("Successfully deleted", {autoClose: 1500,hideProgressBar: true})
                change()
            }, (error) => {
                toast.error("Error in deleting", {autoClose: 1500,hideProgressBar: true})
            })
    }

    return (
        <div className="card mt-2">
            <div className="card-body d-flex justify-content-between">
                <div className="d-flex flex-column">
                    <h5>  <Link className="stretched-link" to={`/blog/edit/${post.id}`}> {post.title.length > 0 ? post.title : "{Untitled}"}</Link></h5>
                    <div> <span className={setStatusColour(post.status)}> {setStatusDesc(post.status)}</span>   {formatDate1(post.date)} </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-row">
                        <div className="blog-icon"> { post.status === 0 ? <PublishIcon onClick={() =>publishPost()} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Publish the Post" /> : <UnpublishIcon onClick={() => unPublishPost()} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Unpublish the Post" /> }  </div>
                        <div className="blog-icon" onClick={() =>previewPost()}><PreviewIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Preview the Post"  /> </div>
                        <div className="blog-icon" onClick={() =>deletePost()}><TrashIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete the Post"  /> </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <div className={`blog-icon-small ${post.status === 0 ? "d-none" : ""} `}  onClick={() =>getData()} ><ShareIcon data-bs-toggle="tooltip" data-bs-placement="bottom" title="Share the Post" /> </div>
                        <div className={`display-icon-small ${post.status === 0 ? "d-none" : ""} `} > 0 <CommentIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Number of Comments"  /> </div>

                    </div>
                </div>
            </div>
            {
                modal === true ? <SharePostModal post={post} hide={()=>setModal(false)}/> : ''
            }
        </div>
    );

}
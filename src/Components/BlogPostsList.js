import React from "react";
import {IoIosEye as PreviewIcon, IoMdSend as PublishIcon, IoMdTrash as TrashIcon} from "react-icons/io";
import { BsShareFill as ShareIcon, BsFillChatLeftFill as CommentIcon } from "react-icons/bs";
import {Link} from "react-router-dom"
import moment from "moment"

export default function BlogPostsList({post}) {

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
        return moment(d).format('do MMMM YYYY')
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
                        <div className="blog-icon"><PublishIcon data-bs-toggle="tooltip" data-bs-placement="bottom" title="Publish the Post" /> </div>
                        <div className="blog-icon"><PreviewIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Preview the Post"  /> </div>
                        <div className="blog-icon"><TrashIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete the Post"  /> </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <div className="blog-icon-small"><ShareIcon data-bs-toggle="tooltip" data-bs-placement="bottom" title="Share the Post" /> </div>
                        <div className="display-icon-small"> 0 <CommentIcon  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Number of Comments"  /> </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
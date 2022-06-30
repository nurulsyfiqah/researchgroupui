import React from 'react';
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import ui_url from "../../Service/serviceui"

export default function SharePostModal({post, hide}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    return (
        <div className="modal show fade" id={post.id} data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Share {post.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        Choose where you want to share your article with:
                        <div className="d-flex flex-row justify-content-center">
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
                </div>
            </div>
        </div>
    )
}
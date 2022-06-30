import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { FaGlobeAmericas as WebsiteIcon, FaEdit as EditIcon} from "react-icons/fa";
import ui_url from '../../Service/serviceui';
import { TwitterIcon } from "react-share";
import Placeholder from '../../Assets/Images/image-placeholder.jpg'
import { SocialIcon } from 'react-social-icons';

export default function Home() {

    const account = ReactSession.get("account");

    return(
        <div className="row my-4">

            <div className="col-md-4 mt-4">
                <div className="card my-2" style={{height: 200, width: "auto", overflow: "hidden"}}>
                    <div className="card-header d-flex justify-content-between">
                        <div>Image</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <img src={Placeholder} className="img-fluid mx-auto d-block" alt="placeholder"/>
                </div>

                <div className="card my-2">
                    <div className="card-body text-center">
                        <WebsiteIcon className="icon_dark h3"/>
                        <div className="text-bold">Preview Website</div>
                        <Link target="_blank" to={`/${account.username}`}> { `${ui_url}/${account.username}` } </Link>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Social Links</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <div className="card-body">
                        <div className="my-1">
                            <SocialIcon url="https://linkedin.com"  network="linkedin" target="_blank" style={{ height: 35, width: 35 }}/>
                            <span className="ms-3"><Link to="https://linkedin" target="_blank"> linkedin.com</Link></span>
                        </div>
                        <div className="my-1">
                            <SocialIcon url="https://facebook.com"  network="facebook" target="_blank" style={{ height: 35, width: 35 }}/>
                            <span className="ms-3"><Link to="https://facebook" target="_blank"> facebook.com</Link></span>
                        </div>
                        <div className="my-1">
                            <SocialIcon url="https://twitter.com"  network="twitter" target="_blank" style={{ height: 35, width: 35 }}/>
                            <span className="ms-3"><Link to="https://twitter" target="_blank"> twitter.com</Link></span>
                        </div>
                        <div className="my-1">
                            <SocialIcon url="https://github.com"  network="github" target="_blank" style={{ height: 35, width: 35 }}/>
                            <span className="ms-3"><Link to="https://github" target="_blank"> github.com</Link></span>
                        </div>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Domain</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <div className="card-body">
                        <h5>
                            <span className="badge bg-secondary m-1">Software Engineering</span>
                            <span className="badge bg-secondary m-1">Web Programming</span>
                            <span className="badge bg-secondary m-1">Java</span>
                            <span className="badge bg-secondary m-1">Database</span>
                        </h5>
                    </div>
                </div>
            </div>

            <div className="col-md-8 mt-4">
                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Personal Information</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <div className="card-body">
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Username</div>
                            <div className="col-md-9">Nurul</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Published Name</div>
                            <div className="col-md-9">Nurul Syfiqah</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">First Name</div>
                            <div className="col-md-9">Nurul</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Last Name</div>
                            <div className="col-md-9">Syfiqah</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Email</div>
                            <div className="col-md-9">nurulsyfiqah25@gmail.com</div>
                        </div>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>About</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <div className="card-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae dolor enim. Ut nec nunc lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce molestie, leo at luctus mattis, magna sapien placerat ipsum, eu accumsan lorem velit sed ligula. Nam vitae varius lectus. Vivamus aliquet erat lacus. Donec porttitor imperdiet sapien sed pharetra. Sed posuere at mi nec congue.
                    </div>
                </div>

                <div className="card my-2">
                    <div className="card-header d-flex justify-content-between">
                        <div>Affiliation</div>
                        <EditIcon className="icon_dark"/>
                    </div>
                    <div className="card-body">
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Institution</div>
                            <div className="col-md-9">University of Malaya</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Department</div>
                            <div className="col-md-9">Software Engineering</div>
                        </div>
                        <div className="row my-1">
                            <div className="col-md-3 fw-bold">Position</div>
                            <div className="col-md-9">Student</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
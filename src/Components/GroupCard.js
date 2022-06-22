import React from 'react';
import { BsChatText } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function GroupCard({group}) {
    return (
        <div className="col d-flex align-items-stretch">
            <div className="card w-100 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="circle_placeholder"> <div className="group_icon"> < BsChatText /> </div></div>
                    <h5 className="card-title d-inline-block"> <Link className=" stretched-link" to={`${group.id}`} >{group.name} </Link>  </h5>
                    <div className="card-text"> {group.member != null ? group.member.length : 0} members </div>
                </div>
            </div>
        </div>
    )
}

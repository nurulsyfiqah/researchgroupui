import React from 'react';
import { Link } from "react-router-dom";

export default function GroupCard({group}) {
    return (
        <div className="col d-flex align-items-stretch">
            <div className="card w-100 text-center">
                <div className="card-body card-body-light d-flex flex-column justify-content-center align-items-center">
                    <div className="circle"> <span className=""> { group.icon != "" ? group.icon : ""}  </span></div>
                    <h5 className="card-title d-inline-block"> <Link className=" stretched-link" to={`${group.id}`} >{group.name} </Link>  </h5>
                    <div className="card-text"> {group.member != null ? group.member.length : 0} members </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function CreateGroupCard() {
    return (
        <div className="col d-flex align-items-stretch">
            <div className="card w-100 text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h1 className="card-subtitle mb-2 icon_enlarge" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> < BsFillPlusCircleFill /> </h1>
                    <div>Create Group</div>
                </div>
            </div>
        </div>
    )
}

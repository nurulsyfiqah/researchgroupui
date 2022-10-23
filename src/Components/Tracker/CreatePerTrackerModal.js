import React from "react";
import { BsFillCalendarEventFill as CalendarIcon } from "react-icons/bs";

export default function CreatePerTrackerModal({create, hide}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    
    return (
        <div className="modal show fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add Task </h5>
            </div>
            <div className="modal-body">
                
            <div className="my-2 input-group-sm">
                <label>Title</label>
                <input className="form-control" id="act_title" name="act_title"/>
            </div>
            {/* <div className="my-2">
                <label>Details</label>
                <textarea className="form-control" id="act_details" name="act_details"></textarea>
            </div> */}
            <div className="my-2">
                <label>Add subtask</label>
                <div className="input-group input-group-sm mb-1">
                    <input type="text" className="form-control" name="task" id="task" value="" />
                    <button className="btn btn-outline-dark" type="button">Add</button>
                </div> 
            </div>       
            <div className="my-2 input-group-sm">
                <label>Start Date</label>
                <input type="date" className="form-control" id="date"/>
            </div>
            <div className="my-2 input-group-sm">
                <label>End Date</label>
                <input type="date" className="form-control" id="date"/>
            </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-sm btn-secondary me-2" onClick={hide}>Close</button>
                <button type="button" className="btn btn-sm btn_dark">Add</button>
            </div>
            </div>
        </div>
        </div>
    )
}
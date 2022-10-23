import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function TrackerList({tracker, change}) {

    return (
        <div>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">Activity 1</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Group Tracker</h6>
                    <p className="card-text">As discussed in the tutorial slot, we should survey similar systems and identify possible improvements or innovations. This step can help us to identify suitable software tools too. In addition, we can begin searching for suitable datasets for the assignment and try to make use of our passport photo.</p>
                    <div>Start Date: 26th June 2022</div>
                    <div>End Date: 26th July 2022</div>
                    <div>Number of Member Completed: 0/5</div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to="/tracker/1234">
                        <button className="btn btn_dark_normal btn-sm me-md-2" type="button">View</button>
                    </Link>
                    </div>
                </div>
            </div>

            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">Activity 2</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Personal Tracker</h6>
                    <div className="card-text">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked/>
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Sub Activity 1
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                                <label className="form-check-label" htmlFor="defaultCheck2">
                                    Sub Activity 2
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Sub Activity 3
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                Sub Activity 4
                            </label>
                        </div>
                    </div>
                    <div className="mt-2">Start Date: 26th June 2022</div>
                    <div>End Date: 26th July 2022</div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn_dark_normal btn-sm me-md-2" type="button">View</button>
                        <button className="btn btn-dark btn-sm me-md-2" type="button">Edit</button>
                    </div>
                </div>
            </div>

        </div>
    )

}
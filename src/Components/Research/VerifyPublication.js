import React from 'react';

export default function VerifyPublication() {
    return(
        <div>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">Searched Research 1</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional
                        content.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-secondary btn-sm me-md-2" type="button">Cancel</button>
                        <button className="btn btn-outline-dark btn-sm me-md-2" type="button">View</button>
                        <button className="btn btn_dark_normal btn-sm" type="button">Verify</button>
                    </div>
                </div>
            </div>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">Searched Research 2</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional
                        content.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-secondary btn-sm me-md-2" type="button">Cancel</button>
                        <button className="btn btn-outline-dark btn-sm me-md-2" type="button">View</button>
                        <button className="btn btn_dark_normal btn-sm" type="button">Verify</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
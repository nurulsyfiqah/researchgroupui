import React from 'react';

export default function Research() {
    return (
        <div className="my-4 pt-2">
            <h2 className="page_title">Research</h2>

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">List
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Manual
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Verify
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                     aria-labelledby="pills-home-tab">

                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 1</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                        </div>
                    </div>
                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 2</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                        </div>
                    </div>
                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 3</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                        </div>
                    </div>

                </div>

                <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                     aria-labelledby="pills-profile-tab">
                    <label>Choose the type of research item</label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Article</option>
                        <option value="1">Article</option>
                        <option value="2">Conference Paper</option>
                        <option value="3">Data</option>
                        <option value="1">Research</option>
                        <option value="2">Presentation</option>
                        <option value="3">Poster</option>
                        <option value="3">Preprint</option>
                    </select>
                    <div className="card mt-3">
                        <div className="card-body p-2" style={{height: '25em'}}>
                            <div className="border d-flex align-items-center justify-content-center h-100">
                                Add your Article here
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
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
            </div>



        </div>
    )
}
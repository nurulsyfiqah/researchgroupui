import React from 'react';
import ResearchList from './ResearchList';
import AddPublication from './AddPublication';
import VerifyPublication from './VerifyPublication';


export default function Research() {
    return (
        <div className="my-4 py-2">
            <h2 className="page_title">Research</h2>

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Research
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-add-research" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Add
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
                    <ResearchList/>
                </div>

                <div className="tab-pane fade add_research_container" id="pills-add-research" role="tabpanel"
                     aria-labelledby="pills-profile-tab">
                    <AddPublication/>
                </div>

                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <VerifyPublication/>
                </div>
            </div>
            
        </div>
    )
}
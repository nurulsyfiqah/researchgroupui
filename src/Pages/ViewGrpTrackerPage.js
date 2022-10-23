import React from "react";
import Sidebar from "../Components/Sidebar";
import MUIDataTable from "mui-datatables";

export default function ViewGrpTrackerPage() {

    return (
        <div>
            <Sidebar content={<ViewGrpTrackerComponent />} />
        </div>
    )

    function ViewGrpTrackerComponent() {

    // datatable
    const columns = [
        {
            name: "memberName",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "submission",
            label: "Submission",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "memberId",
            label: "Member ID",
            options: {
                display: "excluded"
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
    };


    return (
        <div className="group_page">
            <h2 className="page_title">Group Tracker Title</h2>
            Researcher's View
            <div className="researcher_section">
                <div className="border m-auto p-2">
                    <div><b>Created on: </b> Monday, 17 October 2022, 12:00 AM</div>
                    <div><b>Due: </b>Tuesday, 25 October 2022, 12:00 AM</div>
                    <div><b>Submission Progress: </b> 1/4 Members completed
                    <div className="progress">
                        <div className="progress-bar" role="progressbar"  style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-3">
                            <b>Submission Progress: </b>
                        </div>
                        <div className="col-md-9">
                            <div className="progress mt-1">
                                <div className="progress-bar" role="progressbar"  style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div> */}
                    <hr/>
                    As discussed in the tutorial slot, we should survey similar systems and identify possible improvements or innovations. This step can help us to identify suitable software tools too. In addition, we can begin searching for suitable datasets for the assignment and try to make use of our passport photo.
                </div>

                <div className="border mx-auto my-2 p-2">
                    <h5 className="fw-bold">Submission Status</h5>
                    
                    <MUIDataTable
                        title={"Member List"}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>

            Member's View
            <div className="member_section">
                <div className="border m-auto p-2">
                    <div><b>Created on: </b> Monday, 17 October 2022, 12:00 AM</div>
                    <div><b>Due: </b>Tuesday, 25 October 2022, 12:00 AM</div>
                    <h5><span class="badge bg-secondary">Ongoing</span></h5>
                    <hr/>
                    As discussed in the tutorial slot, we should survey similar systems and identify possible improvements or innovations. This step can help us to identify suitable software tools too. In addition, we can begin searching for suitable datasets for the assignment and try to make use of our passport photo.
                    <div className="my-3">
                        <input type="file" class="form-control" id="inputGroupFile02"/>
                    </div>
                </div>

            </div>
        </div>
    )
    }
}
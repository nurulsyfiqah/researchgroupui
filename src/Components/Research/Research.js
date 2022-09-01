import React from 'react';
import Select from 'react-select'

const publicationList = [
    { value: 'Article', label: 'Article' },
    { value: 'Book', label: 'Book' },
    { value: 'Chapter', label: 'Chapter' },
    { value: 'Code', label: 'Code' },
    { value: 'Conference Paper', label: 'Conference Paper' },
    { value: 'Cover Page', label: 'Cover Page' },
    { value: 'Data', label: 'Data' },
    { value: 'Experiment Findings', label: 'Experiment Findings' },
    { value: 'Method', label: 'Method' },
    { value: 'Negative Results', label: 'Negative Results' },
    { value: 'Patent', label: 'Patent' },
    { value: 'Poster', label: 'Poster' },
    { value: 'Preprint', label: 'Preprint' },
    { value: 'Presentation', label: 'Presentation' },
    { value: 'Raw Data', label: 'Raw Data' },
    { value: 'Research Proposal', label: 'Research Proposal' },
    { value: 'Technical Report', label: 'Technical Report' },
    { value: 'Thesis', label: 'Thesis' },
    { value: 'Research', label: 'Research' },
  ]

function daysListSelect() {
    var today = new Date();
    var currentDay = today.getDate();
    const days = Array.from({length: 31}, (_, i) => i + 1)

    return (
        <select class="form-select" aria-label="Default select example">
            <option value="">Day(Optional)</option>
            {days.map(day => {
                if (day === currentDay) {
                    return <option key={day} value={day} selected>{day}</option>
                } else {
                    return <option key={day} value={day}>{day}</option>
                }
            })}
        </select>
    )
}

function monthsListSelect() {
    var currentMonth = new Date().getMonth() + 1;
    const months = Array.from({length: 12}, (_, i) => i + 1)

    return (
        <select class="form-select" aria-label="Default select example">
            <option value="">Month(Optional)</option>
            {months.map(month => {
                if (month === currentMonth) {
                    return <option key={month} value={month} selected>{month}</option>
                } else {
                    return <option key={month} value={month}>{month}</option>
                }
            })}
        </select>
        
    )
}

function yearsListSelect() {
    var currentYear = new Date().getFullYear();
    var startYear = currentYear - 88;
    const years = Array.from({length: 92}, (_, i) => i + startYear)

    return (
        <select class="form-select" aria-label="Default select example">
            <option value="">Year(Required)</option>
            {years.reverse().map(year => {
                if (year === currentYear) {
                    return <option key={year} value={year} selected>{year}</option>
                } else {
                    return <option key={year} value={year}>{year}</option>
                }
            })}
        </select>
        
    )
}

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

                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 1</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn_dark_normal btn-sm" type="button">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 2</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn_dark_normal btn-sm" type="button">Edit</button>
                            </div>
                        </div>
                    </div>
                    <div className="card my-1" >
                        <div className="card-body">
                            <h5 className="card-title">Research Title 3</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Domain</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="card-link">PDF</a>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn_dark_normal btn-sm" type="button">Edit</button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="tab-pane fade add_research_container" id="pills-add-research" role="tabpanel"
                     aria-labelledby="pills-profile-tab">
                    <div className='add-step-one-publication'>
                        <label className="my-1">Type of publication</label>
                        <Select options={publicationList} />

                        <label className="my-1">Title</label>
                        <input class="form-control my-1" id="title" />

                        <label className="my-1">File</label>
                        <div className="card my-1">
                            <div className="card-body p-2" style={{height: '5em'}}>
                                <div className="border d-flex align-items-center justify-content-center h-100">
                                    Add your Publication here
                                </div>
                            </div>
                        </div>

                        <label className="my-1">Additional File</label>
                        <input class="form-control" type="file" id="add_file" />

                        <label className="my-1">Description</label>
                        <textarea class="form-control" rows="2"></textarea>

                        <label className="my-1">Authors</label>
                        <div className="input-group input-group-sm my-1">
                            <input type="text" className="form-control" name="author" id="author" value=""/>
                            <button className="btn btn-outline-dark" type="button">Add</button>
                        </div>

                        <label className="my-1">Date</label>
                        <div class="input-group my-1">
                            { daysListSelect() }
                            { monthsListSelect() }
                            { yearsListSelect() }
                            
                        </div>

                        <label className="my-1">DOI (Optional)</label>
                        <input class="form-control my-1" id="doi" />

                        <div class="d-grid gap-2 my-3 d-md-flex justify-content-md-end">
                            <button className="btn btn_dark_normal btn-sm" type="button">Upload</button>
                        </div>
                    </div>
                    
                    <div className='add-step-two-details'>
                        <h5 className="my-1">Add Details</h5>
                        {  /** Article */ }
                        <label className="my-1">Abstract</label>
                        <textarea class="form-control" rows="5"></textarea>

                        <label className="my-1">Peer-review Status</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label class="form-check-label" for="flexRadioDefault2">
                                No
                            </label>
                        </div>

                        <label className="my-1">Journal Name</label>
                        <input class="form-control my-1" id="name" />

                        <label className="my-1">Volume</label>
                        <input class="form-control my-1" id="volune" />

                        <label className="my-1">Issue</label>
                        <input class="form-control my-1" id="issue" />

                        <label className="my-1">Page</label>
                        <input class="form-control my-1" id="page" />

                        <label className="my-1">DOI</label>
                        <input class="form-control my-1" id="doi" />
                        {  /** Article End */ }

                        {  /** Book */ }
                        <label className="my-1">Abstract</label>
                        <textarea class="form-control" rows="5"></textarea>
                        
                        <label className="my-1">DOI</label>
                        <input class="form-control my-1" id="doi" />

                        <label className="my-1">ISBN</label>
                        <input class="form-control my-1" id="isbn" />

                        <label className="my-1">Publisher</label>
                        <input class="form-control my-1" id="publisher" />
                        {  /** Book End */ }

                        {  /** Chapter */ }
                        <label className="my-1">Abstract</label>
                        <textarea class="form-control" rows="5"></textarea>
                        
                        <label className="my-1">Book Title</label>
                        <input class="form-control my-1" id="book_title" />

                        <label className="my-1">Page</label>
                        <input class="form-control my-1" id="page" />

                        <label className="my-1">DOI</label>
                        <input class="form-control my-1" id="doi" />

                        <label className="my-1">ISBN</label>
                        <input class="form-control my-1" id="isbn" />

                        <label className="my-1">Publisher</label>
                        <input class="form-control my-1" id="publisher" />
                        {  /** Chapter End */ }

                        {  /** Code */ }
                        <label className="my-1">Description</label>
                        <textarea class="form-control" rows="5"></textarea>

                        <label className="my-1">DOI</label>
                        <input class="form-control my-1" id="doi" />

                        <label className="my-1">Repository Link</label>
                        <input class="form-control my-1" id="link" />

                        <label className="my-1">Language</label>
                        <input class="form-control my-1" id="language" />

                        <label className="my-1">Related Publication</label>
                        <input class="form-control my-1" id="rel_publication" />
                        {  /** Code End */ }
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
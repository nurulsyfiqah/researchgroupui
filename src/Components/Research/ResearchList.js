import react from 'react';
 
export default function ResearchList() { 
    return(
        <div>
            <div className="card my-1" >
                <div className="card-body">
                    <h5 className="card-title">Research Title 0</h5>
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
    )
}
import React from 'react';

export default function PublicationList({publication}) {

    const previewPub=(e)=> {
        console.log(e.target.value);
        window.open(
            e.target.value,
            '_blank' // <- This is what makes it open in a new window.
        );
        // window.location.href = e.target.value;
    }

    return(
        <div>
            <div className="card my-1" >
                <div className="card-body">
                    <h5 className="card-title">{ publication.title!=null ? publication.title : "No Title" }</h5>
                    <p className="card-text"> 
                        <div> { publication.author } </div>
                        <div> { publication.journal } </div>
                        <div className="text-clamping"> { publication.description } </div>
                    </p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn_dark_normal btn-sm" type="button" value={ publication.link } onClick={previewPub}>View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
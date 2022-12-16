import React, { useState } from 'react';
import axios from "axios";
import {BsXLg} from "react-icons/bs";
import base_url from "../../Service/serviceapi";
import { toast } from 'react-toastify';
import { ChangeCircle } from '@mui/icons-material';

export default function EditPublicationModal({publication, hide, change}) {

    let [authorList, setAuthorList] = useState( publication.hasOwnProperty("authors")  ? publication.authors.split(","): []);
    const [author, setAuthor] = useState([]);

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

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

    const getValue = e => {
        // const {name,value} = e.target;
        const name = e.target.name;
        // const value = e.target.value;
        const value = e.target.type === 'file' ? e.target.files : e.target.value;
        // setInput({ [name]: value });
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(input)
    } 

    const [input, setInput] = useState({
        id: publication.hasOwnProperty("id") ? publication.id : '',
        userId: publication.hasOwnProperty("userId") ? publication.userId: '',
        type: publication.hasOwnProperty("type") ? publication.type: '',
        title: publication.hasOwnProperty("title") ? publication.title : '',
        authors:publication.hasOwnProperty("authors") ? publication.authors : '',
        abstract:publication.hasOwnProperty("pubAbstract") ? publication.pubAbstract : '',
        day:publication.hasOwnProperty("day") ? publication.day : '',
        month:publication.hasOwnProperty("month") ? publication.month : '',
        year:publication.hasOwnProperty("year") ? publication.year : '',
        journal:publication.hasOwnProperty("journal") ? publication.journal : '',
        value:publication.hasOwnProperty("value") ? publication.value : '',
        issue:publication.hasOwnProperty("issue") ? publication.issue : '',
        book:publication.hasOwnProperty("book") ? publication.book : '',
        page:publication.hasOwnProperty("page") ? publication.page : '',
        conferenceTitle:publication.hasOwnProperty("conferenceTitle") ? '' : '',
        doi:publication.hasOwnProperty("doi") ? publication.doi : '',
        location:publication.hasOwnProperty("location") ? publication.location : '',
        description:publication.hasOwnProperty("description") ? publication.description : '',
        relPublication:publication.hasOwnProperty("relPublication") ? publication.relPublication : '',
        refNo:publication.hasOwnProperty("refNo") ? publication.refNo : '',
        conferenceName:publication.hasOwnProperty("conferenceName") ? publication.conferenceName : '',
        prStatus:publication.hasOwnProperty("prStatus") ? publication.prStatus : '',
        reportNumber:publication.hasOwnProperty("reportNumber") ? publication.reportNumber : '',
        instution:publication.hasOwnProperty("institution") ? publication.instution : '',
        degree:publication.hasOwnProperty("degree") ? publication.degree : '',
        supervisor:publication.hasOwnProperty("supervisor") ? publication.supervisor : '',
        publisher:publication.hasOwnProperty("publisher") ? publication.publisher : '',
        isbn:publication.hasOwnProperty("isbn") ? publication.isbn : '',
        repoLink:publication.hasOwnProperty("repoLink") ? publication.repoLink : '',
        language:publication.hasOwnProperty("language") ? publication.language : '',
        file:publication.hasOwnProperty("file") ? '' : '',
        add_file:publication.hasOwnProperty("add_file") ? '' : '',
    });

    const authorListUpdate = () => {
        if (author.length > 0) {
            setAuthorList([...authorList, author])
        } else {
            alert('Please enter an author name')
        }
        // console.log(authorList)
        setAuthor([]);
    };

    const authorUpdate = e => {
        setAuthor(e.target.value)
    }

    const removeAuthor = (index) => {
        const list = [...authorList];
        list.splice(index, 1);
        setAuthorList(list);
        // console.log(authorList)
    };

    function daysListSelect() {
        var today = new Date();
        var currentDay = today.getDate();
        const days = Array.from({length: 31}, (_, i) => i + 1)
    
        return (
            <select class="form-select" name="day" id="day" onChange={getValue}>
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
            <select class="form-select" name="month" id="month" onChange={getValue}>
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
            <select class="form-select" name="year" id="year" onChange={getValue}>
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

    function submit() {
        console.log(authorList)
        input.authors = authorList
        console.log(input)
        // axios({
        //     method: 'PUT',
        //     url: `${base_url}/publication/update`,
        //     data: input,
        // }).then(function(response) {
        //     toast.success("Successfully updated publication", {autoClose: 1500,hideProgressBar: true})
        //     change();
        //     hide();
        // }, (error) => {
        //     toast.error("Error updating publication", {autoClose: 1500,hideProgressBar: true})
        // })

    }

    return (
        <div className="modal show fade" data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">

                        <label className="my-1 fw-bold">Type of publication</label>
                        <select className="form-select my-1" name="type" onChange={getValue}>
                            <option value={ publication.type } selected>{ publication.type }</option>
                            {
                                publicationList.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                        <label className="my-1 fw-bold">Title</label>
                        <textarea class="form-control my-1" rows="2"  id="title" name="title" onChange={getValue} defaultValue={publication.title} />
                        <label className="my-1 fw-bold">Description</label>
                        <textarea class="form-control" rows="2" name="description" id="description" onChange={getValue} defaultValue={publication.description}/>
                        <label className="my-1 fw-bold">Authors</label>
                        <div className="author_list">
                            {
                                authorList.length > 0 ?
                                    authorList.map((author, index) =>(
                                        <div className="row justify-content-between">
                                            <div key={index} className="col-8"> {author} </div>
                                            <div className="col-2"><div className="float-end" type="button" onClick={() => removeAuthor(index)}> <BsXLg/> </div></div>
                                        </div>
                                    ))
                                    :
                                    
                                    <div className='small'>No added author yet</div>
                            }
                        </div>
                        <div className="input-group input-group-sm my-1">
                            <input type="text" className="form-control" name="author" id="author" onChange={authorUpdate} value={author}/>
                            <button className="btn btn-outline-dark" type="button" onClick={authorListUpdate}>Add</button>
                        </div>

                        {/* <div className={classNames({ 'd-none': abstractIsShown })}> */}
                            <label className="my-1 fw-bold">Abstract</label>
                            <textarea class="form-control" rows="5" onChange={getValue} value={publication.abstract}/>
                        {/* </div> */}


                        <label className="my-1 fw-bold">Date</label>
                        <div class="input-group my-1">
                            { daysListSelect() }
                            { monthsListSelect() }
                            { yearsListSelect() }
                                    
                        </div>

                        {/* <div className={classNames({ 'd-none': journalNameIsShown })}> */}
                        <label className="my-1 fw-bold">Journal Name</label>
                        <input class="form-control my-1" id="name" value={ publication.journal } onChange={getValue} />
                    {/* </div> */}

                    {/* <div class="row"> */}
                        {/* <div className={classNames('col',{ 'd-none': valueIsShown })}> */}
                            <label className="my-1 fw-bold">Volume</label>
                            <input class="form-control my-1" id="volume" value={ publication.volume } onChange={getValue} />
                        {/* </div> */}
                        {/* <div className={classNames('col',{ 'd-none': issueIsShown })}> */}
                            <label className="my-1 fw-bold">Issue</label>
                            <input class="form-control my-1" id="issue" value= { publication.issue } onChange={getValue} />
                        {/* </div> */}
                        {/* <div  className={classNames('col',{ 'd-none': pageIsShown })}> */}
                            <label className="my-1 fw-bold">Page</label>
                            <input class="form-control my-1" id="page" value={ publication.page } onChange={getValue} />
                        {/* </div> */}
                    {/* </div> */}

                    <label className="my-1 fw-bold">DOI (Optional)</label>
                    <input class="form-control my-1" id="doi" name="doi" onChange={getValue} value={ publication.doi }/>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="submit" className="btn btn-sm btn_dark" onClick={ submit }>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
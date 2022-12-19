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
        console.log(name + " - " + value)
    } 

    const [input, setInput] = useState({
        id: publication.hasOwnProperty("id") ? (publication.id !== null ? publication.id : '') : '',
        userId: publication.hasOwnProperty("userId") ? publication.userId !== null ? publication.userId  :  ''  : '',
        type: publication.hasOwnProperty("type") ? publication.type!== null ? publication.type  :  '' : '',
        title: publication.hasOwnProperty("title") ? publication.title !== null ? publication.title  :  '' : '',
        authors:publication.hasOwnProperty("authors") ? publication.authors !== null ? publication.authors  :  '' : '',
        pubAbstract:publication.hasOwnProperty("pubAbstract") ? publication.pubAbstract !== null ? publication.pubAbstract  :  '' : '',
        day:publication.hasOwnProperty("day") ? publication.day !== null ? publication.day  :  '' : '',
        month:publication.hasOwnProperty("month") ? publication.month !== null ? publication.month  :  '' : '',
        year:publication.hasOwnProperty("year") ? publication.year !== null ? publication.year  :  '' : '',
        journal:publication.hasOwnProperty("journal") ? publication.journal !== null ? publication.journal  :  '' : '',
        value:publication.hasOwnProperty("value") ? publication.value !== null ? publication.value  :  '' : '',
        issue:publication.hasOwnProperty("issue") ? publication.issue !== null ? publication.issue  :  '' : '',
        book:publication.hasOwnProperty("book") ? publication.book !== null ? publication.book  :  '' : '',
        page:publication.hasOwnProperty("page") ? publication.page !== null ? publication.page  :  '' : '',
        conferenceTitle:publication.hasOwnProperty("conferenceTitle") ? publication.conferenceTitle !== null ? publication.conferenceTitle : '' : '',
        doi:publication.hasOwnProperty("doi") ? publication.doi !== null ? publication.doi  :  '' : '',
        location:publication.hasOwnProperty("location") ? publication.location !== null ? publication.location  :  '' : '',
        description:publication.hasOwnProperty("description") ? publication.description !== null ? publication.description  :  '' : '',
        relPublication:publication.hasOwnProperty("relPublication") ? publication.relPublication !== null ? publication.relPublication  :  '' : '',
        refNo:publication.hasOwnProperty("refNo") ? publication.refNo !== null ? publication.refNo  :  '' : '',
        conferenceName:publication.hasOwnProperty("conferenceName") ? publication.conferenceName !== null ? publication.conferenceName  :  '' : '',
        prStatus:publication.hasOwnProperty("prStatus") ? publication.prStatus !== null ? publication.prStatus  :  '' : '',
        reportNumber:publication.hasOwnProperty("reportNumber") ? publication.reportNumber !== null ? publication.reportNumber  :  '' : '',
        instution:publication.hasOwnProperty("institution") ? publication.institution !== null ? publication.institution  :  '' : '',
        degree:publication.hasOwnProperty("degree") ? publication.degree !== null ? publication.degree  :  '' : '',
        supervisor:publication.hasOwnProperty("supervisor") ? publication.supervisor !== null ? publication.supervisor  :  '' : '',
        publisher:publication.hasOwnProperty("publisher") ? publication.publisher !== null ? publication.publisher  :  '' : '',
        isbn:publication.hasOwnProperty("isbn") ? publication.isbn !== null ? publication.isbn  :  '' : '',
        repoLink:publication.hasOwnProperty("repoLink") ? publication.repoLink !== null ? publication.repoLink  :  '' : '',
        language:publication.hasOwnProperty("language") ? publication.language !== null ? publication.language  :  '' : '',
        filePath:publication.hasOwnProperty("filePath") ? '' : '',
        addFilePath:publication.hasOwnProperty("add_file") ? [] : [],
        additionalDetails:publication.hasOwnProperty("additionalDetails") ? publication.additionalDetails !== null ? publication.additionalDetails  :  [] : [],
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
        var today;
        var currentDay;
        const days = Array.from({length: 31}, (_, i) => i + 1)
        if (input.day === '' || input.day === undefined) {
            today = new Date();
            currentDay = today.getDate();
        } else {
            currentDay = input.day;
        }
       
        return (
            <select className="form-select" name="day" id="day" onChange={getValue}>
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
        var currentMonth; 
        const months = Array.from({length: 12}, (_, i) => i + 1)
    
        if (input.month === '' || input.month === undefined) {
            currentMonth = new Date().getMonth() + 1;
        } else {
            currentMonth = input.month;
        }

        return (
            <select className="form-select" name="month" id="month" onChange={getValue}>
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
        var currentYear;
        if (input.year === '' || input.year === undefined) {
            currentYear = new Date().getFullYear();
        } else {
            currentYear = input.year;
        }
        var startYear = currentYear - 88;
        const years = Array.from({length: 92}, (_, i) => i + startYear)
    
        return (
            <select className="form-select" name="year" id="year" onChange={getValue}>
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
    // Additional Details 
    const [additionalFields, setAdditionalFields] = useState(input.additionalDetails)

    const addDetails = () => {
        let newfield = { title: '', value: '' }
        setAdditionalFields([...additionalFields, newfield])
    }

    const removeAdditionalField=(index) => {
        const data = [...additionalFields]; 
        data.splice(index, 1)
        setAdditionalFields(data)
        
    }

    const getAdditionalValue = (e, index) => {
        const { name, value } = e.target;
        const list = [...additionalFields];
        list[index][name] = value;
        setAdditionalFields(list);
    }
    // End of Additional Details

    // Additional File Section */
    const [addFiles, setAddFiles] = useState([]);

    const addFile = () => {
        let newfield = { description: '', file: '' }
        setAddFiles([...addFiles, newfield])
    }

    const getAddFile = (e, index) => {
        const name = e.target.name;
        const value = e.target.files ? e.target.files[0] : e.target.value;
        const list = [...addFiles];
        list[index][name] = value;
        setAddFiles(list);
    }

    const removeAddFile=(index) => {
        const data = [...addFiles]; 
        data.splice(index, 1)
        setAddFiles(data)
        
    }
    // Endo of Additional File Section */

    function submit() {
        input.authors = authorList.toString();
        input.additionalDetails = additionalFields;
        // input.addFilePath = addFiles;
        console.log(input)

        const formData = new FormData();
        formData.append('publication', input);
        // formData.append('files',addFiles)
        console.log([...formData])  
          

        axios({
            method: 'PUT',
            url: `${base_url}/publication/editpublication`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function(response) {
            toast.success("Successfully updated publication", {autoClose: 1500,hideProgressBar: true})
            change();
            hide();
        }, (error) => {
            toast.error("Error updating publication", {autoClose: 1500,hideProgressBar: true})
        })

    }

    return (
        <div className="modal show fade" data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle} key={publication.id}>
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
                        <textarea className="form-control my-1" rows="2"  id="title" key="title" name="title" onChange={getValue} defaultValue={publication.title} />
                        <label className="my-1 fw-bold">Description</label>
                        <textarea className="form-control" rows="2" name="description" id="description" onChange={getValue} defaultValue={publication.description != null ? publication.description : ''}/>
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
                            <label className="my-1 fw-bold">pubAbstract</label>
                            <textarea className="form-control" rows="5" name="pubAbstract" onChange={getValue} defaultValue={publication.pubAbstract}/>
                        {/* </div> */}


                        <label className="my-1 fw-bold">Date</label>
                        <div className="input-group my-1">
                            { daysListSelect() }
                            { monthsListSelect() }
                            { yearsListSelect() }
                                    
                        </div>

                        {/* <div className={classNames({ 'd-none': journalNameIsShown })}> */}
                        <label className="my-1 fw-bold">Journal Name</label>
                        <input className="form-control my-1" id="name" name="journal" defaultValue={ publication.journal } onChange={getValue} />
                    {/* </div> */}

                    {/* <div className="row"> */}
                        {/* <div className={classNames('col',{ 'd-none': valueIsShown })}> */}
                            <label className="my-1 fw-bold">Volume</label>
                            <input className="form-control my-1" id="volume" name="volume" defaultValue={ publication.volume } onChange={getValue} />
                        {/* </div> */}
                        {/* <div className={classNames('col',{ 'd-none': issueIsShown })}> */}
                            <label className="my-1 fw-bold">Issue</label>
                            <input className="form-control my-1" id="issue" name="issue" defaultValue= { publication.issue } onChange={getValue} />
                        {/* </div> */}
                        {/* <div  className={classNames('col',{ 'd-none': pageIsShown })}> */}
                            <label className="my-1 fw-bold">Page</label>
                            <input className="form-control my-1" id="page" name="page" defaultValue={ publication.page } onChange={getValue} />
                        {/* </div> */}
                    {/* </div> */}

                    <label className="my-1 fw-bold">DOI (Optional)</label>
                    <input className="form-control my-1" id="doi" name="doi" onChange={getValue} defaultValue={ publication.doi }/>

                    {/* Additional Details Section */}
                    <label className="my-1 fw-bold">Additional Details</label>
                    {additionalFields.map((input, index) => { 
                        return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' value={additionalFields[index].title} onChange={e => getAdditionalValue(e, index)}/>
                                </div>
                                <div className="col-6 my-1">
                                <input className="form-control"  name='value' value={additionalFields[index].value} onChange={e => getAdditionalValue(e, index)}/>
                                </div>
                                <div className="col-1 my-1">
                                    <div className="float-end" type="button" onClick={() => removeAdditionalField(index)}> <BsXLg/> </div>
                                </div>
                            </div>
                        )

                    } )}

                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addDetails}>Add Details</button>
                    </div>

                    {/* Additional Details Section End */}

                    {/* Additional File Section */}
                    <label className="my-1 fw-bold">Additional Files</label>

                    {addFiles.map((file, index) => {
                        return (
                            <div className="row mt-2" key={index}>
                                <div className="col-11 my-1">
                                    <input className="form-control" type="file" name='file' value={addFiles[index].value} onChange={e => getAddFile(e, index)}/>
                                </div>
                                <div className="col-1 my-1">
                                    <div className="float-end" type="button" onClick={() => removeAddFile(index)}> <BsXLg/> </div>
                                </div>
                                <div className="col-12 my-1">
                                    <input className="form-control" placeholder="Description" name='description' value={addFiles[index].description} onChange={e => getAddFile(e, index)}/>
                                </div>
                            </div>
                        )
                    })}
                    
                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addFile}>Add File</button>
                    </div>
                    {/* End of Additional File Section */}
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
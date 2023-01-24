import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from 'react-select';
import classNames from 'classnames';
import {BsXLg} from "react-icons/bs";
import {base_url} from "../../Service/serviceapi";
import { toast } from 'react-toastify';
import { publicationTypeData} from '../../Data/PublicationType';
import {isObjectExist, base64toFile } from "../../Helper/util/util";
import { FaTrashAlt as TrashIcon } from "react-icons/fa";

export default function EditPublicationModal({publication, hide, change}) {

    let [authorList, setAuthorList] = useState( publication.authors !== null? publication.authors.split(","): []);
    const [author, setAuthor] = useState([]);
    const [input, setInput] = useState(publication);
    const [uploadedAddFile, setUploadedAddFile] = useState(publication.addAddFilePath);
    const [uploadedFile, setUploadedFile] = useState(input.file);
    const [additionalFields, setAdditionalFields] = useState(input.additionalDetails)
    const [additionalLinks, setAdditionalLinks] = useState(input.additionalLinks);
    const [addFiles, setAddFiles] = useState(null);
    const [file, setFile] = useState(null);

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

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
    } 
   
    const getSelectValue =( selectedOptions, actionMeta ) => {

        var name = '';
        var value = '';
        if (Array.isArray(selectedOptions)) {
            name = actionMeta.name;
            value = selectedOptions.value;
        } else {
            name = actionMeta;
            value = selectedOptions;
        }

        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))

        const allWithClass = Array.from(
            document.querySelectorAll('div.details')
        );
        
        allWithClass.forEach(element => {
            if (value==='Book'||value==='Book chapter'||value==='Book review'||value==='Dictionary entry'||value==='Encyclopedia entry'||value==='Edited book') {
               if(element.classList.contains('book')){
                element.classList.remove('d-none')
               } else {
                element.classList.add('d-none')
               }
            } else if (value==='Dissertation/Thesis'||value==='Journal article'||value==='Journal issue'||value==='Journal'||value==='Preprint'||value==='Data management plan'||value==='Software') {
                if(element.classList.contains('journal')){
                    element.classList.remove('d-none')
                } else {
                    element.classList.add('d-none')
                }
            } else if (value==='Online resource'||value==='Manual'||value==='Review'||value==='Translation'||value==='Website'||value==='Disclosure'||value==='License'||value==='Patent'||value==='Registered copyright'||value==='Artistic performance'||value==='Dataset'||value==='Invention'||value==='Lecture/Speech'||value==='Other'||value==='Research technique'||value==='Spin off company'||value==='Standards and policy'||value==='Technical standard') {
                if(element.classList.contains('writing')){
                    element.classList.remove('d-none')
                }else {
                    element.classList.add('d-none')
                }
            } else if (value==='Report'||value==='Research tool'||value==='Supervised student publication'||value==='Test'||value==='Working paper') {
                if(element.classList.contains('report')){
                    element.classList.remove('d-none')
                }else {
                    element.classList.add('d-none')
                }
            } else if(value==='Conference abstract'||value==='Conference paper'||value==='Conference poster') {
                if(element.classList.contains('conference')){
                    element.classList.remove('d-none')
                }else {
                    element.classList.add('d-none')
                }
            } else if (value==='Annotation'||value==='Physical object') {
                if(element.classList.contains('custodion')){
                    element.classList.remove('d-none')
                }else {
                    element.classList.add('d-none')
                }
            }
            else {
                if(!element.classList.contains('d-none')){
                    element.classList.add('d-none')
                }
            }
        });
    }

    useEffect(() => {
        getSelectValue(publication.type, "type")
    }, [])

    const authorListUpdate = () => {
        if (author.length > 0) {
            setAuthorList([...authorList, author])
        } else {
            alert('Please enter an author name')
        }
        setAuthor([]);
    };

    const authorUpdate = e => {
        setAuthor(e.target.value)
    }

    const removeAuthor = (index) => {
        const list = [...authorList];
        list.splice(index, 1);
        setAuthorList(list);
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
                {days?.map(day => {
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
                {months?.map(month => {
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
                {years.reverse()?.map(year => {
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

    const addDetails = () => {
        let newfield = { title: '', value: '' }
        if (additionalFields !== null) {
            setAdditionalFields([...additionalFields, newfield])
        } else {
            setAdditionalFields([newfield])
        }
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

    const removeUploadedAddFile=(index) => {
        const data = [...uploadedAddFile]; 
        data.splice(index, 1)
        setUploadedAddFile(data)
    }

    const addFile = () => {
        let newfield = { description: '', file: '' }
        if (addFiles !== null) {
            setAddFiles([...addFiles, newfield])
        } else {
            setAddFiles([newfield])
        }
    }

    const handleFileChange=(e) => {
        setFile(e.target.files[0])
    }

    const removeUploadedFile=() => {
        setUploadedFile(null)
    }
    // End of Additional File Section */

    // Additional Link

    const addLink = () => {
        let newfield = { title: '', link: '' }
        
        if (additionalLinks !== null) {
            setAdditionalLinks([...additionalLinks, newfield])
        } else {
            setAdditionalLinks([newfield])
        }
    }

    const removeAddLink = (index) => {
        const data = [...additionalLinks]; 
        data.splice(index, 1)
        setAdditionalLinks(data)
    }

    const getAdditionalValueLink = (e, index) => {
        const { name, value } = e.target;
        const list = [...additionalLinks];
        list[index][name] = value;
        setAdditionalLinks(list);
    }
    // End of Additional Link

    function submit() {
        input.authors = authorList.toString();
        input.addAddFilePath = uploadedAddFile;
        input.additionalDetails = additionalFields;
        input.additionalLinks = additionalLinks;

        // input.addFilePath = addFiles;
        const formData = new FormData();
        formData.append('publication', JSON.stringify(input));
        if (file !== null) {
            formData.append('file', file)
        }

        if (addFiles !== null) {
            for(const file of addFiles) {
                formData.append('files', file.file);
                formData.append('description', file.description);
            }
        } 

        axios({
            method: 'PUT',
            url: `${base_url}/publication/edit`,
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

    const options = publicationTypeData();
    return (
        <div className="modal show fade" data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle} key={publication.id}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">

                        <label className="my-1 fw-bold">Type of publication*</label>
                        {/* <Select name="type" options={publicationList} onChange={handleSelect} isSearchable={true}/> */}
                        <Select className="basic-single" classNamePrefix="select" isSearchable={true} name="type" options={options} onChange={getSelectValue} defaultValue={{ label: publication.type, value: publication.type }}/>
                        
                        <label className="my-1 fw-bold">Title</label>
                        <textarea className="form-control my-1" rows="2"  id="title" key="title" name="title" onChange={getValue} defaultValue={publication.title} />
                        
                        <label className="my-1 fw-bold">Description</label>
                        <textarea className="form-control" rows="2" name="description" id="description" onChange={getValue} defaultValue={publication.description != null ? publication.description : ''}/>
                        
                        <label className="my-1 fw-bold">Authors</label>
                        <div className="author_list">
                            {
                                authorList.length > 0 ?
                                    authorList?.map((author, index) =>(
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

                        <label className="my-1 fw-bold">Date</label>
                            <div className="input-group my-1">
                            { daysListSelect() }
                            { monthsListSelect() }
                            { yearsListSelect() }
                                    
                        </div>

                        <div className="details journal book d-none">
                            <label className="my-1 fw-bold">DOI</label>
                            <input className="form-control my-1" id="doi" name="doi" onChange={getValue} defaultValue={ publication.doi }/>
                        </div>

                        <div className="details journal d-none ">
                            <label className="my-1 fw-bold">Abstract</label>
                            <textarea name="pubAbstract" className="form-control" rows="5" onChange={getValue} defaultValue={ publication.pubAbstract }></textarea>
                        </div>

                        <div className="details d-none journal article_journal">
                            <label className="my-1 fw-bold">Journal Name</label>
                            <input className="form-control my-1" id="journalName" name="journalName" onChange={getValue} defaultValue={ publication.journalName } />
                        </div>

                        <div className="row">
                            <div className="details journal d-none article">
                                <label className="my-1 fw-bold">Volume</label>
                                <input className="form-control my-1" id="volume" name="volume" onChange={getValue} defaultValue={publication.volume} />
                            </div>
                            <div className="details journal d-none article">
                                <label className="my-1 fw-bold">Issue</label>
                                <input className="form-control my-1" id="issue" name="issue" onChange={getValue} defaultValue={publication.issue} />
                            </div>
                            <div  className="details journal d-none article">
                                <label className="my-1 fw-bold">Page</label>
                                <input className="form-control my-1" id="page" name="page" onChange={getValue} defaultValue={publication.page} />
                            </div>
                        </div>

                        {  /** Article End */ }

                        {  /** Book */ }
                        <div className="details d-none book">
                            <label className="my-1 fw-bold">ISBN</label>
                            <input className="form-control my-1" id="isbn" name="isbn" onChange={getValue} />
                        </div>

                        <div className="details d-none book writing">
                            <label className="my-1 fw-bold">Publisher</label>
                            <input className="form-control my-1" id="publisher" name="publisher" onChange={getValue} />
                        </div>
                    
                        {  /** Book End */ }

                        {  /** Code */ }            
                        
                        <div className="details d-none code"> 
                            <label className="my-1 fw-bold">Repository Link</label>
                            <input className="form-control my-1" id="link" name="link" onChange={getValue} />
                        </div>

                        <div className="details d-none code"> 
                            <label className="my-1 fw-bold">Language</label>
                            <input className="form-control my-1" id="language" name="language" onChange={getValue} />
                        </div>

                        {  /** Code End */ }
                        <div className="details d-none report">
                            <label className="my-1 fw-bold">Institution</label>
                            <input className="form-control my-1" id="institution" name="institution" onChange={getValue} />
                        </div>

                        <div className="details d-none conference">
                            <label className="my-1 fw-bold">Conference title</label>
                            <input className="form-control my-1" id="conferenceTitle" name="conferenceTitle" onChange={getValue} />
                        </div>

                        <div className="details d-none custodion">
                            <label className="my-1 fw-bold">Custodion</label>
                            <input className="form-control my-1" id="custodion" name="custodion" onChange={getValue} />
                        </div>

                        <label className="my-1 fw-bold">File</label>
                        {   // display uploaded file
                            uploadedFile !== null ? 
                            <div className="my-1">
                                <div className="d-flex justify-content-between my-2">
                                    <div>{input.filePath}</div>
                                    <div>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => removeUploadedFile()}><TrashIcon/></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div class="input-group my-1">
                                <input type="file" class="form-control" name="file" onChange={handleFileChange}/>
                            </div>
                        }

                    {/* Additional Details Section */}
                    <label className="my-1 fw-bold">Additional Details</label>
                    {
                    (additionalFields !== null && additionalFields !== undefined) ?
                    additionalFields?.map((input, index) => { 
                        return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' value={additionalFields[index].title} placeholder="Title" onChange={e => getAdditionalValue(e, index)}/>
                                </div>
                                <div className="col-6 my-1">
                                <input className="form-control"  name='value' value={additionalFields[index].value} placeholder="Description" onChange={e => getAdditionalValue(e, index)}/>
                                </div>
                                <div className="col-1 my-1">
                                    <div className="float-end" type="button" onClick={() => removeAdditionalField(index)}> <BsXLg/> </div>
                                </div>
                            </div>
                        )

                    } )
                    :
                    ""
                    }

                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addDetails}>Add Details</button>
                    </div>

                    {/* Additional Details Section End */}

                    {/* Additional File Section */}
                    <label className="my-1 fw-bold">Additional Files</label>

                    { // upload a new additional files
                    (addFiles !== null && addFiles !== undefined) ?
                    addFiles?.map((file, index) => {
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
                    })
                    :
                    ""
                    }

                    {/* Display uploaded files */}
                    { (uploadedAddFile !== null && uploadedAddFile !== undefined) ? uploadedAddFile?.map((file, index) => {
                        return (
                            <div className="d-flex justify-content-between my-2" key={index}>
                                <div>{file.filename}</div>
                                <div>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeUploadedAddFile(file)}><TrashIcon/></button>
                                </div>
                            </div>
                        )
                    }) : ""}                    
                    
                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addFile}>Add File</button>
                    </div>
                    {/* End of Additional File Section */}

                    {/* Additional Link Section */}
                    <label className="my-1 fw-bold">Additional Links</label>
                    {
                        (additionalLinks !== null && additionalLinks !== undefined) ?
                        additionalLinks?.map((link, index) => {
                            return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' value={additionalLinks[index].title} onChange={e => getAdditionalValueLink(e, index)} placeholder="Title"/>
                                </div>
                                <div className="col-6 my-1">
                                    <input className="form-control"  name='link' value={additionalLinks[index].link} onChange={e => getAdditionalValueLink(e, index)} placeholder="Link"/>
                                </div>
                                <div className="col-1 my-1">
                                    <div className="float-end" type="button" onClick={() => removeAddLink(index)}> <BsXLg/> </div>
                                </div>
                            </div>
                            )
                        })
                        :
                        ""
                    }
                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addLink}>Add Link</button>
                    </div>
                    {/* Additional Link Section End */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="submit" className="btn btn-sm btn_dark" onClick={ submit }>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
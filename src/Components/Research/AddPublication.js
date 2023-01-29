import React, {useState,useRef} from 'react';
import {BsXLg} from "react-icons/bs";
import {base_url} from "../../Service/serviceapi";
import { toast } from 'react-toastify';
import {ReactSession} from 'react-client-session';
import { publicationTypeData } from '../../Data/PublicationType';
import { isObjectExist } from '../../Helper/util/util';
import axios from 'axios';
import Select from 'react-select';
import classNames from 'classnames';

export default function AddPublication({change, active}) {
    const user = ReactSession.get("user");
    const ref = useRef();
   
    function daysListSelect() {
        const days = Array.from({length: 31}, (_, i) => i + 1)
    
        return (
            <select className="form-select" name="day" id="day" onChange={getValue}>
                <option value="0">Day(Optional)</option>
                {days.map(day => {
                    return <option key={day} value={day}>{day}</option>
                })}
            </select>
        )
    }
    
    function monthsListSelect() {
        const months = Array.from({length: 12}, (_, i) => i + 1)
    
        return (
            <select className="form-select" name="month" id="month" onChange={getValue}>
                <option value="0">Month(Optional)</option>
                {months.map(month => {
                    return <option key={month} value={month}>{month}</option>
                })}
            </select>
            
        )
    }
    
    function yearsListSelect() {
        var currentYear = new Date().getFullYear();
        var startYear = currentYear - 88;
        const years = Array.from({length: 92}, (_, i) => i + startYear)
    
        return (
            <select className="form-select" name="year" id="year" onChange={getValue}>
                <option value="">Year(Required)</option>
                {years.reverse().map(year => {
                    return <option key={year} value={year}>{year}</option>
                })}
            </select>
            
        )
    }

    const resetInput = () => {
        setAuthorList([user.firstName + ' ' + user.lastName]);
        setInput({userId: user.id})
        // setInput(prevState => ({ ...prevState, ...input }));
        setPublicationId('')
        setFile(null);
        setAddFiles([]);
        setAdditionalLinks([]);
        setAdditionalFields([]);
        setFlag(false);
        ref.current.value = "";     
        formRef.current.reset();
    }

    //* show the additional details section and hide the add publication details
    
    const [researchDetails, setResearchDetails] = useState(false);
    const [addDetailsSection, setAddDetailsSection] = useState(true);
    
    let [authorList, setAuthorList] = useState([user.firstName + ' ' + user.lastName]);
    // setAuthorList([...authorList, user.firstName + ' ' + user.lastName])
    const [author, setAuthor] = useState([]);
    const [publicationId, setPublicationId] = useState('');
    const [additionalFields, setAdditionalFields] = useState([])
    const [input, setInput] = useState({
        userId: user.id,
    });
    const formRef = useRef(null);

    const [file, setFile] = useState(null);
    const [addFiles, setAddFiles] = useState([]);
    const [additionalLinks, setAdditionalLinks] = useState([]);
    const [flag, setFlag] = useState(false);
    const [error, setError] = useState({
        type: '',
        title: '',
        year: '',
    });
    
    const authorListUpdate = () => {
        if (author.length > 0) {
            if (author.split(',').length > 1) {
                let authorArray = author.split(',');
                authorArray = authorArray.filter(element => element.trim() !== '')
                console.log(authorArray)
                setAuthorList(authorList.concat(authorArray))
                // setAuthorList(newArr);
            } else {
                setAuthorList([...authorList, author])
            }
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

    const getValue = e => {
        const name = e.target.name;
        const value = e.target.type === 'file' ? e.target.files : e.target.value;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
        validateInput(e)
    }    

    const getSelectValue =( selectedOptions, actionMeta ) => {
        const name = actionMeta.name;
        const value = selectedOptions.value;
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

    const addLink = () => {
        let newfield = { title: '', url: '' }
        setAdditionalLinks([...additionalLinks, newfield])
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

    const skip = () => {
        setResearchDetails(false);
        setAddDetailsSection(true);
        resetInput();
        active();
        // window.location.reload();
    }

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const validateInput = (e) => { 
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "type":
                    if (value === "") {
                        stateObj[name] = "Please choose publication type";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                case "title":
                    if (value === "") {
                        stateObj[name] = "Please enter title";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    } 
                    break;
                case "year":
                    if (value === "") {
                        stateObj[name] = "Please enter year";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;                
                default:
                    break;
            }
            return stateObj;
        });
    }

    const handleUpload = e => {
        if ( isObjectExist(input,"type") && isObjectExist(input,"title") && isObjectExist(input,"year")) {
            setFlag(false)
        } else {
            setFlag(true)
        }

        if (flag) {
            e.preventDefault();
            const updatedInput = {...input, authors: authorList.toString()};
            //* Upload the first page of publication detail
            const formData = new FormData();
            if (file !== null) {
                formData.append('file', file);
            } 
    
            formData.append('input', JSON.stringify(updatedInput));
            axios({
                method: 'POST',
                url: `${base_url}/publication/add/manual`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                }
            }).then(function (response) {
                setPublicationId(response.data.id);
                toast.success("Successfully adding the publication", {autoClose: 1500,hideProgressBar: true});
                setResearchDetails(true);
                setAddDetailsSection(false);
                change();
            },(error) => {
                toast.error("Error creating the task", {autoClose: 1500,hideProgressBar: true});
         
            })
        } else {
            toast.error("Please fill all the required fields", {autoClose: 1500,hideProgressBar: true});
        }
       
  
    }

    const handleUploadEnd = e => {
        input.addFilePath = addFiles;
        input.additionalDetails = additionalFields;
        input.additionalLinks = additionalLinks;

        //* Upload the second page of publication detail
        const formData = new FormData();
        if (addFiles.length > 0) {
            for(const file of addFiles) {
                formData.append('files', file.file);
                formData.append('description', file.description);
            }
        } 
        
        if (additionalFields.length > 0) {
            formData.append('additionaldetails', JSON.stringify(additionalFields));
        }
        if (additionalLinks.length > 0) {
            formData.append('additionallinks', JSON.stringify(additionalLinks));
        }
        
        
        formData.append('publicationid', publicationId);
        console.log([...formData])
        axios({
            method: 'PUT',
            url: `${base_url}/publication/add/detail/manual`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(function (response) {
            toast.success("Successfully add the publication", {autoClose: 1500,hideProgressBar: true})
            setResearchDetails(false);
            setAddDetailsSection(true);
            resetInput();
            active();
            // window.location.reload();
        },(error) => {
            toast.error("Error creating the task", {autoClose: 1500,hideProgressBar: true})
     
        })

    }
    const options = publicationTypeData();
    return (
        <div>
           <form ref={formRef}>
            <div className={classNames('add-step-one-publication', { 'd-none': researchDetails })}>
                <label className="my-1 fw-bold">Type of publication*</label>
                {/* <Select name="type" options={publicationList} onChange={handleSelect} isSearchable={true}/> */}
                <Select className="basic-single" classNamePrefix="select" isSearchable={true} name="type" options={options} onChange={getSelectValue}/>
                <div className='mb-1 '>{error.type && <span className='text-danger'>{error.type}</span>}</div>

                <label className="my-1 fw-bold">Title*</label>
                <input className="form-control my-1" id="title" name="title" onChange={getValue}/>
                <div className='mb-1 '>{error.title && <span className='text-danger'>{error.title}</span>}</div>

                <label className="my-1 fw-bold">Subtitle</label>
                <input className="form-control my-1" id="subtitle" name="subtitle" onChange={getValue}/>

                <label className="my-1 fw-bold">File</label>
                <input className="form-control my-1" type="file" id="file" name="file" ref={ref} onChange={handleFile}/>

                <label className="my-1 fw-bold">Description</label>
                <textarea className="form-control" rows="2" name="description" id="description" onChange={getValue}></textarea>

                <label className="my-1 fw-bold">Authors</label>
                <div className="author_list">
                    {
                        authorList.length > 0 ?
                            authorList.map((author, index) =>(
                                <div className="row justify-content-between" key={index}>
                                    <div key={index} className="col-8"> {author} </div>
                                    <div className="col-2"><div className="float-end" type="button" onClick={() => removeAuthor(index)}> <BsXLg/> </div></div>
                                </div>
                            ))
                            :
                            
                            <div className='small'>No added author yet</div>
                    }
                </div>
                <div className="input-group my-1">
                    <input type="text" className="form-control" name="author" id="author" onChange={authorUpdate} value={author}/>
                    <button className="btn btn-outline-dark" type="button" onClick={authorListUpdate}>Add</button>
                </div>


                <label className="my-1 fw-bold">Date</label>
                <div className="input-group">
                    { daysListSelect() }
                    { monthsListSelect() }
                    { yearsListSelect() }
                </div>
                <div className='mb-1'>{error.year && <span className='text-danger'>{error.year}</span>}</div>
                
                <div className="details journal book d-none">
                    <label className="my-1 fw-bold">DOI</label>
                    <input className="form-control my-1" id="doi" name="doi" onChange={getValue}/>
                </div>

                <div className="details journal d-none ">
                    <label className="my-1 fw-bold">Abstract</label>
                    <textarea name="pubAbstract" className="form-control" rows="5" onChange={getValue}></textarea>
                </div>

                <div className="details d-none journal article_journal">
                    <label className="my-1 fw-bold">Journal Name</label>
                    <input className="form-control my-1" id="journalName" name="journalName" onChange={getValue} />
                </div>

                <div className="row">
                    <div className="details journal d-none article">
                        <label className="my-1 fw-bold">Volume</label>
                        <input className="form-control my-1" id="volume" name="volume" onChange={getValue} />
                    </div>
                    <div className="details journal d-none article">
                        <label className="my-1 fw-bold">Issue</label>
                        <input className="form-control my-1" id="issue" name="issue" onChange={getValue} />
                    </div>
                    <div  className="details journal d-none article">
                        <label className="my-1 fw-bold">Page</label>
                        <input className="form-control my-1" id="page" name="page" onChange={getValue} />
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

                <div className="d-grid gap-2 my-3 d-md-flex justify-content-md-end">
                    <button className="btn btn_dark_normal btn-sm" type="button" onClick={handleUpload} >Submit</button>
                </div>
            </div>
            </form>            
                    
            <div className={classNames('add-step-two-details',{ 'd-none': addDetailsSection })}>
                <h5 className="my-1">{`Add ${input.type}'s Details`}</h5>
                {  /** Article */ }
                
                
                <label className="my-1 fw-bold">Additional Details</label>
                    {additionalFields.map((input, index) => { 
                        return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' placeholder='Title' value={additionalFields[index].title} onChange={e => getAdditionalValue(e, index)}/>
                                </div>
                                <div className="col-6 my-1">
                                <input className="form-control"  name='value' placeholder='Description' value={additionalFields[index].value} onChange={e => getAdditionalValue(e, index)}/>
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

                <label className="my-1 fw-bold">Additional File</label>
                
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

                <label className="my-1 fw-bold">Additional Links</label>
                    {additionalLinks.map((input, index) => { 
                        return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' placeholder='Title' value={additionalLinks[index].title} onChange={e => getAdditionalValueLink(e, index)}/>
                                </div>
                                <div className="col-6 my-1">
                                <input className="form-control"  name='link' placeholder='Link' value={additionalLinks[index].link} onChange={e => getAdditionalValueLink(e, index)}/>
                                </div>
                                <div className="col-1 my-1">
                                    <div className="float-end" type="button" onClick={() => removeAddLink(index)}> <BsXLg/> </div>
                                </div>
                            </div>
                        )

                    } )}

                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addLink}>Add Link</button>
                    </div>

                <div className={classNames('d-grid gap-2 my-3 d-md-flex justify-content-md-end')}>
                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={skip}>Skip</button>
                    <button className="btn btn_dark_normal btn-sm" type="button" onClick={handleUploadEnd}>Add</button>
                </div>
            </div>


            {/* <div className={classNames('add-step-three-details',{ 'd-none': successSection })}>
            <div className="card">
                <div className="card-body text-center">
                    <h5 className="card-title">Success</h5>
                    <p className="card-text">{`Your ${input.type} is successfully added`} </p>
                </div>
                </div>
            </div> */}
        </div>
    )
}
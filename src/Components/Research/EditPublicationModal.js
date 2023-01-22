import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from 'react-select';
import classNames from 'classnames';
import {BsXLg} from "react-icons/bs";
import {base_url} from "../../Service/serviceapi";
import { toast } from 'react-toastify';
import { publicationTypeData} from '../../Data/PublicationType';
import {isObjectExist } from "../../Helper/util/util";

export default function EditPublicationModal({publication, hide, change}) {

    let [authorList, setAuthorList] = useState( publication.authors !== null? publication.authors.split(","): []);
    const [author, setAuthor] = useState([]);
    const [input, setInput] = useState(publication);
    console.log(input)
    // const [input, setInput] = useState({
    //     id: isObjectExist(publication, "id") ? publication.id : '' ,
    //     userId: publication.hasOwnProperty("userId") ? publication.userId !== null ? publication.userId  :  ''  : '',
    //     type: publication.hasOwnProperty("type") ? publication.type!== null ? publication.type  :  '' : '',
    //     title: publication.hasOwnProperty("title") ? publication.title !== null ? publication.title  :  '' : '',
    //     authors:publication.hasOwnProperty("authors") ? publication.authors !== null ? publication.authors  :  '' : '',
    //     pubAbstract:publication.hasOwnProperty("pubAbstract") ? publication.pubAbstract !== null ? publication.pubAbstract  :  '' : '',
    //     day:publication.hasOwnProperty("day") ? publication.day !== null ? publication.day  :  '' : '',
    //     month:publication.hasOwnProperty("month") ? publication.month !== null ? publication.month  :  '' : '',
    //     year:publication.hasOwnProperty("year") ? publication.year !== null ? publication.year  :  '' : '',
    //     journal:publication.hasOwnProperty("journal") ? publication.journal !== null ? publication.journal  :  '' : '',
    //     value:publication.hasOwnProperty("value") ? publication.value !== null ? publication.value  :  '' : '',
    //     issue:publication.hasOwnProperty("issue") ? publication.issue !== null ? publication.issue  :  '' : '',
    //     book:publication.hasOwnProperty("book") ? publication.book !== null ? publication.book  :  '' : '',
    //     page:publication.hasOwnProperty("page") ? publication.page !== null ? publication.page  :  '' : '',
    //     conferenceTitle:publication.hasOwnProperty("conferenceTitle") ? publication.conferenceTitle !== null ? publication.conferenceTitle : '' : '',
    //     doi:publication.hasOwnProperty("doi") ? publication.doi !== null ? publication.doi  :  '' : '',
    //     location:publication.hasOwnProperty("location") ? publication.location !== null ? publication.location  :  '' : '',
    //     description:publication.hasOwnProperty("description") ? publication.description !== null ? publication.description  :  '' : '',
    //     relPublication:publication.hasOwnProperty("relPublication") ? publication.relPublication !== null ? publication.relPublication  :  '' : '',
    //     refNo:publication.hasOwnProperty("refNo") ? publication.refNo !== null ? publication.refNo  :  '' : '',
    //     conferenceName:publication.hasOwnProperty("conferenceName") ? publication.conferenceName !== null ? publication.conferenceName  :  '' : '',
    //     prStatus:publication.hasOwnProperty("prStatus") ? publication.prStatus !== null ? publication.prStatus  :  '' : '',
    //     reportNumber:publication.hasOwnProperty("reportNumber") ? publication.reportNumber !== null ? publication.reportNumber  :  '' : '',
    //     instution:publication.hasOwnProperty("institution") ? publication.institution !== null ? publication.institution  :  '' : '',
    //     degree:publication.hasOwnProperty("degree") ? publication.degree !== null ? publication.degree  :  '' : '',
    //     supervisor:publication.hasOwnProperty("supervisor") ? publication.supervisor !== null ? publication.supervisor  :  '' : '',
    //     publisher:publication.hasOwnProperty("publisher") ? publication.publisher !== null ? publication.publisher  :  '' : '',
    //     isbn:publication.hasOwnProperty("isbn") ? publication.isbn !== null ? publication.isbn  :  '' : '',
    //     repoLink:publication.hasOwnProperty("repoLink") ? publication.repoLink !== null ? publication.repoLink  :  '' : '',
    //     language:publication.hasOwnProperty("language") ? publication.language !== null ? publication.language  :  '' : '',
    //     filePath:publication.hasOwnProperty("filePath") ? '' : '',
    //     addFilePath:publication.hasOwnProperty("add_file") ? [] : [],
    //     additionalDetails:publication.hasOwnProperty("additionalDetails") ? publication.additionalDetails !== null ? publication.additionalDetails  :  [] : [],
    //     additionalLinks:publication.hasOwnProperty("additionalLinks") ? publication.additionalLinks !== null ? publication.additionalLinks :  [] : [],
    //     addAddFilePath:publication.hasOwnProperty("addAddFilePath") ? publication.addAddFilePath !== null ? publication.addAddFilePath :  [] : [],
    // });
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
        console.log(name + " - " + value)
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
        console.log(name + " - " + value)

        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))

        const allWithClass = Array.from(
            document.querySelectorAll('div.details')
        );
        
        console.log(allWithClass)
        allWithClass.forEach(element => {
            console.log(value==='Journal article')
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
    const [addFiles, setAddFiles] = useState(input.addAddFilePath);

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
    // End of Additional File Section */

    // Additional Link
    const [additionalLinks, setAdditionalLinks] = useState(input.additionalLinks);
    console.log(input.addAddFilePath);
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
    // End of Additional Link

    function submit() {
        input.authors = authorList.toString();
        input.additionalDetails = additionalFields;
        // input.addFilePath = addFiles;
        console.log(input)

        const formData = new FormData();
        formData.append('publication', input);
        input.addFilePath = addFiles;
        input.additionalDetails = additionalFields;
        input.additionalLinks = additionalLinks;
        // formData.append('files',addFiles)
        console.log([...formData])  
          

        // axios({
        //     method: 'PUT',
        //     url: `${base_url}/publication/editpublication`,
        //     data: formData,
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }).then(function(response) {
        //     toast.success("Successfully updated publication", {autoClose: 1500,hideProgressBar: true})
        //     change();
        //     hide();
        // }, (error) => {
        //     toast.error("Error updating publication", {autoClose: 1500,hideProgressBar: true})
        // })

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


                        {/* <div className={classNames({ 'd-none': journalNameIsShown })}>
                            <label className="my-1 fw-bold">Journal Name</label>
                            <input className="form-control my-1" id="name" name="journal" defaultValue={ publication.journal } onChange={getValue} />
                        </div>

                    <div className="row">
                        <div className={classNames('col',{ 'd-none': valueIsShown })}>
                            <label className="my-1 fw-bold">Volume</label>
                            <input className="form-control my-1" id="volume" name="volume" defaultValue={ publication.volume } onChange={getValue} />
                        </div>
                        <div className={classNames('col',{ 'd-none': issueIsShown })}>
                            <label className="my-1 fw-bold">Issue</label>
                            <input className="form-control my-1" id="issue" name="issue" defaultValue= { publication.issue } onChange={getValue} />
                        </div>
                        <div  className={classNames('col',{ 'd-none': pageIsShown })}>
                            <label className="my-1 fw-bold">Page</label>
                            <input className="form-control my-1" id="page" name="page" defaultValue={ publication.page } onChange={getValue} />
                        </div>
                    </div>

                    <label className="my-1 fw-bold">DOI (Optional)</label>
                    <input className="form-control my-1" id="doi" name="doi" onChange={getValue} defaultValue={ publication.doi }/> */}

                    {/* Additional Details Section */}
                    <label className="my-1 fw-bold">Additional Details</label>
                    {
                    (additionalFields !== null && additionalFields !== undefined) ?
                    additionalFields.map((input, index) => { 
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

                    {
                    (addFiles !== null && addFiles !== null) ?
                    addFiles.map((file, index) => {
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
                    
                    <div className="d-grid my-2">
                        <button className="btn btn-sm btn_dark" type="button" onClick={addFile}>Add File</button>
                    </div>
                    {/* End of Additional File Section */}

                    {/* Additional Link Section */}
                    <label className="my-1 fw-bold">Additional Links</label>
                    {
                        (additionalLinks !== null && additionalLinks !== undefined) ?
                        additionalLinks.map((link, index) => {
                            return (
                            <div className="row" key={index}>
                                <div className="col-5 my-1">
                                    <input className="form-control" name='title' value={additionalLinks[index].title} onChange={e => getAdditionalValueLink(e, index)}/>
                                </div>
                                <div className="col-6 my-1">
                                <input className="form-control"  name='url' value={additionalLinks[index].url} onChange={e => getAdditionalValueLink(e, index)}/>
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
                        <button type="submit" className="btn btn-sm btn_dark" onClick={ submit }>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
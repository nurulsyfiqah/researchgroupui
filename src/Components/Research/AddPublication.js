import React, {useState} from 'react';
import classNames from 'classnames';
// import axios from "axios";
import {BsXLg} from "react-icons/bs";

export default function AddPublication() {
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

    //* show the additional details section and hide the add publication details
    
    const [researchDetails, setResearchDetails] = useState(false);
    const [addDetailsSection, setAddDetailsSection] = useState(true);
    const [successSection, setSuccessSection] = useState(false);

    const [articleSectionIsShown, setArticleSectionIsShown] = useState(true);
    const [abstractIsShown, setAbstractIsShown] = useState(true);
    const [journalNameIsShown, setJournalNameIsShown] = useState(true);
    const [valueIsShown, setValueIsShown] = useState(true);
    const [issueIsShown, setIssueIsShown] = useState(true);
    const [bookTitleIsShown, setBookTitleIsShown] = useState(true);
    const [pageIsShown, setPageIsShown] = useState(true);
    const [conferenceTitleIsShown, setConferenceTitleIsShown] = useState(true);
    const [doiIsShown, setDoiIsShown] = useState(true);
    const [locationIsShown, setLocationIsShown] = useState(true);
    const [descriptionIsShown, setDescriptionIsShown] = useState(true);
    const [relPublicationIsShown, setRelPublicationIsShown] = useState(true);
    const [refNoIsShown, setRefNoIsShown] = useState(true);
    const [conferenceNameIsShown, setConferenceNameIsShown] = useState(true);
    const [prStatusIsShown, setPrStatusIsShown] = useState(true);
    const [reportNumberIsShown, setReportNumberIsShown] = useState(true);
    const [instutionIsShown, setInstutionIsShown] = useState(true);
    const [degreeIsShown, setDegreeIsShown] = useState(true);
    const [supervisorIsShown, setSupervisorIsShown] = useState(true);
    const [publisherIsShown, setPublisherIsShown] = useState(true);
    const [isbnIsShown, setIsbnIsShown] = useState(true);
    const [repoLinkIsShown, setRepoLinkIsShown] = useState(true);
    const [languageIsShown, setLanguageIsShown] = useState(true);
    const [publicationType, setPublicationType] = useState('');

    let [authorList, setAuthorList] = useState([]);
    const [author, setAuthor] = useState([]);

    const [input, setInput] = useState({
        type: '',
        title: '',
        authors: '',
        abstract: '',
        day: '',
        month: '',
        year: '',
        journalName: '',
        value: '',
        issue: '',
        bookTitle: '',
        page: '',
        conferenceTitle: '',
        doi: '',
        location: '',
        description: '',
        relPublication: '',
        refNo: '',
        conferenceName: '',
        prStatus: '',
        reportNumber: '',
        instution: '',
        degree: '',
        supervisor: '',
        publisher: '',
        isbn: '',
        repoLink: '',
        language: '',
        filepath: null,
        additionalDetails: [],
        addFilePath: []
    });

    const onUploadFirstStep = (e) => { 
        e.preventDefault();
        setResearchDetails(true);
    }

    const additionalDetails = () => {
        console.log(input.type)
        let publicationType = input.type;
        switch (publicationType) {
            case 'Article':
                setAbstractIsShown(false);
                setPrStatusIsShown(false);
                setJournalNameIsShown(false);
                setValueIsShown(false);
                setIssueIsShown(false);
                setPageIsShown(false);
                setDoiIsShown(false);

                setConferenceTitleIsShown(true);
                setConferenceNameIsShown(true);
                setLocationIsShown(true);
                setDescriptionIsShown(true);
                setRelPublicationIsShown(true);
                setRefNoIsShown(true);
                setReportNumberIsShown(true);
                setInstutionIsShown(true);
                setDegreeIsShown(true);
                setSupervisorIsShown(true);
                setPublisherIsShown(true);
                setIsbnIsShown(true);
                setBookTitleIsShown(true);
                setRepoLinkIsShown(true);
                setLanguageIsShown(true);
                break;
            case 'Book':
                setAbstractIsShown(false);
                setPublisherIsShown(false);
                setIsbnIsShown(false);
                setDoiIsShown(false);

                setPrStatusIsShown(true);
                setJournalNameIsShown(true);
                setValueIsShown(true);
                setIssueIsShown(true);
                setPageIsShown(true);
                setConferenceTitleIsShown(true);
                setConferenceNameIsShown(true);
                setLocationIsShown(true);
                setDescriptionIsShown(true);
                setRelPublicationIsShown(true);
                setRefNoIsShown(true);
                setReportNumberIsShown(true);
                setInstutionIsShown(true);
                setDegreeIsShown(true);
                setSupervisorIsShown(true);
                setRepoLinkIsShown(true);
                setLanguageIsShown(true);
                break;
            case 'Chapter':
                setAbstractIsShown(false);
                setBookTitleIsShown(false);  
                setPageIsShown(false);
                setDoiIsShown(false);
                setIsbnIsShown(false);
                setPublisherIsShown(false);

                setPrStatusIsShown(true);
                setJournalNameIsShown(true);
                setValueIsShown(true);
                setIssueIsShown(true);
                setConferenceTitleIsShown(true);
                setConferenceNameIsShown(true);
                setLocationIsShown(true);
                setDescriptionIsShown(true);
                setRelPublicationIsShown(true);
                setRefNoIsShown(true);
                setReportNumberIsShown(true);
                setInstutionIsShown(true);
                setDegreeIsShown(true);
                setSupervisorIsShown(true);
                setRepoLinkIsShown(true);
                setLanguageIsShown(true);
                break;
            case 'Code':
                setDescriptionIsShown(false);
                setDoiIsShown(false);
                setRepoLinkIsShown(false);
                setLanguageIsShown(false);
                setRelPublicationIsShown(false);

                setPrStatusIsShown(true);
                setJournalNameIsShown(true);
                setValueIsShown(true);
                setIssueIsShown(true);
                setConferenceTitleIsShown(true);
                setConferenceNameIsShown(true);
                setLocationIsShown(true);
                setRefNoIsShown(true);
                setReportNumberIsShown(true);
                setInstutionIsShown(true);
                setDegreeIsShown(true);
                setSupervisorIsShown(true);
                setPageIsShown(true);
                setPublisherIsShown(true);
                setIsbnIsShown(true);
                setBookTitleIsShown(true);
                break;
            case 'Conference Paper':
                setAbstractIsShown(false);
                break;
            case 'Cover Page':
                break;
            case 'Data':
                break;
            case 'Experiment Finding':
                break;
            case 'Method':
                break;
            case 'Negative Result':
                break;
            case 'Patent':
                break;
            case 'Poster':
                break;
            case 'Preprint':
                break;
            case 'Presentation':
                break;        
            case 'Raw Data':
                break;
            case 'Research Proposal':
                break;
            case 'Technical Report':
                break;
            case 'Thesis':
                break;        
            default:
                setArticleSectionIsShown(false);
        }
    }
    
    const authorListUpdate = () => {
        if (author.length > 0) {
            setAuthorList([...authorList, author])
        } else {
            alert('Please enter an author name')
        }
        console.log(authorList)
        setAuthor([]);
    };

    const authorUpdate = e => {
        setAuthor(e.target.value)
    }

    const removeAuthor = (index) => {
        const list = [...authorList];
        list.splice(index, 1);
        setAuthorList(list);
        console.log(authorList)
    };

    const [selectedOptions, setSelectedOptions] = useState();

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

    const [additionalFields, setAdditionalFields] = useState([])

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

    //* File handler
    const [state, setState] = useState({
        file: null
    })

    const handleFile = e => {
        console.log(e.target.files[0])
        setState({file: e.target.files[0]})
        console.log(state)
        // this.setState({
        //     file: e.target.files[0]
        // })
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //     setFile(file);
        //     setFileUrl(e.target.result);
        // }
        // reader.readAsDataURL(file);
    }

    const handleUpload = e => {
        e.preventDefault();
        const updatedInput = {...input, author: authorList};
        console.log(updatedInput)
        console.log(input)
        //* Hide first add detail section
        setResearchDetails(true);
        setAddDetailsSection(false);

        // additionalDetails();

        // let file = state.file;
        // let formdata = new FormData();
        // console.log(formdata)
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/api/upload',
        //     data: formdata,
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    const handleUploadEnd = e => {
        input.addFilePath = addFiles;
        input.additionalDetails = additionalFields;
        console.log(input)
    }

    return (
        <div>
            <div className={classNames('add-step-one-publication', { 'd-none': researchDetails })}>
                <label className="my-1 fw-bold">Type of publication</label>
                {/* <Select name="type" options={publicationList} onChange={handleSelect} isSearchable={true}/> */}
                <select class="form-select" name="type" onChange={getValue}>
                    <option value="" selected>Open this select menu</option>
                    {
                        publicationList.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label}</option>
                            )
                        })
                    }
                </select>
                <label className="my-1 fw-bold">Title</label>
                <input class="form-control my-1" id="title" name="title" onChange={getValue}/>

                <label className="my-1 fw-bold">File</label>
                <input className="form-control my-1" type="file" id="file" name="file" onChange={getValue}/>
                {/* <button type="button" class="btn btn-sm my-1 btn-primary" onClick={handleUpload}>Submit</button> */}
                {/* <div className="card my-1">
                    <div className="card-body p-2" style={{height: '5em'}}>
                        <div className="border d-flex align-items-center justify-content-center h-100">
                            Add your Publication here
                        </div>
                        <input class="form-control" type="file" id="file" />
                    </div>
                </div> */}

                <label className="my-1 fw-bold">Description</label>
                <textarea class="form-control" rows="2" name="description" id="description" onChange={getValue}></textarea>

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
                <div className="input-group input-group-sm my-1">
                    <input type="text" className="form-control" name="author" id="author" onChange={authorUpdate} value={author}/>
                    <button className="btn btn-outline-dark" type="button" onClick={authorListUpdate}>Add</button>
                </div>


                <label className="my-1 fw-bold">Date</label>
                <div class="input-group my-1">
                    { daysListSelect() }
                    { monthsListSelect() }
                    { yearsListSelect() }
                            
                </div>

                <label className="my-1 fw-bold">DOI</label>
                <input class="form-control my-1" id="doi" name="doi" onChange={getValue}/>

                <div class="d-grid gap-2 my-3 d-md-flex justify-content-md-end">
                    <button className="btn btn_dark_normal btn-sm" type="button" onClick={handleUpload} >Upload</button>
                </div>
            </div>
                    
            <div className={classNames('add-step-two-details',{ 'd-none': addDetailsSection })}>
                <h5 className="my-1">{`Add ${input.type}'s Details`}</h5>
                {  /** Article */ }
                
                <div className={classNames({ 'd-none': abstractIsShown })}>
                    <label className="my-1 fw-bold">Abstract</label>
                    <textarea class="form-control" rows="5"></textarea>
                </div>

                <div className={classNames({ 'd-none': prStatusIsShown })}> 
                    <label className="my-1 fw-bold">Peer-review Status</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="prStatus" id="flexRadioDefault1" />
                        <label class="form-check-label" htmlFor="flexRadioDefault1">
                            Yes
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="prStatus" id="flexRadioDefault2"/>
                        <label class="form-check-label" htmlFor="flexRadioDefault2">
                            No
                        </label>
                    </div>
                </div>

                <div className={classNames({ 'd-none': journalNameIsShown })}>
                    <label className="my-1 fw-bold">Journal Name</label>
                    <input class="form-control my-1" id="name" />
                </div>

                <div class="row">
                    <div className={classNames('col',{ 'd-none': valueIsShown })}>
                        <label className="my-1 fw-bold">Volume</label>
                        <input class="form-control my-1" id="volume" />
                    </div>
                    <div className={classNames('col',{ 'd-none': issueIsShown })}>
                        <label className="my-1 fw-bold">Issue</label>
                        <input class="form-control my-1" id="issue" />
                    </div>
                    <div  className={classNames('col',{ 'd-none': pageIsShown })}>
                        <label className="my-1 fw-bold">Page</label>
                        <input class="form-control my-1" id="page" />
                    </div>
                </div>

                {  /** Article End */ }

                {  /** Book */ }
                <div className={classNames({ 'd-none': isbnIsShown })}>
                    <label className="my-1 fw-bold">ISBN</label>
                    <input class="form-control my-1" id="isbn" />
                </div>

                <div className={classNames({ 'd-none': publisherIsShown })}>
                    <label className="my-1 fw-bold">Publisher</label>
                    <input class="form-control my-1" id="publisher" />
                </div>
            
                {  /** Book End */ }

                {  /** Chapter */ }
                <div className={classNames({ 'd-none': bookTitleIsShown })}>
                    <label className="my-1 fw-bold">Book Title</label>
                    <input class="form-control my-1" id="book_title" />
                </div>
                
                {/* <div className={classNames({ 'd-none': pageIsShown })}>
                    <label className="my-1 fw-bold">Page</label>
                    <input class="form-control my-1" id="page" />
                </div> */}

                {/* <div className={classNames({ 'd-none': doiIsShown })}>
                    <label className="my-1 fw-bold">DOI</label>
                    <input class="form-control my-1" id="doi" />
                </div> */}

                {/* <div className={classNames({ 'd-none': isbnIsShown })}>
                    <label className="my-1 fw-bold">ISBN</label>
                    <input class="form-control my-1" id="isbn" />
                </div> */}

                {/* <div className={classNames({ 'd-none': publisherIsShown })}>
                    <label className="my-1 fw-bold">Publisher</label>
                    <input class="form-control my-1" id="publisher" />
                </div>     */}

                {  /** Chapter End */ }

                {  /** Code */ }
                <div className={classNames({ 'd-none': descriptionIsShown })}> 
                    <label className="my-1 fw-bold">Description</label>
                    <textarea class="form-control" rows="5"></textarea>
                </div>
                
                {/* <div className={classNames({ 'd-none': doiIsShown })}> 
                    <label className="my-1 fw-bold">DOI</label>
                    <input class="form-control my-1" id="doi" />
                </div> */}
                
                <div className={classNames({ 'd-none': repoLinkIsShown })}> 
                    <label className="my-1 fw-bold">Repository Link</label>
                    <input class="form-control my-1" id="link" />
                </div>

                <div className={classNames({ 'd-none': languageIsShown })}> 
                    <label className="my-1 fw-bold">Language</label>
                    <input class="form-control my-1" id="language" />
                </div>

                <div className={classNames({ 'd-none': relPublicationIsShown })}> 
                    <label className="my-1 fw-bold">Related Publication</label>
                    <input class="form-control my-1" id="rel_publication" />
                </div>

                <div className={classNames({ 'd-none': doiIsShown })}>
                    <label className="my-1 fw-bold">DOI</label>
                    <input class="form-control my-1" id="doi" />
                </div>
            
                {  /** Code End */ }

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

                <div className={classNames('d-grid gap-2 my-3 d-md-flex justify-content-md-end')}>
                    <button className="btn btn-outline-secondary btn-sm" type="button">Skip</button>
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
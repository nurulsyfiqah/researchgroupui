import React, {useState, useEffect} from 'react';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import {toast} from "react-toastify";
import {ReactSession} from "react-client-session";
import {base_url} from "../../Service/serviceapi"
import {BsXLg} from "react-icons/bs";
import { isObjectExist, isGoogleScholarLinkValid } from "../../Helper/util/util";
import Dropzone from 'react-dropzone-uploader'
import moment from "moment";
import axios from 'axios';
import 'react-dropzone-uploader/dist/styles.css'

export function UploadImageModal({data, hide, change}) {
    const [image, setImage] = useState(null);

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    const getUploadParams = ({file, meta}) => {
        setImage(file)
        return { url: 'https://httpbin.org/post'}
      }
    
      const handleChangeStatus = ({ meta }, status) => {
      }
    
      const handleSubmit = () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("userId", data.id);
        try {
            axios({
                method: 'POST',
                url: `${base_url}/user/image/add`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
              }).then((response)=>{
                hide()
                change()
                toast.success("Image uploaded successfully", {autoClose:1500, hideProgressBar:true});
              });
            
            
        } catch(error) {
            console.log(error);
        }
      }

      const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    return (

        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Upload your image </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>

                    <div className="modal-body ">
                        <div className='mb-1'>Please upload your image file here. Make sure your image is below than 500KB</div>
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*"
                        maxFiles={1}
                        maxSizeBytes={500000}
                        inputContent={(files, extra) => (extra.reject ? 'Only image files allowed!' : 'Select and Drop Files')}
                        submitButtonDisabled={files => files.length < 1}
                        getFilesFromEvent={getFilesFromEvent}
                        submitButtonContent="Upload"
                        styles={{
                            dropzoneReject: { borderColor: '#F19373', backgroundColor: '#F1BDAB' },
                            inputLabel: (files, extra) => (extra.reject ? { color: '#A02800' } : {color: '#388087'}),
                            submitButton: {backgroundColor: '#388087', color: '#f6f6f2'}
                        }}
                    >
                    </Dropzone>

                    </div>

                </div>
            </div>
        </div>

    )
}

export function EditSocialLinkModal({data, hide, change}) {
    const [socialList, setSocialList] = useState(isObjectExist(data, "socialMedia") ? data.socialMedia : []);
    const [social, setSocial] = useState("");
    const [input, setInput] = useState(data);

    useEffect(() => {
        setInput(prevState => ({
            ...prevState,
            socialMedia: socialList
        }));
    },[socialList])

    const socialUpdate = e => {
        setSocial(e.target.value)
    }

    const socialListUpdate = () => {
        if (social.length > 0) {
            if (social.split(',').length > 1) {
                let socialArray = social.split(',');
                socialArray = socialArray.filter(element => element.trim() !== '')
                setSocialList(socialList.concat(socialArray))
            } else {
                setSocialList([...socialList, social])
            }
            setSocial("")
        } else {
            alert('Please enter a valid social link')
        }
    };

    const removeEmail = (index) => {
        const list = [...socialList];
        list.splice(index, 1);
        setSocialList(list);
    };

    const submitHandler=()=>{
        setInput(prevState => ({
            ...prevState,
            socialMedia: socialList
        }));
        axios({
            method: 'PUT',
            url: `${base_url}/user/update`,
            data: input
        }).then(function(response) {
            toast.success("Successfully updated", {autoClose: 1500,hideProgressBar: true})
            change()
            hide()
        }, (error)=>{
            console.log(error.text)
        })
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Social Link </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label className="form-label">Add your social link</label>
                        <div className="input-group input-group-sm mb-1">
                            <input type="text" className="form-control" name="social" id="social" value={social} onChange={socialUpdate}/>
                            <button className="btn btn-outline-dark" type="button" onClick={socialListUpdate}>Add</button>
                        </div>
                        <div className="social_list">
                            {
                                socialList.length > 0 ?
                                    socialList.map((link, index) =>(
                                        <div className="row justify-content-between" key={`sl_${index}`}>
                                            <div key={index} className="col-8"> {link} </div>
                                            <div className="col-2"><div className="float-end" type="button" key={`${index}`} id={`${index}`} onClick={() => removeEmail(index)}> <BsXLg/> </div></div>
                                        </div>
                                    ))
                                    :
                                    "No added social's link yet"
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EditDomainModal({data, hide, change}) {
    const [domainList, setDomainList] = useState(isObjectExist(data, "domain") ? data.domain : []);
    const [domain, setDomain] = useState("");
    const [input, setInput] = useState(data);

    useEffect(() => {
        setInput(prevState => ({
            ...prevState,
            domain: domainList
        }));
    },[domainList])

    const domainUpdate = e => {
        setDomain(e.target.value)
    }

    const domainListUpdate = () => {
        if (domain.length > 0) {
            if (domain.split(',').length > 1) {
                let domainArray = domain.split(',');
                domainArray = domainArray.filter(element => element.trim() !== '')
                console.log(domainArray)
                setDomainList(domainList.concat(domainArray))
                // setAuthorList(newArr);
            } else {
                setDomainList([...domainList, domain])
            }
            setDomain("")
        } else {
            alert('Please enter an valid domain')
        }
    };

    const removeDomain = (index) => {
        const list = [...domainList];
        list.splice(index, 1);
        setDomainList(list);
    };

    const submitHandler=()=>{
        setInput(prevState => ({
            ...prevState,
            domain: domainList
        }));
        axios({
            method: 'PUT',
            url: `${base_url}/user/update`,
            data: input
        }).then(function(response) {
            // toast.success("Successfully updated", {autoClose: 1500,hideProgressBar: true})
            change()
            hide()
        }, (error)=>{
            console.log(error.text)
        })
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Domain </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label className="form-label">Add your domain</label>
                        <div className="input-group input-group-sm mb-1">
                            <input type="text" className="form-control" name="domain" id="domain" value={domain} onChange={domainUpdate}/>
                            <button className="btn btn-outline-dark" type="button" onClick={domainListUpdate}>Add</button>
                        </div>
                        <div className="domain_list">
                            {
                                domainList.length > 0 ?
                                    domainList.map((domain, index) =>(
                                        <div className="row justify-content-between" key={`dl_${index}`}>
                                            <div key={index} className="col-8"> {domain} </div>
                                            <div className="col-2"><div className="float-end" type="button" id={`${index}`} onClick={() => removeDomain(index)}> <BsXLg/> </div></div>
                                        </div>
                                    ))
                                    :
                                    "No added domain yet"
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button onClick={submitHandler} className="btn btn-sm btn_dark">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EditInfoModal({data, account, hide, change}) {
    const [acc, setAcc] = useState((account));
    const [user, setUser] = useState((data));
    const [flag, setFlag] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        googleScholarLink: '',
    })

    const onAccChange =(e)=>{
        const { name, value } = e.target;
        setAcc(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === "username" || name === "email") {
            if (name === "username") {
                validateUniqueDetails("username", value);
              } else {
                validateUniqueDetails("email", value);
              }
        }
        validateInput(e)
    }

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e)
    }

    function validateUniqueDetails(name, value) {
        // const value = e.target.value;
        if (name === "username" && value !== "" && value !== account.username) {
            axios({
                method: 'GET',
                url: `${base_url}/getaccountbyusername/${value}`,
            })
                .then(function (response){
                    if (response.data.length !== 0 && response.data.username !== account.username) {
                        setError(prev => ({
                            ...prev,
                            username: "The username is not available."
                        }));
                    } else {
                        setError(prev => ({
                            ...prev,
                            username: ""
                        }));
                    }
                }, (error) => {
                    console.log(error);
                });
        } else if (name === "email" && value !== "") { 
            axios({
                method: 'GET',
                url: `${base_url}/signup/getaccountbyemail?email=${value}`,
            })
                .then(function (response){
                    if (response.data.length > 0 && response.data[0].email !== account.email) {
                        setError(prev => ({
                            ...prev,
                            email: "The email had been registered."
                        }));
                    } else {
                        setError(prev => ({
                            ...prev,
                            email: ""
                        }));
                    }
                }, (error) => {
                    console.log(error.text);
                });
        }

    }

    function validateLink(link) {
        try {
            new URL(link);
            return true;
          } catch (err) {
            return false;
          }
    }

    const submitHandler =()=>{
        if (flag) {
            // update account
            axios({
                method: 'PUT',
                url: `${base_url}/account/update`,
                data: acc
            }).then(function(response) {
                // update data in session
                ReactSession.set("account", acc);
                // update user
                
                axios({ 
                    method: 'PUT',
                    url: `${base_url}/user/update`,
                    data: user
                }).then(function(response) {
                    toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
                    change()
                    hide()
                }, (error)=>{
                    console.log(error.text)
                })
            }, (error)=>{
                console.log(error.text)
            })
        } else {
            toast.error("Please fill in all required fields", {autoClose: 1500,hideProgressBar: true})
        }
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "username":
                    if (value === "") {
                        stateObj[name] = "Please enter username";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                case "firstName":
                    if (value === "") {
                        stateObj[name] = "Please enter first name";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    } 
                    break;
                case "lastName":
                    if (value === "") {
                        stateObj[name] = "Please enter last name";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;                
                case "email":
                    if (value === "") {
                        stateObj[name] = "Please enter email address";
                        setFlag(false)
                    } else {
                        setFlag(true)
                    }
                    break;
                case "googleScholarLink":
                    if (value === "") {
                        stateObj[name] = "Please enter google scholar link";
                        setFlag(false)
                    } else {
                        if (!isGoogleScholarLinkValid(value)) {
                            stateObj[name] = "Please enter valid google scholar link";
                            setFlag(false)
                        } else {
                            setFlag(true)
                        }
                    }
                    break;
                default:
                    break;
            }

            return stateObj;
        });
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Personal Information </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">

                        <label htmlFor="username" className="form-label fw-bold my-1">Username*</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="username" name="username" defaultValue={acc.username} onChange={onAccChange}/>
                        </div>
                        <div className='mb-1 '>{error.username && <span className='text-danger'>{error.username}</span>}</div>

                        {/* <label htmlFor="publishedName" className="form-label my-1">Published Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="publishedName" name="publishedName" defaultValue={user.publishedName} onChange={onUserChange}/>
                        </div> */}

                        <label htmlFor="firstName" className="form-label fw-bold my-1">First Name*</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="firstName" name="firstName" defaultValue={user.firstName} onChange={onUserChange}/>
                        </div>
                        <div className='mb-1 '>{error.firstName && <span className='text-danger'>{error.firstName}</span>}</div>

                        <label htmlFor="lastName" className="form-label fw-bold my-1">Last Name*</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="lastName" name="lastName" defaultValue={user.lastName} onChange={onUserChange}/>
                        </div>
                        <div className='mb-1 '>{error.lastName && <span className='text-danger'>{error.lastName}</span>}</div>

                        {/* <label htmlFor="fullName" className="form-label my-1">Full Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="fullName" name="fullName" defaultValue={user.fullName} onChange={onUserChange}/>
                        </div> */}

                        <label htmlFor="email" className="form-label fw-bold my-1">Email*</label>
                        <div className="input-group">
                            <input type="email" className="form-control" id="email" name="email" defaultValue={acc.email} onChange={onAccChange}/>
                        </div>
                        <div className='mb-1 '>{error.email && <span className='text-danger'>{error.email}</span>}</div>

                        <label htmlFor="googlescholar" className="form-label fw-bold my-1">Google Scholar Link*</label>
                        <div className="input-group">
                            <input className="form-control" id="googleScholar" name="googleScholarLink" defaultValue={user.googleScholarLink} onChange={onUserChange}/>
                        </div>
                        <div className='mb-1 '>{error.googleScholarLink && <span className='text-danger'>{error.googleScholarLink}</span>}</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button onClick={submitHandler} className="btn btn-sm btn_dark">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EditAboutModal({data, hide, change }) {
    const [user, setUser] = useState(data);

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler =()=>{
        axios({
            method: 'PUT',
            url: `${base_url}/user/update`,
            data: user
        }).then(function(response) {
            toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
            hide()
            change()
        }, (error)=>{
            console.log(error.text)
        })
    }

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit About Me</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="about" className="form-label my-1">About</label>
                        <textarea onChange={onUserChange} className="form-control" rows="5" name="about" id="about" value={user.about}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button onClick={submitHandler} className="btn btn-sm btn_dark">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddAffiliationModal({hide, change}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
    const us = ReactSession.get("user");

    const [affiliation, setAffiliation] = useState({
        userId: us.id,
        organization: '',
        position: '',
        startDate: '',
        endDate: '',
    });

    const onAffChange =(e)=>{
        const { name, value } = e.target;
        setAffiliation(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler =()=>{

        axios({
            method: 'PUT',
            url: `${base_url}/user/affiliation/update`,
            data: affiliation
        }).then(function(response) {
            toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
            hide()
            change()
        }, (error)=>{
            console.log(error.text)
        })
    }

    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Affiliation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="organization" className="form-label my-1">Organization</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="organization" name="organization" onChange={onAffChange}/>
                        </div>
                        <label htmlFor="position" className="form-label my-1">Position</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="position" name="position" onChange={onAffChange}/>
                        </div>
                        <label htmlFor="startDate" className="form-label my-1">Start Date</label>
                        <div className="input-group">
                            <input type="date" className="form-control" id="startDate" name="startDate" onChange={onAffChange}/>
                        </div>
                        <label htmlFor="endDate" className="form-label my-1">End Date</label>
                        <div className="input-group">
                            <input type="date" className="form-control" id="endDate" name="endDate" onChange={onAffChange}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EditAffiliationModal({data, allData, hide, change, index}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    const user = ReactSession.get("user");
    // const [affiliation, setAffiliation] = useState({
    //     userId: user.id,
    //     organization: '',
    //     position: '',
    //     startDate: '',
    //     endDate: '',
    // });
    const [affiliation, setAffiliation] = useState(data);

    const updateObjectInArray = (array, id, updatedObject) => {
        const newArray = array.filter(item => item.id !== id);
        newArray.push(updatedObject);
        return newArray;
    }

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setAffiliation(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler =()=>{
        var newAff = updateObjectInArray(allData, data.id, affiliation);
        axios({
            method: 'PUT',
            url: `${base_url}/user/affiliationlist/update`,
            data: newAff
        }).then(function(response) {
            toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
            hide()
            change()
        }, (error)=>{
            console.log(error.text)
        })
    }

    function getDifference(a1, a2) {

        const results = a1.filter(({ id: id1 }) => !a2.some(({ id: id2 }) => id2 === id1));
          
        return results;
    }
      

    const deleteAff=()=>{
        const diff = getDifference(allData, [data])
        axios({
            method: 'PUT',
            url: `${base_url}/user/affiliation/delete`,
            data: diff
        }).then(function(response) {
            toast.success("Successfully update user details", {autoClose: 1500,hideProgressBar: true})
            hide()
            change()
        }, (error)=>{
            console.log(error.text)
        })
    }

    function formatDate(date) {
        //2022-06-20T11:10:12.000+00:00
        moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        const d = new Date(date)
        return moment(d).format('YYYY-MM-DD')
    }

    return (
        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Affiliation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="username" className="form-label my-1">Organization</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="organization" name="organization" onChange={onUserChange} defaultValue={data.organization}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">Position</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="position" name="position" onChange={onUserChange} defaultValue={data.position}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">Start Date</label>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" id="startDate" name="startDate" onChange={onUserChange} defaultValue={formatDate(data.startDate)}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">End Date</label>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" id="endDate" name="endDate" onChange={onUserChange} defaultValue={formatDate(data.endDate)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-danger" onClick={deleteAff}>Delete</button>
                        <button type="button" className="btn btn-sm btn_dark" onClick={submitHandler}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
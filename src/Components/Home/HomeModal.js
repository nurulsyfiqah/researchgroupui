import React, {useState, useEffect} from 'react';
import { useDropzone } from "react-dropzone"
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import {toast} from "react-toastify";
import Placeholder from '../../Assets/Images/image-placeholder.jpg'
import axios from 'axios';
import {ReactSession} from "react-client-session";
import base_url from "../../Service/serviceapi"
import {BsXLg} from "react-icons/bs";

export function UploadImageModal({data, hide}) {
    const account = ReactSession.get("account");
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    const images = files.map((file) => (
        <div key={file.name} >
            <img className="d-block mx-auto" src={file.preview} style={{ width: "50%" }} alt="preview" />
            <div>Title: {file.path} ({file.size} bytes)</div>
        </div>
    ))

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        //setIsSelected(true);
    };

    const uploadImageHandler=()=>{
        //const files = e.target.file;
        const formData = new FormData();
        // formData.append('file', files);
        console.log(formData)
        formData.append('File', files);
        // formData.append('title', files.title);
        // formData.append('accountId', account.id);
        console.log(formData)
        // setLoading(true);
        // axios({
        //     method: 'POST',
        //     url: `${base_url}/user/uploadimage`,
        //     data: data
        // })
        //     .then(function(response){
        //         console.log(response.data)
        //         setLoading(false);
        //     }, (error) => {
        //         console.log(error.text)
        //     });
    }

    return (

        <div className="modal show fade"  data-bs-backdrop="static" data-bs-keyboard="false"
             aria-labelledby="staticBackdropLabel" aria-hidden="true" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Upload your image </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body ">
                        <p>Drag 'n Drop your image or select an image</p>
                        <div {...getRootProps()}>
                            <div className="d-flex justify-content-center">{files.length !== 0 ? images : <label htmlFor="imageInput"><img src={Placeholder} style={{ width: "50%", cursor:"pointer" }} className="d-block mx-auto" alt="placeholder"/></label> }</div>
                            <input type="file" name="file" onChange={changeHandler} id="imageInput" {...getInputProps()}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="submit" className="btn btn-sm btn_dark" onClick={uploadImageHandler}>Save</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export function EditSocialLinkModal({data, hide, change}) {
    const [socialList, setSocialList] = useState( data.socialMedia);
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
        setSocialList([...socialList, social])
        setSocial("")
    };

    const removeEmail = (index) => {
        const list = [...socialList];
        list.splice(index, 1);
        setSocialList(list);
        console.log(socialList)
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
                                        <div className="row justify-content-between">
                                            <div key={index} className="col-8"> {link} </div>
                                            <div className="col-2"><div className="float-end" type="button" id="`${index}`" onClick={() => removeEmail(index)}> <BsXLg/> </div></div>
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
    console.log(data)
    const [domainList, setDomainList] = useState(data !== null ? data.domain : null);
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
        setDomainList([...domainList, domain])
        setDomain("")
    };

    const removeDomain = (index) => {
        const list = [...domainList];
        list.splice(index, 1);
        setDomainList(list);
        console.log(domainList)
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
                                        <div className="row justify-content-between">
                                            <div key={index} className="col-8"> {domain} </div>
                                            <div className="col-2"><div className="float-end" type="button" id="`${index}`" onClick={() => removeDomain(index)}> <BsXLg/> </div></div>
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
    const [acc, setAcc] = useState(account);
    const [user, setUser] = useState(data);

    const onAccChange =(e)=>{
        const { name, value } = e.target;
        setAcc(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(acc)
    }

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(user)
    }

    const submitHandler =()=>{
        // update account
        console.log(acc)
        axios({
            method: 'PUT',
            url: `${base_url}/account/update`,
            data: acc
        }).then(function(response) {
            toast.success("Successfully update account", {autoClose: 1500,hideProgressBar: true})
            // update user
            change()
            axios({
                method: 'PUT',
                url: `${base_url}/user/update`,
                data: user
            }).then(function(response) {
                toast.success("Successfully updated", {autoClose: 1500,hideProgressBar: true})
                change()
                hide()
            }, (error)=>{
                console.log(error.text)
            })
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
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Personal Information </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="username" className="form-label my-1">Username</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="username" name="username" value={acc.username} onChange={onAccChange}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">Published Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="publishedName" name="publishedName" value={user.publishedName} onChange={onUserChange}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">First Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName} onChange={onUserChange}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">Last Name</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName} onChange={onUserChange}/>
                        </div>
                        <label htmlFor="username" className="form-label my-1">Email</label>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" id="email" name="email" value={acc.email} onChange={onAccChange}/>
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

export function EditAboutModal({data, hide, change }) {
    const [user, setUser] = useState(data);

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(user)
    }

    const submitHandler =()=>{
        console.log(user)
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

export function EditAffiliationModal({data, hide}) {
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
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Affiliation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hide}></button>
                    </div>
                    <div className="modal-body">
                        Choose where you want to share your article with:


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="button" className="btn btn-sm btn_dark">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
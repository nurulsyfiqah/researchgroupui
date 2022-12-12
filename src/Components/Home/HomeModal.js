import React, {useState, useEffect} from 'react';
import { useDropzone } from "react-dropzone"
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import {toast} from "react-toastify";
import Placeholder from '../../Assets/Images/image-placeholder.jpg'
import axios from 'axios';
import {ReactSession} from "react-client-session";
import base_url from "../../Service/serviceapi"
import {BsXLg} from "react-icons/bs";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import moment from "moment";

export function UploadImageModal({data, hide, change}) {
    const account = ReactSession.get("account");
    const [image, setImage] = useState(null);
    // const [files, setFiles] = useState([])
    // const [loading, setLoading] = useState(false);
    // const [selectedFile, setSelectedFile] = useState();
    // const [isFilePicked, setIsFilePicked] = useState(false);

    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: "image/*",
    //     multiple: false,
    //     onDrop: (acceptedFiles) => {
    //         setFiles(
    //             acceptedFiles.map((file) =>
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file),
    //                 })
    //             )
    //         )
    //     },
    // })

    // const images = files.map((file) => (
    //     <div key={file.name} >
    //         <img className="d-block mx-auto" src={file.preview} style={{ width: "50%" }} alt="preview" />
    //         <div>Title: {file.path} ({file.size} bytes)</div>
    //     </div>
    // ))

    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     console.log(event.target.files[0])
    //     //setIsSelected(true);
    // };

    // const uploadImageHandler=()=>{
    //     //const files = e.target.file;
    //     const formData = new FormData();
    //     // formData.append('file', files);
    //     console.log(formData)
    //     formData.append('File', files);
    //     // formData.append('title', files.title);
    //     // formData.append('accountId', account.id);
    //     // console.log(formData)
    //     // setLoading(true);
    //     // axios({
    //     //     method: 'POST',
    //     //     url: `${base_url}/user/uploadimage`,
    //     //     data: data
    //     // })
    //     //     .then(function(response){
    //     //         console.log(response.data)
    //     //         setLoading(false);
    //     //     }, (error) => {
    //     //         console.log(error.text)
    //     //     });
    // }

    const getUploadParams = ({file, meta}) => {
        setImage(file)
        console.log(image)
        return { url: 'https://httpbin.org/post'}
      }
    
      const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
      }
    
      const handleSubmit = (files, allFiles) => {
        console.log(image)
        // console.log(files.map(f => f.meta))
        const formData = new FormData();
        formData.append("image", image);
        formData.append("userId", data.id);
        console.log(formData)
        try {
            axios({
                method: 'put',
                url: `${base_url}/user/uploadimage`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
              }).then((response)=>{
                hide()
                change()
                toast.success("Image uploaded successfully", {autoClose:1500, hideProgressBar:true});
              });
            // axios.put(`${base_url}/user/uploadimage`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Access-Control-Allow-Origin': true
            //     }
            // }).then((response) => {
            //     console.log(response.data)
            //     hide()
            //     change()
            //     toast.success("Image uploaded successfully", {autoClose:1500, hideProgressBar:true});
            // })
            
        } catch(error) {
            console.log(error);
        }
        // allFiles.forEach(f => f.remove())
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
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*"
                        maxFiles={1}
                        inputContent={(files, extra) => (extra.reject ? 'Only image files allowed!' : 'Select and Drop Files')}
                        submitButtonDisabled={files => files.length < 1}
                        getFilesFromEvent={getFilesFromEvent}
                        submitButtonContent="Upload"
                        styles={{
                            dropzoneReject: { borderColor: '#F19373', backgroundColor: '#F1BDAB' },
                            inputLabel: (files, extra) => (extra.reject ? { color: '#A02800' } : {}),
                            submitButton: {backgroundColor: '#388087', color: '#f6f6f2'}
                        }}
                    />

                    {/* <Dropzone
                        inputContent={null}
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        accept="image/*"
                        styles={{ dropzone: { minHeight: 300, maxHeight: 400, width: 'auto' } }}
                    /> */}
                    </div>

                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-secondary" onClick={hide}>Close</button>
                        <button type="submit" className="btn btn-sm btn_dark">Save</button>
                    </div> */}
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
    const [error, setError] = useState({
        username: '',
        email: '',
    })

    const onAccChange =(e)=>{
        const { name, value } = e.target;
        setAcc(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === "username" || name === "email") {
            console.log(name, value)
            if (name === "username") {
                validateUniqueDetails("username", value);
              } else {
                validateUniqueDetails("email", value);
              }
        }
    }

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function validateUniqueDetails(name, value) {
        // const value = e.target.value;
        if (name === "username" && value !== "") {
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

    const submitHandler =()=>{
        // update account
        console.log(acc)
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
                        <div className="input-group">
                            <input type="text" className="form-control" id="username" name="username" value={acc.username} onChange={onAccChange}/>
                        </div>
                        <div className='mb-3'>{error.username && <span className='text-danger'>{error.username}</span>}</div>
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
                        <div className="input-group">
                            <input type="email" className="form-control" id="email" name="email" value={acc.email} onChange={onAccChange}/>
                        </div>
                        <div className='mb-3'>{error.email && <span className='text-danger'>{error.email}</span>}</div>
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
        console.log(affiliation)
    }

    const submitHandler =()=>{
        console.log(affiliation)

        axios({
            method: 'PUT',
            url: `${base_url}/user/updateaffiliation`,
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

export function EditAffiliationModal({data, allData, hide, change}) {
    let modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }

    const user = ReactSession.get("user");
    console.log(allData)
    const [affiliation, setAffiliation] = useState({
        userId: user.id,
        organization: '',
        position: '',
        startDate: '',
        endDate: '',
    });

    const onUserChange =(e)=>{
        const { name, value } = e.target;
        setAffiliation(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const submitHandler =()=>{
        console.log(user)
        axios({
            method: 'PUT',
            url: `${base_url}/user/updateaffiliation`,
            data: affiliation
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
          
        console.log(results)
        return results;
    }
      

    const deleteAff=()=>{
        const diff = getDifference(allData, [data])
        console.log(diff)
        axios({
            method: 'PUT',
            url: `${base_url}/user/updatedelaffiliation`,
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BsFillEyeSlashFill as HidePassIcon,  BsFillEyeFill as ShowPassIcon } from "react-icons/bs";
import moment  from "moment";
import axios from "axios";
import {base_url} from "../Service/serviceapi";
import ui_url from "../Service/serviceui"
import "../Assets/Styles/component.css"

export default function SignUp () {

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [input, setInput] = useState({
        email: "",
        username: "",
        providedPassword: "",
        confirmPassword: "",
        lastName: "",
        firstName: "",
        fullName: "",
        createdDate: moment().format()
    });
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "firstName":
                    if (value === "") {
                        stateObj[name] = "Please enter first name";
                    }
                    break;
                case "lastName":
                    if (value === "") {
                        stateObj[name] = "Please enter last name";
                    }
                    break;
                case "fullName":
                    if (value === "") {
                        stateObj[name] = "Please enter user/publication/reject";
                    }
                    break;
                case "username":
                    if (value === "") {
                        stateObj[name] = "Please enter username";
                    }
                    break;
                case "password":
                    if (value === "") {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;
                case "confirmPassword":
                    if (value === "") {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.providedPassword && value !== input.providedPassword) {
                        stateObj[name] = "Password does not match.";
                    }
                    break;
                case "email":
                    if (value === "") {
                        stateObj[name] = "Please enter email address";
                    }
                    break;
                default:
                    break;
            }

            return stateObj;
        });
    }

    function validateUniqueEmail(value) {
        if (value.target.value === "") {
            setError(prev => ({
                ...prev,
                email: "Please enter the email"
            }));
        } else {
            axios({
                method: 'GET',
                url: `${base_url}/signup/getaccountbyemail?email=${value.target.value}`,
            })
                .then(function (response){
                    console.log(response.data)
                    if (response.data !== null) {
                        if (response.data.length > 0) {
                            setError(prev => ({
                                ...prev,
                                email: "The email had been registered"
                            }));
                        } 
                    }
                }, (error) => {
                    console.log(error.text);
                });
        }
        
    }

    function validateUniqueUsername(value) {
        if (value.target.value === "") {
            setError(prev => ({
                ...prev,
                username: "Please enter the username"
            }));
        } else {
            axios({
                method: 'GET',
                url: `${base_url}/getaccountbyusername/${value.target.value}`,
            })
                .then(function (response){
                    if (response.data[0].hasOwnProperty("username")) {
                        if (response.data[0].username.trim() === value.target.value.trim()) {
                            setError(prev => ({
                                ...prev,
                                username: "The username is not available"
                            }));
                        }
                    }
                }, (error) => {
                    console.log(error.text);
                });
        }
        
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else if (passwordType === "text") {
            setPasswordType("password");
        }
    }

    const toggleConfirmPassword = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");
        } else if (confirmPasswordType === "text") {
            setConfirmPasswordType("password");
        }
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        setSignUpBtnDisabled(true);
        console.log(input);
        const createAccountPromise = toast.loading("Creating account...")
        // get the email
        axios({
            method: 'GET',
            url: `${base_url}/signup/getaccountbyemail?email=${input.email}`,
        })
            .then(function (response){
                // warn the user if the email had been registered before
                if (response.data.length > 0) {
                    toast.update(createAccountPromise, { render: "The email had been registered.", type: "error", isLoading: false });
                    window.location.reload();
                } else {
                    // if not register yet, create a new account
                    axios({
                        method: 'POST',
                        url: `${base_url}/signup/create`,
                        data: input
                    })
                        .then(function (response){
                            console.log(response.data)
                            // create new user
                            axios({
                                method:'POST',
                                url: `${base_url}/user/create`,
                                data: {
                                    accountId: response.data.id,
                                    lastName: response.data.lastName,
                                    firstName: response.data.firstName,
                                    fullName: response.data.fullName
                                }
                            }).then(function(response) {
                                toast.update(createAccountPromise, { render: "Your account has been created. You will be redirected to the Login page", type: "success", isLoading: false });
                                window.location.href = `${ui_url}/login`;
                            }, (error) => {
                                toast.update(createAccountPromise, { render: "Your user account fail to be created", type: "error", isLoading: false });
                            })

                        }, (error)=>{
                            toast.update(createAccountPromise, { render: "Your account fail to be created", type: "error", isLoading: false });
                            window.location.reload();
                        });
                }
            }, (error) => {
                console.log(error.text)
        });

    }

    return (
        <section id="section_login" className="section_login">
        <ToastContainer position="top-center" hideProgressBar/>
        <div className="section_subtitle">Sign Up</div>
        <div className="container_login">
          <form onSubmit={ submitHandler }>
              <div className="row mt-2">
                  <div className="col-md-6">
                      <label htmlFor="firstName" className="form-label">First Name*</label>
                      <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          input={ input.firstName }
                          onChange={ onInputChange }
                          onBlur={ validateInput }
                      />
                      <div>{error.firstName && <span className='text-danger'>{error.firstName}</span>}</div>
                  </div>
                  <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name*</label>
                      <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          input={ input.lastName }
                          onChange={ onInputChange }
                          onBlur={ validateInput }
                      />
                      <div>{error.lastName && <span className='text-danger'>{error.lastName}</span>}</div>
                  </div>
              </div>
            
            {/* <div className="row mt-2">
                <div className="col-md-12">
                    <label htmlFor="fullName" className="form-label">user/publication/reject*</label>
                    <input
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        input={ input.fullName }
                        onChange={ onInputChange }
                    />
                    <div>{error.fullName && <span className='text-danger'>{error.fullName}</span>}</div>
                </div>
            </div> */}
            <div className="row mt-2">
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        input={ input.email }
                        onChange={ onInputChange }
                        onBlur={ validateUniqueEmail }
                    />
                    <div>{error.email && <span className='text-danger'>{error.email}</span>}</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        input={ input.username }
                        onChange={ onInputChange }
                        onBlur={ validateUniqueUsername }
                    />
                    <div>{error.username && <span className='text-danger'>{error.username}</span>}</div>
                </div>
            </div>
            

            <label htmlFor="providedPassword" className="form-label mt-2">Password*</label>
            <div className="input-group">
              <input
                type={passwordType}
                className="form-control"
                id="providedPassword"
                name="providedPassword"
                value={ input.providedPassword }
                onChange={ onInputChange }
                onBlur={ validateInput }
              />
              <span className="input-group-text" onClick={ togglePassword }
                > <div> { (passwordType === "password" ? <HidePassIcon className="hide-pass-icon" /> : <ShowPassIcon className="hide-pass-icon" />) } </div> </span>
            </div>
              <div> {error.password && <span className='text-danger'>{error.password}</span>}</div>

            <label htmlFor="password" className="form-label mt-2">Confirm Password*</label>
            <div className="input-group">
              <input
                type={confirmPasswordType}
                className="form-control"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={ onInputChange }
                onBlur={ validateInput }
              />
              <span className="input-group-text" onClick={ toggleConfirmPassword }
                ><div> { (confirmPasswordType === "password" ? <HidePassIcon className="hide-pass-icon" /> : <ShowPassIcon className="hide-pass-icon" />) } </div></span>
            </div>
              {error.confirmPassword && <span className='text-danger'>{error.confirmPassword}</span>}
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn_dark trigger-btn" data-toggle="modal" data-bs-target="#myModal" disabled={signUpBtnDisabled}>Sign Up</button>
            </div>
            <div>
              <small>Already have an account? <Link to="/login">Log in!</Link> </small>
            </div>
          </form>
        </div>
      </section>
    )
}
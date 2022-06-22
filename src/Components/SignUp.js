import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BsFillEyeSlashFill as HidePassIcon,  BsFillEyeFill as ShowPassIcon } from "react-icons/bs";
import moment  from "moment";
import axios from "axios";
import base_url from "../Service/serviceapi";
import ui_url from "../Service/serviceui"
import Logo from "../Assets/Images/undraw_access_account_re_8spm.svg"
import "../Assets/Styles/component.css"

export default function SignUp () {

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const [input, setInput] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        firstName: "",
        role: "",
        createdDate: moment().format()
    });
    const [error, setError] = useState({
        email: '',
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
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter Username.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
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
        axios({
            method: 'GET',
            url: `${base_url}/signup/getaccountbyemail?email=${input.email}`,
        })
            .then(function (response){
                // warn the user if the email had registered before
                if (response.data.length > 0) {
                    toast.error("The email had registered");
                } else {
                    // if not register yet, create a new account
                    axios({
                        method: 'POST',
                        url: `${base_url}/signup/create`,
                        data: input
                    })
                        .then(function (response){
                            // redirect to login page
                            window.location.href = `${ui_url}/login`;
                        }, (error)=>{
                           toast.error("Fail to create Account");
                        });
                }
            }, (error) => {
                console.log(error.text)
        });

    }

    return (
        <section id="section_login" className="section_login">
        <ToastContainer />
        <div className="section_subtitle">Sign Up</div>
        <div className="container_login">
          <img className="img-fluid" src={Logo} alt="signup"  />
          <form onSubmit={ submitHandler }>
            <div className="">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                input={ input.email }
                onChange={ onInputChange }
                onBlur={ validateInput }
              />
            </div>
              {error.email && <span className='text-danger'>{error.email}</span>}

            <label htmlFor="password" className="form-label mt-2">Password</label>
            <div className="input-group">
              <input
                type={passwordType}
                className="form-control"
                id="password"
                name="password"
                value={ input.password }
                onChange={ onInputChange }
                onBlur={ validateInput }
              />
              <span className="input-group-text" onClick={ togglePassword }
                > <div> { (passwordType === "password" ? <HidePassIcon className="hide-pass-icon" /> : <ShowPassIcon className="hide-pass-icon" />) } </div> </span>
            </div>
              {error.password && <span className='text-danger'>{error.password}</span>}

            <label htmlFor="password" className="form-label mt-2">Confirm Password</label>
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
              <button type="submit" className="btn btn_dark trigger-btn" data-toggle="modal" data-bs-target="#myModal">Sign Up</button>
            </div>
            <div>
              <small>Already have an account? <Link to="/login">Log in!</Link> </small>
            </div>
          </form>
        </div>
      </section>
    )
}
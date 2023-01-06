import React, {useState} from "react";
import { Link } from "react-router-dom";
import { BsFillEyeSlashFill as HidePassIcon,  BsFillEyeFill as ShowPassIcon } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { ReactSession } from 'react-client-session';
import axios from "axios";
import {base_url} from "../Service/serviceapi";
import ui_url from "../Service/serviceui";
import TeamLogo from "../Assets/Images/undraw_unlock_re_a558.svg"
import "../Assets/Styles/component.css"

export default function Login () {

    const [passwordType, setPasswordType] = useState("password");

    const [input, setInput] = useState( {
            email : "",
            password : ""
        }
    )

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else if (passwordType === "text") {
            setPasswordType("password");
        }
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        // check account existence with the email
        axios({
            method: 'GET',
            url: `${base_url}/signup/getaccountbyemail?email=${input.email}`,
        })
            .then(function(response){
                console.log(response.data)
                // exist: check password
                if (response.data.length > 0) {
                    if (response.data[0].password === input.password) {
                        // save the account data in session
                        ReactSession.set("account", response.data[0]);
                        window.location.href = `${ui_url}/home`;
                    } else {
                        toast.error("Wrong Password");
                    }
                } else {
                    toast.error("The account did not exist");
                }
            }, (error)=>{
               console.log(error.text)
            });
    }

    return (
      <section id="section_login" className="section_login">
        <ToastContainer position="top-center" />
        <div className="section_subtitle">Log In</div>
        <div className="container_login">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                name="email"
                onChange={onInputChange}
                value={input.email}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group mb-3">
              <input
                type={passwordType}
                className="form-control"
                name="password"
                id="password"
                value={input.password}
                onChange={onInputChange}
              />
              <span className="input-group-text" onClick={togglePassword}
                ><div> { (passwordType === "password" ? <HidePassIcon className="hide-pass-icon" /> : <ShowPassIcon className="hide-pass-icon" />) } </div></span>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn_dark">Log In</button>
            </div>
            <div className="mt-2 text-center fw-bold">
              <small><Link to="/forgotpassword">Forgot Your Password? </Link> </small>
            </div>
          </form>
          <img className="img-fluid me-3" src={ TeamLogo } alt="team" />
        </div>
      </section>
    )
}
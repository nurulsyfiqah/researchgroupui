import React, {useState} from 'react';
import axios from 'axios';
import {base_url} from '../Service/serviceapi'
import emailjs from "@emailjs/browser";
import {toast} from "react-toastify";
import { ReactSession } from "react-client-session";
import moment from "moment";
import ui_url from "../Service/serviceui";

export default function ForgotPassword() {

    const account = ReactSession.get("account");
    const [resetOne, setResetOne] = useState("");
    const [resetTwo, setResetTwo] = useState("d-none");
    const [resetThree, setResetThree] = useState("d-none");

    const [email, setEmail] = useState("");
    const [data, setData] = useState({})
    const [otp, setOTP] = useState(0);
    const [otpInput, setOtpInput] = useState("")
    const [inputPassword, setInputPassword] = useState({
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [otpBtn, setOTPBtn] = useState("disabled");
    const [newPasswordBtn, setNewPasswordBtn] = useState("disabled");
    const [errorPassword, setErrorPassword] = useState({
        password: '',
        confirmPassword: ''
    })

    // step 1
    const emailHandler =(e)=>{
        setEmail(e.target.value);
    }

    const stepOneHandler =()=> {
        // check if email exist
        if (email !== "") {
            axios({
            method: 'GET',
            url: `${base_url}/signup/getaccountbyemail?email=${email}`,
        })
            .then(function (response) {
                console.log(response.data.length)
                if (response.data.length !== 0) {
                    setError("")
                    console.log(response.data)
                    setData(response.data[0])
                    axios({
                        method: 'POST',
                        url: `${base_url}/account/sendotpemail`,
                        data: email,
                        headers: {"Content-Type": "text/plain"}
                    }).then(function (response) {
                        if (response.status === 200) {
                            toast.success("Email sent, please check your inbox.", {hideProgressbar: true, autoClose: 1500});
                            setOTP(response.data)
                            setResetOne("d-none")
                            setResetTwo("")
                            setError("")
                        } else if (response.data.status === "fail") {
                            toast.error("Oops, something went wrong. Please try again later", {hideProgressbar: true, autoClose: 1500});
                        }
                    })
                } else {
                    setError("The account with the email is not exist")
                }
            });
        } else {
            setError("Please enter your email")
        }
        

    }

    // step 2
    const otpHandler =(e)=>{
        setOtpInput(e.target.value)
        if (e.target.value.length >= 6) {
            setOTPBtn("")
        } else {
            setOTPBtn("disabled")
        }
    }
    const stepTwoHandler =()=>{
        console.log(otpInput)
        console.log(otp)
        if (otpInput !== "") {
            if (otpInput == otp) {
                setResetTwo("d-none")
                setResetThree("")
                setError("")
            } else {
                setError("The OTP does not match")
            }
        } else {
            setError("Please enter the 6-Digit OTP number")
        }
    }

    // step 3
    const onInputChange = e => {
        const { name, value } = e.target;
        setInputPassword(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setErrorPassword(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                        setNewPasswordBtn("disabled")
                    } else if (inputPassword.confirmPassword && value !== inputPassword.confirmPassword) {
                        stateObj["confirmPassword"] = "Password does not match.";
                        setNewPasswordBtn("disabled")
                    } else {
                        stateObj["confirmPassword"] = inputPassword.confirmPassword ? "" : errorPassword.confirmPassword;
                        setNewPasswordBtn("")
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                        setNewPasswordBtn("disabled")
                    } else if (inputPassword.password && value !== inputPassword.password) {
                        stateObj[name] = "Password does not match.";
                        setNewPasswordBtn("disabled")
                    } else {
                        setNewPasswordBtn("")
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    const stepThreeHandler =()=> {
        // update new password in the database
        data.providedPassword = inputPassword.password;
        data.password = "";
        console.log(data)
        axios({
            method: 'PUT',
            url: `${base_url}/resetpassword`,
            data: data
        })
            .then(function(response) {
                window.location.href = `${ui_url}/login`;
            }, (error) => {
                console.log(error.text)
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card">
                <div className="card-body p-3 m-2" style={{maxWidth: '25em'}}>
                    <h2 className="page_title">Reset Password</h2>

                    <div className={`reset_one ${resetOne}`} id="reset_one">
                        <p>Enter the email associated with your account and we will send you the 6-digit OTP number</p>
                        <label className="mt-3">Email</label>
                        <div className="input-group">
                            <input type="email" name="email" className="form-control" onChange={emailHandler}/>
                        </div>
                        <div className="text-danger"><small>{error}</small></div>
                        <div className="d-grid my-2">
                            <button className="btn btn_dark" type="button" onClick={stepOneHandler}>Submit</button>
                        </div>
                    </div>

                    <div className={`reset_two ${resetTwo}`}>
                        <p>Enter the 6-digit OTP number from your email</p>
                        <label className="mt-3">6-Digit OTP</label>
                        <div className="input-group">
                            <input type="text" className="form-control" maxLength="6" onChange={otpHandler}/>
                        </div>
                        <div className="text-danger"><small>{error}</small></div>
                        <div className="d-grid my-2">
                            <button className={`btn btn_dark ${`${otpBtn}`}`} type="button"  onClick={stepTwoHandler} >Submit</button>
                        </div>
                    </div>

                    <div className={`reset_three ${resetThree}`}>
                        <p>Create a new password</p>
                        <label className="mt-3">New Password</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="password" value={inputPassword.password} onChange={onInputChange}/>
                        </div>
                        <label className="mt-3">Confirm New Password</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="confirmPassword"  value={inputPassword.confirmPassword} onChange={onInputChange}/>
                        </div>
                        {errorPassword.confirmPassword && <span className='text-danger'>{errorPassword.confirmPassword}</span>}
                        <div className="d-grid my-2">
                            <button className={`btn btn_dark ${`${newPasswordBtn}`}`} onClick={stepThreeHandler} type="button" >Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
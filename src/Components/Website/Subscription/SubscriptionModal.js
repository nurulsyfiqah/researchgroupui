import React, {useState} from 'react';
import axios from 'axios';
import { base_url } from '../../../Service/serviceapi';
import {toast} from 'react-toastify';

export default function SubscriptionModal({account, user, hide}) {
   
    const [email, setEmail] = useState('');

    const getValue = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = () => {
        if (email !== '') {
            axios({
                method: 'GET',
                url: `${base_url}/subscribe/updatesubscription?userId=${user.id}&email=${email}`,
            })
            .then((response) => {
                toast.success("Subscribed successfully", {autoClose: 1500, hideProgressBar: true});
                hide()
            }, (error) => {
                console.log(error);
            })
        } else {
            toast.error("Please enter your email", {autoClose: 1500, hideProgressBar: true});
        }
    }

    return (
        <div className="modal show fade" id="exampleModal" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.8)'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-body">
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn-close" onClick={hide}></button>
                </div>
                <h5 className="modal-title my-2" >Subscribe to {user.firstName} {user.lastName}</h5>
                <div className="my-1">Signup for any latest update and news from your favourite researcher.</div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={getValue} placeholder='Enter your email here'/>
                    <button className="btn btn_dark" type="button" onClick={submitHandler}>Subscribe</button>
                </div>

                </div>
                </div>
            </div>
        </div>
    )
}
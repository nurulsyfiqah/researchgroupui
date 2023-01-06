import React, { useEffect,useState }  from 'react'
import {useParams} from "react-router-dom";
import PublicNavbar from "../../Components/Website/PublicNavbar";
import About from "../../Components/Website/Home/About";
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import {base_url} from "../../Service/serviceapi"
import { ReactSession } from 'react-client-session';

export default function WebPage() {
    const { username } = useParams();
    console.log(username)
    const [account, setAccount] = useState(null);
    const [user, setUser] = useState(null);
    ReactSession.set("researcherusername", username);

    const getAccountFromServer=()=>{
        axios.get(`${base_url}/getaccountbyusername/${username}`).then((response)=>{
            setAccount(response.data);
            getUserFromServer(response.data.id);
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    const getUserFromServer=(account_id)=>{
        axios.get(`${base_url}/user/getuserbyaccountid/${account_id}`).then((response)=>{
            setUser(response.data);
            console.log(response.data)
            ReactSession.set("researcher_id", response.data.id);
        }, (error)=>{
            toast.error("Something went wrong on Server")
        })
    }

    useEffect(()=>{
        getAccountFromServer();
    },[])

    // useEffect(()=>{
    //     getUserFromServer();
    // },[account])

    return (
        <div>
            <ToastContainer/>
            {
                user ? <WebComponent account={account} user={user} /> : "loading..."
            }
           
        </div>
    )
}

function WebComponent({account, user}) {
    return (
        <div className="">
            <PublicNavbar />
            <About account={account} user={user}/>
        </div>
    )
}
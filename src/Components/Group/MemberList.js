import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import base_url from "../../Service/serviceapi";
import { ReactSession } from 'react-client-session';

export default function MemberList({members, change}) {
    const user = ReactSession.get("user");
    const [emailList, setEmailList] = useState([]);
    const [counter, setCounter] = useState(0);
    let input = {
        id: members.id,
        name: members.name,
        description: members.description,
        domain: members.domain,
        member: members.member,
        createdById: members.createdById,
        createdByName: members.createdByName,
        status: 0,
    }
    console.log(input)
    useEffect(() => {
        // setParam(prevState => ({
        //     ...prevState,
        //     'member': emailList.length > 0 ? emailList : members.member
        // }));
        input.member = emailList.length > 0 ? emailList : members.member;
        console.log(counter)

    },[counter])

    // datatable
    const columns = [
        {
            name: "memberName",
            label: "Name",
            options: {
                filter: true,
                sort: true, 
            }
        },
        {
            name: "memberEmail",
            label: "Email",
            options: {
                filter: true,
                sort: true, 
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "memberId",
            label: "Member ID",
            options: {
                display: "excluded"
            }
        }
    ];

    const options = {
        filterType: 'dropdown',
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        responsive: 'standard',
        selectableRows: (user.id === members.createdById) ? true : false,
        onRowsDelete: function(rowsDeleted, data) {
            const arr = [];
            data.forEach(function(item,index){
                // change the 
                console.log(item[2])
                if (item[2] === "Not Registered") {
                    item[2] = 0
                } else if (item[2] === "Registered") {
                    item[2] = 1
                }
                const obj = {memberName: item[0],memberEmail: item[1], status: item[2], memberId: item[3]};
                arr.push(obj)

            })
            input.member = arr;
            setEmailList(arr)
            setCounter(counter + 1)
            console.log(input)
            axios({
                method: 'PUT',
                url: `${base_url}/group/update`,
                data: input
            })  
                .then(function(response){
                    console.log("success")
                    setEmailList([])
                    change()
                    toast.success("Successfully deleting the member", {autoClose: 1500,hideProgressBar: true})
                }, (error) => {
                    console.log(error.text)
                    setEmailList([])
                })
        }
    };


    return (
        <div>
            <MUIDataTable
                title={"Member List"}
                data={members.member}
                columns={columns}
                options={options}
            />
        </div>
    );
}
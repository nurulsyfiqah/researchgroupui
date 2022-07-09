import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import base_url from "../../Service/serviceapi";

export default function MemberList({members, change}) {
    const [emailList, setEmailList] = useState([]);
    const [param, setParam] = useState(members);
    const [counter, setCounter] = useState(0);
    let input = {
        id: members.id,
        name: members.name,
        description: members.description,
        domain: members.domain,
        member: members.member,
        createdBy: members.createdBy,
        status: 0,
    }

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
        filterType: 'checkbox',
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        onRowsDelete: function(rowsDeleted, data) {
            const arr = [];
            data.forEach(function(item,index){
                // change the details
                if (item[1] === "Not Registered") {
                    item[1] = 0
                } else if (item[1] === "Registered") {
                    item[1] = 1
                }
                const obj = {memberEmail: item[0], status: item[1], memberId: item[2]};
                arr.push(obj)

            })
            input.member = arr;
            setEmailList(arr)
            setCounter(counter + 1)

            axios({
                method: 'PUT',
                url: `${base_url}/group/update`,
                data: input
            })
                .then(function(response){
                    console.log("success")
                    setEmailList([])
                    change()
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
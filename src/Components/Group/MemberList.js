import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {base_url} from "../../Service/serviceapi";
import { ReactSession } from 'react-client-session';
import {memberRegStatus} from "../../Helper/util/util"

export default function MemberList({members, change}) {
    const user = ReactSession.get("user");
    const [emailList, setEmailList] = useState([]);
    const [counter, setCounter] = useState(0);
    const mem = members.member;

    let input = {
        icon: members.icon,
        id: members.id,
        name: members.name,
        description: members.description,
        domain: members.domain,
        member: members.member,
        createdById: members.createdById,
        createdByName: members.createdByName,
        status: 0,
    }

    // change status    
    const updatedMemberData = mem?.map(item => Object.assign({}, item, { status: memberRegStatus(item) }));

    useEffect(() => {
        input.member = emailList.length > 0 ? emailList : members.member;
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
        selectableRows: (user.id === members.createdById) ? 'multiple' : 'none',
        onRowsDelete: function(rowsDeleted, data) {
            const arr = [];
            data.forEach(function(item,index){
                // change the 
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
            axios({
                method: 'PUT',
                url: `${base_url}/group/member/update`,
                data: input
            })  
                .then(function(response){
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
                data={updatedMemberData}
                columns={columns}
                options={options}
            />
        </div>
    );
}
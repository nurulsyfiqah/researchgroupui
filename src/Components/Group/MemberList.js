import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import base_url from "../../Service/serviceapi";

export default function MemberList({members}) {
    const [emailList, setEmailList] = useState([]);
    const input = {
        id: members.id,
        name: members.name,
        description: members.description,
        domain: members.domain,
        member: members.member,
        createdBy: members.createdBy,
        status: 0,
    }

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

    const deleteMember=(e)=> {
        axios({
            method: 'PUT',
            url: `${base_url}/group/update`,
            data: input
        })
            .then(function(response){
                console.log("success")
                setEmailList([])
            })
    }

    function remainingMembers(email, status, memberId) {
        this.email = email;
        this.status = status;
        this.memberId = memberId;
    }

    let idsToDelete;

    const options = {
        filterType: 'checkbox',
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        elevation: 0,
        onRowsDelete: function(rowsDeleted, data) {
            console.log(data)
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
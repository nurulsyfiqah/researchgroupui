import React from 'react'
import Header from '../Components/Blog/EditPostHeader'
import Body from '../Components/Blog/EditPostBody'
import {useParams} from "react-router-dom";

export default function EditPostPage() {

    const { blogId } = useParams();

    return (
        <div>
            <Header />
            <Body />
        </div>
    )
}
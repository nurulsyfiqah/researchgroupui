import React from 'react';
import parse from 'html-react-parser';
import moment from  'moment'

export default function ViewArticle({post}) {

    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    console.log(post.content)
    function formatDate1(date) {
        //2022-06-20T11:10:12.000+00:00
        moment.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        const d = new Date(date)
        return moment(d).format('Do MMMM YYYY')
    }

    return (
        <div className="container">
            <h1 className="my-3">{ post.title.length > 0 ? post.title : "Untitled"}</h1>
            <blockquote>{formatDate1(post.date)} </blockquote>
            { post.content.length > 0 ? parse(post.content) : "No content"}
        </div>
    )
}
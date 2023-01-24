import React from 'react';
import { Link } from 'react-router-dom';
import {decode} from 'html-entities';
import ui_url from "../../../Service/serviceui";
import { ReactSession } from 'react-client-session';
import TimeAgo from 'react-timeago'

export default function ArticleList({article}) {
    const username = ReactSession.get("researcherusername");

    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    const previewPost=()=> {
        window.open(
            `${ui_url}/${username}/${article.id}`,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    return (
        <div>
            <div className="col">
                <div className="card my-2">
                    <div className="row g-0">
                        <div className="col">
                            <div className="card-body h-100">
                                <h5 className="card-title">{article.title}</h5>
                                <div className="card-text text-clamping">
                                    {decode(removeTags(article.content), {level: 'html5'})}
                                     </div>
                                <span className="text-primary" onClick={() =>previewPost()} style={{cursor: "pointer"}}>Continue reading</span>
                                <p className="card-text"><small className="text-muted"><TimeAgo date={article.date} /></small>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';

export function replaceNullToEmptyString(value) {
    try {
        Object.keys(value).forEach(function(key) {
            if(value[key] === null) {
                value[key] = [];
            }
        })
        return value;
    } catch(error) {
        return value;
    }
        
    

}

export function addMaterialBtn(item, type, index){
    if(item !== null) {
        if ((item !== undefined || item !== "") && type === "file") {
            /* For additional files (comes in array)*/
            if (Array.isArray(item)) {
                return item.map((item, index) => {
                    var ext = item.filename.split('.').pop();
                    if(ext === "pdf"){
                        return(
                            <a href={`${item.filepath}`} target="_blank" key={`file_${index}`} rel="noreferrer" className="btn btn_dark btn-sm">{`${item.filename}`}</a>
                        )
                    } else if(ext === "pptx" || ext === "ppt"){
                        return(
                            <a href={`${item.filepath}`} target="_blank" key={`file_${index}`} rel="noreferrer" className="btn btn_dark btn-sm" download={true}>{`${item.filename}`}</a>
                        )
                    } else if(ext === "docx" || ext === "doc"){
                        return(
                            <a href={`${item.filepath}`} target="_blank" key={`file_${index}`} rel="noreferrer" className="btn btn_dark btn-sm" download={true}>{`${item.filename}`}</a>
                        )
                    } else if(ext === "xlsx" || ext === "xls"){
                        return(
                            <a href={`${item.filepath}`} target="_blank" key={`file_${index}`} rel="noreferrer" className="btn btn_dark btn-sm" download={true}>{`${item.filename}`}</a>
                        )
                    } else if(ext === "png" || ext === "jpg" || ext === "jpeg"){
                        return(
                            <a href={`${item.filepath}`} target="_blank" rel="noreferrer" key={`file_${index}`} className="btn btn_dark btn-sm" download={true}>{`${item.filename}`}</a>
                        )
                    } else {
                        return null;
                    }
                })
                
            } else {
                /* For single file */
                var ext = item.split('.').pop();
                if(ext === "pdf"){
                    return(
                        <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">PDF</a>
                    )
                } else if(ext === "pptx" || ext === "ppt"){
                    return(
                        <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>ppt</a>
                    )
                } else if(ext === "docx" || ext === "doc"){
                    return(
                        <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>doc</a>
                    )
                } else if(ext === "xlsx" || ext === "xls"){
                    return(
                        <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>xls</a>
                    )
                } else if(ext === "png" || ext === "jpg" || ext === "jpeg"){
                    return(
                        <a href={`${item}`} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm" download={true}>img</a>
                    )
                } else {
                    return null;
                }
            }
    
        } else if ((item !== undefined || item !== "") && type === "g_scholar") {
            return(
                <a href={`${item}`} key={index} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">Google Scholar</a>
            )
        } else if (type === "add_link") {
            if (Array.isArray(item)) {
                return item.map((item, index) => {
                    return(
                        <a href={`${item.url}`} key={index} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">{item.title}</a>
                    )
                })
                
            } else {
                return(
                    <a href={`${item}`} key={index} target="_blank" rel="noreferrer" className="btn btn_dark btn-sm">{item.title}</a>
                )
            }                                  
        }
        else {
            return null;
        }
    } else {
        return null;
    }
    
}

export function addDetailList(item){
    if(item !== null) {
        if (Array.isArray(item)) {
            return item.map((item, index) => {
                return(
                    <li key={index}>{item.title}: {item.value}</li>
                )
            })
            
        } else {
            return null;
        }
    } else {
        return null;
    }
    
}

export function contentStatus(status) {
    switch (status) {
        case 0:
            return(<span className='text-danger'>Draft</span>);
        case 1:
            return(<span className='text-success'>Published</span>);
        default:
            return(<span className='text-danger'>Draft</span>);
    }
}


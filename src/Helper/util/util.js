import React from 'react';
import FileViewer from 'react-file-viewer-extended';

export function replaceNullToEmptyArray(value) {
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

export function replaceNullToEmptyString(value) {
    try {
        Object.keys(value).forEach(function(key) {
            if(value[key] === null) {
                value[key] = "";
            }
        })
        return value;
    } catch(error) {
        return value;
    }
}

export function replaceNullValToEmptyArray(value) {
    if(value === null) {
        value = [];
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

export function memberRegStatus(status) {
    switch (status.status) {
        case 0:
            return "Not Registered";
        case 1:
            return "Registered";
        default:
            return "Not Registered";
    }
}

export function getFileName (filePath) {
    const decodedPath = decodeURIComponent(filePath);
    return decodedPath.split(/[\\/]/).pop();
}

export function image_placeholder () {
    return "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox%3D'0 0 200 150'%2F%3E";
}

export function base64toFile(base64, name) {
    if (base64 !== null && base64 !== "") {
        var ext = name.split('.').pop();

        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // create a Blob from the byte array
        var blob = new Blob([byteArray], { type: "application/"+ext+"" });
        // create an object URL from the Blob
        var url = URL.createObjectURL(blob);
        return url;
    } else {
        return image_placeholder();
    }
}

export function base64toImage(base64, name) {
    if (base64 !== null && base64 !== "") {
        var ext = name.split('.').pop();
        return "data:image/"+ ext + ";base64,"  + base64;
    } else {
        return image_placeholder();
    }
}

export function isObjectExist(obj, key) {
    // check if object is not null and not undefined
    if (obj !== null && obj !== undefined && obj !== "") {
        // check if object has the key
        if (obj.hasOwnProperty(key)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export function isObjectValueEqual(obj, key, value) {
    // check if object has the key
    if (obj.hasOwnProperty(key)) {
        // check if object key value is equal to the value
        if (obj[key] === value) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export function isObjectExistAndNotEqual(obj, key, value) {
    // check if object is not null and not undefined
    if (obj !== null && obj !== undefined && obj !== "") {
        // check if object has the key
        if (obj.hasOwnProperty(key)) {
            // check if object key value is not equal to the value
            if (obj[key] !== value) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
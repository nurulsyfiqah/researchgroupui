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


export function addMaterialBtn(item, type, name, index){
    if(item !== null) {
        if ((item !== undefined || item !== "") && type === "file") {
            /* For additional files (comes in array)*/
            if (Array.isArray(item)) {
                return item.map((item, index) => {
                    return(
                        <li><a href={`${base64toFile(item.fileBinary.data,item.filename)}`} target="_blank" key={`file_${index}`} rel="noreferrer">{`${item.filename}`}</a></li> 
                     )
                })
                
            } else {
                /* For single file */
                var ext = name.split('.').pop();
                return(
                    <li><a href={base64toFile(item.data, name)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a></li>
                )
                // if(ext === "pdf"){
                //     return(
                //         <a href={base64toFile(item.data, name)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a>
                //     )
                // } 
                // else if(ext === "pptx" || ext === "ppt"){
                //     return(
                //         <a href={base64toFile(item.data, name)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a>
                //     )
                // } else if(ext === "docx" || ext === "doc"){
                //     return(
                //         <a href={base64toFile(item.data, name)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a>
                //     )
                // } else if(ext === "xlsx" || ext === "xls"){
                //     return(
                //         <a href={base64toFile(item.data, name)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a>
                //     )
                // } else if(ext === "png" || ext === "jpg" || ext === "jpeg"){
                //     return(
                //         <a href={base64toImage(item.fileBinary.data)} target="_blank" rel="noreferrer" className="" download={true}>{name}</a>
                //     )
                // } else {
                //     return null;
                // }
            }
    
        } else if ((item !== undefined || item !== "") && type === "g_scholar") {
            return(
                <a href={`${item}`} key={index} target="_blank" rel="noreferrer" >Google Scholar</a>
            )
        } else if (type === "add_link") {
            if (Array.isArray(item)) {
                return item.map((item, index) => {
                    return(
                        <li><a href={`${item.link}`} key={index} target="_blank" rel="noreferrer">{item.title}</a></li>
                    )
                })
                
            } else {
                return(
                    <li><a href={`${item}`} key={index} target="_blank" rel="noreferrer">{item.title}</a></li>
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

export function displayExcelFile(binaryData, fileName) {
    console.log(binaryData);
    try {
        
        let fileType = "";
    console.log(fileName);
    if(fileName.endsWith('.xlsx')) {
        fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }else if(fileName.endsWith('.xls')){
        fileType = "application/vnd.ms-excel";
    }else if(fileName.endsWith('.pdf')){
        fileType = "application/pdf";
    }else if(fileName.endsWith('.doc')|| fileName.endsWith('.docx')){
        fileType = "application/msword";
    }

    // Create a new Blob from the binary data
    // const file = new Blob(["hello download"], { type: "text/plain" });
    // // Create a new FileReader
    // var reader = new FileReader();
    // // Read the file as binary data
    // reader.readAsArrayBuffer(file);
    // // Handle the load event
    // reader.onload = function() {
    //   // Get the binary data
    //   var binaryData = new Uint8Array(reader.result);
    //   // Create a new Blob with the binary data
      var blob = new Blob(['SGVsbG8gV29ybGQh'], { type: "text/plain" });
    //   // Create a new object URL for the blob
      var url = URL.createObjectURL(blob);
    //   console.log(blob);
      console.log(url);
      
    //   // Create a new anchor element
    //   var a = document.createElement("a");
    //   // Set the href of the anchor element to the object URL
    //   a.href = url;
    //   // Set the download attribute of the anchor element to the file name
    //   a.download = fileName;
    //   // Click the anchor element
    //   a.click();
    //   // Revoke the object URL
    //   URL.revokeObjectURL(url);
    // };
    } catch (e) {
        console.log("not binary")
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
        var fileType = "";
        if(ext === 'xlsx') {
            fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }else if(ext === 'xls'){
            fileType = "application/vnd.ms-excel";
        }else if(ext === 'pdf'){
            fileType = "application/pdf";
        }else if(ext === 'doc'){
            fileType = "application/msword";
        }else if(ext === 'docx'){
            fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }else if(ext === 'jpeg' || ext == 'jpg'){
            fileType = "image/jpeg";
        }else if(ext === 'png'){
            fileType = "image/png";
        }else if(ext === 'gif'){
            fileType = "image/gif";
        }else if(ext === 'bmp'){
            fileType = "image/bmp";
        }else if(ext === 'tiff'){
            fileType = "image/tiff";
        }else if(ext === 'svg'){
            fileType = "image/svg+xml";
        }else if(ext === 'webp'){
            fileType = "image/webp";
        }else if(ext === 'zip'){
            fileType = "application/zip";
        }else if(ext === 'rar'){
            fileType = "application/x-rar-compressed";
        }

        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        // create a Blob from the byte array
        var blob = new Blob([byteArray], { type: fileType });
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
        if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && JSON.stringify(obj[key]) !== "[]") {
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
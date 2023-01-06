import React from 'react';

export function replaceNullToEmptyString(value) {
    if (Array.isArray(value)) {
        Object.keys(value).forEach(function(key) {
            if(value[key] === null) {
                value[key] = '';
            }
        })
        console.log(value);
        return value;
    } else {
        return value;
    }
    
}


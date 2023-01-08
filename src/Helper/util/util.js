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


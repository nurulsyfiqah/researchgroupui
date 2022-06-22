import { useState, useEffect } from 'react';

export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

export function getSessionStorageOrDefault(key, defaultValue) {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
        return defaultValue;
    }
    return JSON.parse(stored);
}

export function useSessionStorage(key, defaultValue) {
    const [value, setValue] = useState(
        getSessionStorageOrDefault(key, defaultValue)
    );

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
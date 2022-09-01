import { useState, useEffect } from 'react';
import Select from 'react-select'

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

export function dayList() {
    // const options = [
    //     { value: '1', label: '1' },
    //     { value: '2', label: '2' },
    //     { value: '3', label: '3' },
    //     { value: '4', label: '4' },
    //     { value: '5', label: '5' },
    //     { value: '6', label: '6' },
    //   ]

    //   const selectOptions = () => (
    //     <div>
    //         <Select options={options} />
    //         <div>test</div>
    //     </div>
       
    //   )
    //   return selectOptions;

    return "hola";
}
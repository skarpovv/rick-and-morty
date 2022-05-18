import {useEffect, useState} from 'react';
const useDebounce = (value: string, ms: number = 600) => {
    const [debValue, setDebValue] = useState(value);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebValue(value);
        },ms)
        return ()=>{
            clearTimeout(timer);
        }
    }, [value])
    return debValue;
};
export default useDebounce;
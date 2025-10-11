import {useCallback, useEffect, useState} from "react";

export async function sendHttpReq(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message);
    }
    return resData;
}

export default function useHttp(url, config,initialValue) {
    const [data, setData] = useState(initialValue);
    function clearOrderData (){
        setData(initialValue);
    }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const sendReq = useCallback(async function sendReq(orderData) {
        setIsLoading(true);
        try {
            const resData = await sendHttpReq(url, {...config,body : orderData});
            setData(resData);
        } catch (e) {
            setError(e.message || "something went wrong");
        }
        setIsLoading(false);
    },[])

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendReq();
        }
    }, [sendReq, config]);

    return {
        data,
        isLoading,
        error,
        sendReq,
        clearOrderData
    }


}
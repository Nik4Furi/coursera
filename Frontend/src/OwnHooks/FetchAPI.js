import React, { useDebugValue, useEffect, useState } from 'react'

//Global Functions Stuff
import { SERVER } from '../GlobalFunctions';


//------------ A fetch api hook to use call the api 
const FetchAPI = (debugInfo,url, options) => {

    //------------- Creating the states to handle metadata
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    //------------- Create the function to call
    useEffect(async () => {
        setLoading(true);

        try {
            const res = await fetch(`${SERVER}/${url}`, options);
            const data = res.json();

            setData(data);

        } catch (error) {
            setData(null);
            setError(error);
        }
        setLoading(false);

    }, [url, options]);

    useDebugValue("Debugging at ",debugInfo,data,loading,error);

    return {data,error,loading}
}

export default FetchAPI;
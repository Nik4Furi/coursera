import React from 'react'
import FetchAPI from './FetchAPI'

const CallAPI = ({url,options}) => {
    const {data,loading,error} = FetchAPI(url,options);
    console.log(data,loading,error);

  return (
    <>
      {data} {error} {loading}
    </>
  )
}

export default CallAPI

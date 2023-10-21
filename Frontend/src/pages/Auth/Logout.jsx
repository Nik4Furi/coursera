import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

//Store Stuff
import { useDispatch } from 'react-redux';
import { setUser,removIsAuthenticated } from '../../store/UserSlice';

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //------ Function to logout the user
    useEffect(()=>{
        localStorage.removeItem('token');

        dispatch(setUser(''));

        dispatch(removIsAuthenticated());

        navigate('/');
    },[]);


  return (
    <>
      
    </>
  )
}

export default Logout

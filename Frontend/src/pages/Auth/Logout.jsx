import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

//Store Stuff
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/UsersSlice';

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //------ Function to logout the user
  useEffect(() => {
    localStorage.removeItem('token')

    dispatch(logoutUser());

    navigate('/')

  }, [dispatch, navigate]);


  return (
    <>

    </>
  )
}

export default Logout

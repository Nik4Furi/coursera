import React, { useEffect } from 'react'

import { Grid} from '@chakra-ui/react'

import toast from 'react-hot-toast'

//---------Redux store specific stuff
import { useDispatch, useSelector } from 'react-redux'
import { clearCoursesError } from '../../Store/CourseSlice'
import { clearAdminError } from '../../Store/AdminSlice'

//Admin Component Stuff
import Sidebar from './Sidebar'


const AdminLayout = ({ children }) => {

  const dispatch = useDispatch();

  const { success, msg } = useSelector(state => state.course)
  const { success: adminSuccess, msg: adminMsg } = useSelector(state => state.admin)

  useEffect(() => { //Related to courses only

    if (success === true && msg)
      toast.success(msg);
    else if (success === false && msg)
      toast.error(msg);

    dispatch(clearCoursesError());

  }, [dispatch, success, msg]);


  useEffect(() => { //Related to admin slice stuff

    if (adminSuccess === true && adminMsg)
      toast.success(adminMsg);

    else if (adminSuccess === false && adminMsg)
      toast.error(adminMsg);

    dispatch(clearAdminError());

  }, [dispatch, adminSuccess, adminMsg]);


  return (
    <>
      <section id="AdminLayout">

        <Grid templateColumns={['1fr', '1fr 2fr']} >

          {/* Sidebar show for navigation  */}
          <Sidebar />


          {/* Here the children to show related page data  */}
            {children}
        </Grid>
      </section>
    </>
  )
}

export default AdminLayout

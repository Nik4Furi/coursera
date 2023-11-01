import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

//Pages Specific Stuff
import Home from './pages/Home'
import Courses from './pages/Courses'
import Layout from './components/Layout/Layout'
import Error404 from './pages/Error404'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ContactUS from './pages/ContactUS';
import RequestCourse from './pages/RequestCourse';
import About from './pages/About/About';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import PaymentError from './pages/Payment/PaymentError';
import Subscription from './pages/Payment/Subscription';
import LecturePage from './pages/Course/LecturePage';
import Profile from './pages/Auth/Profile';
import ChangePassword from './pages/Auth/ChangePassword';
import UpdateProfile from './pages/Auth/UpdateProfile';
import Users from './pages/Admin/Users';

//-------- Admin Specific Pages
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';
import CreateCourse from './pages/Admin/CreateCourse';
import AdminCourses from './pages/Admin/AdminCourses';


const OurRoutes = () => {

<<<<<<< HEAD
  const dispatch = useDispatch();

  const { user, isAuthenticated, success, msg, } = useSelector(state => state.user);

  useEffect(() => { //Specific for handle users slice

    if (success === true && msg)
      toast.success(msg);
    else if (success === false && msg)
      toast.error(msg);

    dispatch(clearUserError()); //clear all the user api stuffs

  }, [dispatch, success, msg]);

  useEffect(() => {
    if (Token)
      dispatch(getUser()); //Call the api to fetch logged in user details
  }, [dispatch])

=======
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d
  return (
    <>
      <BrowserRouter>

        <Routes>

          {/* Home Page  */}
<<<<<<< HEAD
          <Route path='/' element={<Suspense fallback={<Loading />}><Layout ><Home isAuthenticated={isAuthenticated} /></Layout> </Suspense>} />
=======
          <Route path='/' element={<Layout ><Home /></Layout>} />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

          {/* Home Page  */}
          <Route path='/about' element={<Layout ><About /></Layout>} />

          {/* Contact Us Page  */}
          <Route path='/contact' element={<Layout ><ContactUS /></Layout>} />

          {/* ---------------- Auth Specific Stuff Pages ------------------- X  */}
          {/* Register Page  */}
          <Route path='/register' element={<Layout ><Register /></Layout>} />

          {/* Login Page  */}
<<<<<<< HEAD
          <Route path='/login' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile' ><Layout ><Login /></Layout> </ProtectedRoute></Suspense>} />

          {/* Login Page  */}
          <Route path='/logout' element={<Suspense fallback={<Loading />}> <ProtectedRoute isAuthenticated={isAuthenticated}> <Layout > <Logout /></Layout> </ProtectedRoute> </Suspense>} />
=======
          <Route path='/login' element={<Layout ><Login /></Layout>} />
>>>>>>> 18dbd310f36e03a5fd799f1d7e3484465921f77d

          {/* Forget Password Page  */}
          <Route path='/forgetpassword' element={<Layout ><ForgetPassword /></Layout>} />

          {/* Reset Password Page  */}
          <Route path='/resetPassword/:token' element={<Layout ><ResetPassword /></Layout>} />

          {/* Profile Page  */}
          <Route path='/profile' element={<Layout ><Profile /></Layout>} />

          {/* Change password Page  */}
          <Route path='/changepassword' element={<Layout ><ChangePassword /></Layout>} />

          {/* Profile Page  */}
          <Route path='/updateprofile' element={<Layout ><UpdateProfile /></Layout>} />


          {/* --------------------- Payment Specifi Stuff -----------------------X */}
          {/* PaymentSuccess page  */}
          <Route path='/paymentsuccess' element={<Layout ><PaymentSuccess /></Layout>} />

          {/* PaymentError page  */}
          <Route path='/paymenterror' element={<Layout ><PaymentError /></Layout>} />

          {/* Subscription page  */}
          <Route path='/subscribe' element={<Layout ><Subscription /></Layout>} />


          {/* ------------------------ Course Specific Stuff -------------------X */}
          {/* Lecture Page  */}
          <Route path='/course/lecture/:id' element={<Layout ><LecturePage /></Layout>} />

          {/* Reset Password Page  */}
          <Route path='/course/request' element={<Layout ><RequestCourse /></Layout>} />

          {/* -------------------------- Admin Specific Routes --------------X  */}                 
          {/* Admin Dashboard Page  */}
          <Route path='/admin/dashboard' element={<Layout ><AdminDashboard /></Layout>} />
          
          {/* Admin Users Show Page  */}
          <Route path='/admin/users' element={<Layout ><Users /></Layout>} />

          {/* Admin Create Course Page  */}
          <Route path='/admin/createcourse' element={<Layout ><CreateCourse /></Layout>} />

          {/* Admin Course Lectures Page  */}
          <Route path='/admin/courses' element={<Layout ><AdminCourses /></Layout>} />


          {/* Error Page  */}
          <Route path='*' element={<Layout ><Error404 /></Layout>} />

        </Routes>

        {/* Notification like in form of toasts  */}
        <Toaster />

      </BrowserRouter>
    </>
  )
}

export default OurRoutes

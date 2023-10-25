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

  return (
    <>
      <BrowserRouter>

        <Routes>

          {/* Home Page  */}
          <Route path='/' element={<Layout ><Home /></Layout>} />

          {/* Home Page  */}
          <Route path='/about' element={<Layout ><About /></Layout>} />

          {/* Contact Us Page  */}
          <Route path='/contact' element={<Layout ><ContactUS /></Layout>} />

          {/* ---------------- Auth Specific Stuff Pages ------------------- X  */}
          {/* Register Page  */}
          <Route path='/register' element={<Layout ><Register /></Layout>} />

          {/* Login Page  */}
          <Route path='/login' element={<Layout ><Login /></Layout>} />

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

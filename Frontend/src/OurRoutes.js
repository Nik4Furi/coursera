import React, { useEffect, lazy, Suspense } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

//Protected route
import { ProtectedRoute } from "protected-route-react"

//---------- Redux Store Stuff
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/UserSlice'

//Global Functions
import { SERVER, Token } from './GlobalFunctions';

//----------------Pages Specific Stuff
//Layout of all the pages
import Layout from './components/Layout/Layout'
import Loading from './components/Layout/Loading';

//All User Access Pages
const Home = lazy(() => import('./pages/Home'));
const Error404 = lazy(() => import('./pages/Error404'));
const ContactUS = lazy(() => import('./pages/ContactUS'));
const RequestCourse = lazy(() => import('./pages/RequestCourse'));
const About = lazy(() => import('./pages/About/About'));


//Not authenticated pages
const Login = lazy(() => import('./pages/Auth/Login'))
const Register = lazy(() => import('./pages/Auth/Register'))
const ForgetPassword = lazy(() => import('./pages/Auth/ForgetPassword'))
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'))

//Payment Pages
const PaymentSuccess = lazy(() => import('./pages/Payment/PaymentSuccess'))
const PaymentError = lazy(() => import('./pages/Payment/PaymentError'))
const Subscription = lazy(() => import('./pages/Payment/Subscription'))

//Courses Pages
const LecturePage = lazy(() => import('./pages/Course/LecturePage'))

//Authenticated pages
const Profile = lazy(() => import('./pages/Auth/Profile'))
const ChangePassword = lazy(() => import('./pages/Auth/ChangePassword'))
const UpdateProfile = lazy(() => import('./pages/Auth/UpdateProfile'))

//-------- Admin Specific Pages
const Logout = lazy(() => import('./pages/Auth/Logout'))
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard/Dashboard'))
const CreateCourse = lazy(() => import('./pages/Admin/CreateCourse'))
const Users = lazy(() => import('./pages/Admin/Users'))
const AdminCourses = lazy(() => import('./pages/Admin/AdminCourses'))

const OurRoutes = () => {

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  //-------------- Fetch the user only logged in user by the api --------X
  const getUser = async () => {
    try {
      const url = `${SERVER}/user/getUser`;
      const options = {
        headers: {
          'auth-token': Token
        }
      };

      const res = await fetch(url, options);
      const data = await res.json();

      console.log('getuser ', data);

      dispatch(setUser(data.user))

    } catch (error) { console.log(error) }
  };

  useEffect(() => {
    if (Token)
      getUser(); //Call the api to fetch logged in user details
  }, [dispatch, Token]);

  return (
    <>
      <BrowserRouter>

        <Routes>

          {/* Home Page  */}
          <Route path='/' element={<Suspense fallback={<Loading />}><Layout ><Home /></Layout> </Suspense>} />

          {/* Home Page  */}
          <Route path='/about' element={<Suspense fallback={<Loading />}><Layout ><About /></Layout> </Suspense>} />

          {/* Contact Us Page  */}
          <Route path='/contact' element={<Suspense fallback={<Loading />}><Layout ><ContactUS /></Layout> </Suspense>} />

          {/* ---------------- Auth Specific Stuff Pages ------------------- X  */}
          {/* Register Page  */}
          <Route path='/register' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={!(user.isAuthenticated)} redirect='/profile' > <Layout ><Register /></Layout></ProtectedRoute> </Suspense>} />

          {/* Login Page  */}
          <Route path='/login' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={!(user.isAuthenticated)} redirect='/profile' ><Layout ><Login isAuthenticated={user.isAuthenticated} /></Layout> </ProtectedRoute></Suspense>} />

          {/* Login Page  */}
          <Route path='/logout' element={<Suspense fallback={<Loading />}> <ProtectedRoute isAuthenticated={user.isAuthenticated}> <Layout > <Logout /></Layout> </ProtectedRoute> </Suspense>} />

          {/* Forget Password Page  */}
          <Route path='/forgetpassword' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={!(user.isAuthenticated)} redirect='/profile' ><Layout ><ForgetPassword isAuthenticated={user.isAuthenticated} /></Layout> </ProtectedRoute> </Suspense>} />

          {/* Reset Password Page  */}
          <Route path='/resetPassword/:token' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={!(user.isAuthenticated)} redirect='/profile' ><Layout ><ResetPassword isAuthenticated={user.isAuthenticated} /></Layout> </ProtectedRoute> </Suspense>} />

          {/* Profile Page  */}
          <Route path='/profile' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={user.isAuthenticated}>
            <Layout ><Profile user={user} /></Layout> </ProtectedRoute>  </Suspense>} />

          {/* Change password Page  */}
          <Route path='/changepassword' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={user.isAuthenticated}><Layout > <ChangePassword user={user} /></Layout> </ProtectedRoute></Suspense>} />

          {/* Profile Page  */}
          <Route path='/updateprofile' element={<Suspense fallback={<Loading />}> <ProtectedRoute isAuthenticated={user.isAuthenticated}><Layout > <UpdateProfile user={user} /></Layout></ProtectedRoute> </Suspense>} />


          {/* --------------------- Payment Specifi Stuff -----------------------X */}
          {/* PaymentSuccess page  */}
          <Route path='/paymentsuccess' element={<Suspense fallback={<Loading />}><Layout ><PaymentSuccess /></Layout> </Suspense>} />

          {/* PaymentError page  */}
          <Route path='/paymenterror' element={<Suspense fallback={<Loading />}><Layout ><PaymentError /></Layout> </Suspense>} />

          {/* Subscription page  */}
          <Route path='/subscribe' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={user.isAuthenticated}><Layout> <Subscription /></Layout> </ProtectedRoute> </Suspense>} />


          {/* ------------------------ Course Specific Stuff -------------------X */}
          {/* Lecture Page  */}
          <Route path='/course/lecture/:id' element={<Suspense fallback={<Loading />}><ProtectedRoute isAuthenticated={user.isAuthenticated}> <Layout ><LecturePage /></Layout> </ProtectedRoute> </Suspense>} />

          {/* Reset Password Page  */}
          <Route path='/course/request' element={<Suspense fallback={<Loading />}><Layout ><RequestCourse /></Layout> </Suspense>} />

          {/* -------------------------- Admin Specific Routes --------------X  */}
          {/* Admin Dashboard Page  */}
          <Route path='/admin/dashboard' element={<Suspense fallback={<Loading />}><ProtectedRoute adminRoute={true} isAuthenticated={user.isAuthenticated} isAdmin={user.user?.role === 'admin'} > <Layout ><AdminDashboard /></Layout> </ProtectedRoute> </Suspense>} />

          {/* Admin Users Show Page  */}
          <Route path='/admin/users' element={<Suspense fallback={<Loading />}><ProtectedRoute adminRoute={true} isAuthenticated={user.isAuthenticated} isAdmin={user.user?.role === "admin"} ><Layout ><Users /></Layout> </ProtectedRoute > </Suspense>} />

          {/* Admin Create Course Page  */}
          <Route path='/admin/createcourse' element={<Suspense fallback={<Loading />}><ProtectedRoute adminRoute={true} isAuthenticated={user.isAuthenticated} isAdmin={user.user?.role === 'admin'} ><Layout ><CreateCourse /></Layout> </ProtectedRoute > </Suspense>} />

          {/* Admin Course Lectures Page  */}
          <Route path='/admin/courses' element={<Suspense fallback={<Loading />}> <ProtectedRoute adminRoute={true} isAuthenticated={user.isAuthenticated} isAdmin={user.user?.role === 'admin'} ><Layout ><AdminCourses /></Layout> </ProtectedRoute > </Suspense>} />


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

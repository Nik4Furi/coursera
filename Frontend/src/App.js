import React from 'react';

//Setup react-router----------------------
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Layout/Header';
import Courses from './pages/Courses';



function App() {
  return (
  
      <>
      <BrowserRouter >
<Header />
        <Routes>

    <Route path='/' element={<Home />} ></Route>
    <Route path='/courses' element={<Courses />} ></Route>

        </Routes>
      
      </BrowserRouter>
      </>
  );
}

export default App;

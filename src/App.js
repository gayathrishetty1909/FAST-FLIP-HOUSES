import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import Offers from "./pages/Offers";
import Profile  from "./pages/Profile";
import  Signin  from './pages/Signin';
import  Signup  from './pages/Signup';
import PrivateRoute  from './components/PrivateRoute';
import ForgetPassword  from './pages/ForgetPassword';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
      
        <Route path="/" element = {< HomePage />} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile/>}/>
           </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;

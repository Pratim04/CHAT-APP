import { Loader } from "lucide-react";
import React, { useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import HomePage from './Pages/HomePage.jsx';
import Navbar from './Components/Navbar.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import SettingsPage from './Pages/SettingsPage.jsx';
import { useAuthStore } from './Store/useAuthStore.js';
import { Routes, Route, Navigate } from 'react-router-dom';
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  
  console.log({ authUser });

  if ( isCheckingAuth && !authUser )
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to= "/" /> } />
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to= "/" /> } />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to = "/login" /> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;
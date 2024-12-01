import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import { useAuth } from './store/useAuth';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useTheme } from './store/useTheme';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth();
   const {theme} = useTheme();

   console.log ({onlineUsers}); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
  {/* Home Page: Accessible only to authenticated users */}
  <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />

  {/* Signup Page: Accessible only to non-authenticated users */}
  <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />

  {/* Login Page: Accessible only to non-authenticated users */}
  <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />

  {/* Settings Page: Accessible only to authenticated users */}
  <Route path='/settings' element={authUser ? <Settings /> : <Navigate to="/login" />} />

  {/* Profile Page: Accessible only to authenticated users */}
  <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
</Routes>

      <Toaster />
    </div>
  );
}

export default App;

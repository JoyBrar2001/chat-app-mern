import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Homepage from './pages/home/HomePage'
import SignUpPage from './pages/signup/SignUpPage'
import LoginPage from './pages/login/LoginPage'
import { useAuthContext } from './context/AuthContext'

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path={"/"} element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path={"/login"} element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path={"/signup"} element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
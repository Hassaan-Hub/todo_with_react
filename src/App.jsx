import React from 'react'
import Signup from './components/Authentication/Signup'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Authentication/Dashboard'
import Login from './components/Authentication/Login'

const App = () => {
  return (
    <div className='h-screen w-full bg-gray-500'>
      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
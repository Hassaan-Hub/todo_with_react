import React from 'react'
import Signup from './components/Authentication/Signup'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Authentication/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>

    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  )
}

export default App
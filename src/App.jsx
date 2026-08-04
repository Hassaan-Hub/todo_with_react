import { Route, Routes } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Dashboard from './components/Authentication/Dashboard'
import Login from './components/Authentication/Login'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-slate-100'>
      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
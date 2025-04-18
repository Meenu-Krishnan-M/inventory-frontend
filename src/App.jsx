import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import StaffLogin from './pages/staff/StaffLogin'
import StaffDashboard from './pages/staff/StaffDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import Products from './pages/admin/Products'
import Staff from './pages/admin/Staff'

function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/staff/login' element={<StaffLogin/>}/>
    <Route path='/staff/dashboard' element={<StaffDashboard/>}/>
    {/* admin */}
    <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
    <Route path='/admin/addproduct' element={<Products/>}/>
    <Route path='/admin/staff' element={<Staff/>}/>
    </Routes>
    </>
  )
}

export default App

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import AdminSidebar from './AdminSidebar'
import AdminBoard from './AdminBoard'

function AdminDashboard() {
  return (
    <>
    <div className='container-fluid bg-white min-vh-100'>
        <div className="row">
            <div className="col-2 bg-dark ">
            <AdminSidebar/>
            </div>
            <div className="col-10">
              <AdminBoard/>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminDashboard
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import StaffSidebar from './StaffSidebar'
import SalesBoard from './SalesBoard'



function StaffDashboard() {
  return (
    <>
    <div className='container-fluid bg-white min-vh-100'>
        <div className="row">
            {/* <div className="col-2 bg-dark">
            <StaffSidebar/>
            </div> */}
            <div className="col-12">
              <SalesBoard/>
            </div>
        </div>
    </div>
    </>
  )
}

export default StaffDashboard
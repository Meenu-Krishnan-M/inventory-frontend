import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, toast } from 'react-toastify';

function StaffSidebar() {
    const handleLogout=()=>{
        alert('Logging out....')
      }
    
  return (
    <>
    <div className='bg-dark p-2' >
      <Navbar bg="dark" expand={false} className="flex-column min-vh-100 p-2 d-flex d-md-none ">
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasSidebar" className="w-50 text-white " />
          <Navbar.Offcanvas id="offcanvasSidebar" placement="start" className="bg-dark text-white">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-primary">INvTY</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column w-100">
                <Nav.Link href="/staff/dashboard" className="text-primary py-2">
                  <i className="bi bi-speedometer2 fs-5 me-3"></i>
                  Sales
                </Nav.Link>
                <Nav.Link href="/staff/profile" className="text-primary py-2">
                  <i className="bi bi-people fs-5 me-3"></i>
                  Profile
                </Nav.Link>
                <Nav.Link href="/" className="text-primary py-2 mt-2">
                  <i className="bi bi-back fs-5 me-3"></i>
                  Logout
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <div className="d-none d-md-flex flex-column bg-dark min-vh-100">
        <div className="text-primary d-flex align-items-center mb-3">
          <span className="brand-name ms-4 fs-4 mt-3 d-none d-md-inline">INvTY</span>
        </div>
        <div className='mt-3'>
          <Nav className="flex-column w-100 bg-white py-5 rounded">
            <Nav.Link href="/staff/dashboard" className="text-primary py-2">
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <span className='d-none d-md-inline'>Sales</span>
            </Nav.Link>
            <Nav.Link href="/staff/profile" className="text-primary py-2 mt-2">
              <i className="bi bi-people fs-5 me-3"></i>
              <span className='d-none d-md-inline'>Profile</span>
            </Nav.Link>
            <Nav.Link href="/" className="text-primary py-2 mt-2">
              <i className="bi bi-back fs-5 me-3"></i>
              <span onClick={handleLogout} className='d-none d-md-inline'>Logout</span>
            </Nav.Link>
          </Nav>
        </div>
      </div>
       <ToastContainer position='top-center' theme='colored' autoClose={1000} />
      </div>
    </>
  )
}

export default StaffSidebar
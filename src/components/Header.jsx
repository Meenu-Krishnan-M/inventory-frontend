import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Navbar expand="lg" className="bg-black text-primary ">
      <Container fluid>
        <Navbar.Brand href="/" className='ms-5 fs-3 text-primary'>Inventory</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="navbarScroll"  />
        <Navbar.Collapse id="navbarScroll"> */}
          <Nav className="me-auto my-4 my-lg-0 mx-5 fs-5 text-primary" style={{ maxHeight: '100px' }} navbarScroll>
          </Nav>
          
         <Link to={'/admin/login'}> <h3 className=''><FontAwesomeIcon icon={faUser}  className='me-5 fs-4 text-primary'/></h3></Link>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
    </>
  )
}

export default Header
import React from 'react'
import { Button, Col, Container, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header />
      <Container fluid className="home-section bg-light py-5 min-vh-100 " >
        <Row className="align-items-center">
          {/* Left Side: Text Content */}
          <Col md={6} className="text-center text-md-start">
            <h2
              className="fw-bold ms-5"
              style={{
                background: 'linear-gradient(45deg,rgb(78, 196, 42),rgb(51, 55, 56))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              INVENTORY MANAGEMENT SYSTEM
            </h2>

            <p className="text-muted text-justify ms-5 mt-3">
              The best software to manage and track your inventory seamlessly.
              Improve efficiency and reduce errors with our top-rated solution.
            </p>
            <Link to={'/staff/login'}><Button variant="primary" size="lg" className="ms-5 mt-4">
              Visit Now
            </Button></Link>
          </Col>

          {/* Right Side: Image */}
          <Col md={6} className="text-center">
            <Image
              src="https://cdni.iconscout.com/illustration/premium/thumb/young-man-working-on-automated-warehouse-management-illustration-download-in-svg-png-gif-file-formats--smart-factory-production-pack-e-commerce-shopping-illustrations-5625433.png"
              alt="Inventory System"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home
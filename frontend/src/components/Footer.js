import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import logo from "../assets/logo.png"
const Footer = () => {
  return (
    <footer className='footer py-4 bg-dark'>
      <Container>
        <Row className='justify-content-center align-items-center'>
          <Col xs={12} md={6}>
            <img src={logo} alt='' className='logo' />
          </Col>
          <Col xs={12} md={6} className='text-center text-md-left mb-3 mb-md-0'>
            <div className='social-icons mb-3 mb-md-0'>
              <a
                href='https://www.facebook.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='mr-3'
              >
                <FaFacebook />
              </a>
              <a
                href='https://twitter.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='mr-3'
              >
                <FaTwitter />
              </a>
              <a
                href='https://www.instagram.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} className='text-center text-md-right'>
            <div className='footer-links'>
              <Link to='/clothing' className='text-white mr-3'>
                Clothing
              </Link>
              <Link to='/shoes' className='text-white mr-3'>
                Shoes
              </Link>
              <Link to='/accesory' className='text-white mr-3'>
                Accessories
              </Link>
              <Link to='/african' className='text-white'>
                Custom African
              </Link>
            </div>
          </Col>
          <Col xs={12} className='text-center mt-3'>
            <p className='footer-text mb-0 text-white'>
              Amina Shop &copy; {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

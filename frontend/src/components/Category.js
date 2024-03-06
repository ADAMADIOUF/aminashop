import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import a from "../assets/c1.png"
import b from '../assets/c2.png'
import c from '../assets/c3.png'


const Category = ({ image, title, description, link }) => {
  return (
    <div className='category'>
      <h3>Category Showcase</h3>
      <Card className='category-card'>
        <Row>
          <Col>
            <Link to={link}>
              <Card.Img variant='top' src={a} alt={title} />
            </Link>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Link to="/clothing" className='btn btn-primary'>
                Shop Now
              </Link>
            </Card.Body>
          </Col>
          <Col>
            <Link to={link}>
              <Card.Img variant='top' src={b} alt={title} />
            </Link>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Link to="/shoes" className='btn btn-primary'>
                Shop Now
              </Link>
            </Card.Body>
          </Col>
          <Col>
            <Link to={link}>
              <Card.Img variant='top' src={c} alt={title} />
            </Link>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Link to="accesory" className='btn btn-primary'>
                Shop Now
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Category

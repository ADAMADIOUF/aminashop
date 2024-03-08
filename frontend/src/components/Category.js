import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import a from "../assets/c1.png"
import b from '../assets/c2.png'
import c from '../assets/c3.png'
import d from '../assets/c4.png'
const Category = () => {
  return (
    <div className='category section-center'>
      <h3>Category Showcase</h3>
      <Card className='category-card'>
        <Row>
          <Col>
            <Link to='/clothing'>
              <Card.Img variant='top' src={a} alt='' />
            </Link>
            <Card.Body>
              <Link to='/clothing' className='btn btn-primary'>
                Shop Now
              </Link>
            </Card.Body>
          </Col>
          <Col>
            <Link to='/shoes'>
              <Card.Img variant='top' src={b} alt='' />
            </Link>
            <Card.Body>
              <Link to='/shoes' className='btn btn-primary'>
                Shop Now
              </Link>
            </Card.Body>
          </Col>
        </Row>
        <Col>
          <Link to='/accesory'>
            <Card.Img variant='top' src={c} alt='' />
          </Link>
          <Card.Body>
            <Link to='/accesory' className='btn btn-primary'>
              Shop Now
            </Link>
          </Card.Body>
        </Col>
        <Col>
          <Link to='/african'>
            <Card.Img variant='top' src={d} alt='' />
          </Link>
          <Card.Body>
            <Link to='/african' className='btn btn-primary'>
              Shop Now
            </Link>
          </Card.Body>
        </Col>
      </Card>
    </div>
  )
}

export default Category

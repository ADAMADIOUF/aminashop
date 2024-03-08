import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import {  useGetProductsAfricanQuery } from '../Slices/productApiSlice'
import Message from './Message'
import Loader from './Loader'

const African = () => {
  const { data, isLoading: loading, error } = useGetProductsAfricanQuery()

  // Check if data is still loading
  if (loading) {
    return <Loader/>
  }

  // Check for errors
  if (error) {
    return <Message/>
  }

  // Check if data is available
  if (!data) {
    return <p>No data available.</p>
  }

  // Filter products by category
  const shoesProducts = data.products.filter(
    (product) => product.category === 'African'
  )

  return (
    <div>
      <h2>Custom African Wear</h2>
      <p>
        Discover our collection of stunning African-inspired clothing, perfect
        for any occasion.
      </p>
      <Row>
        {shoesProducts.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              <Link to={`/product/${product._id}`}>
                <Card.Img
                  src={product.images[0]}
                  variant='top'
                  className='product-image'
                />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as='div' className='product-title'>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as='div'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text as='h3'>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default African

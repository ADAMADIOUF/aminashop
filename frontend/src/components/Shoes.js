import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link,  } from 'react-router-dom'
import Rating from './Rating'
import {  useGetProductsShoesQuery } from '../Slices/productApiSlice'
import Message from './Message'
import Loader from './Loader'

const Shoes = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  
  const {
    data,
    isLoading: loading,
    error,
  } = useGetProductsShoesQuery()

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
    (product) => product.category === 'Shoes'
  )
  console.log(shoesProducts);

  return (
    <>
      <h2>Stylish Shoes Collection</h2>
      <p>
        Explore our diverse range of shoes, crafted with comfort and style in
        mind, perfect for every step of your journey.
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
                <Card.Text as='h3'>{product.price} CFA</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Shoes

import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { useGetProductsAccesoryQuery} from '../Slices/productApiSlice'
import Loader from './Loader'
import Message from './Message'

const Accesory = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  
  const { data, isLoading: loading, error } = useGetProductsAccesoryQuery()

  if (loading) {
    return <Loader/>
  }

  
  if (error) {
    return <Message/>
  }


  if (!data) {
    return <p>No data available.</p>
  }

  // Filter products by category
  const shoesProducts = data.products.filter(
    (product) => product.category === 'Accesory'
  )
  

  return (
    <div>
      <h2>Elegant Accessories Showcase</h2>
      <p>
        Explore our curated selection of accessories, meticulously crafted to
        add sophistication and flair to any ensemble, from statement pieces to
        everyday essentials.
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
    </div>
  )
}

export default Accesory

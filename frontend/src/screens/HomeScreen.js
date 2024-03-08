import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../Slices/productApiSlice'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

import Category from '../components/Category'
import Banner from '../components/Banner'
import HomeAfrican from '../components/HomeAfrican'
import SliderHeader from '../components/SliderHeader'
import Delivery from '../components/Delivery'


const HomeScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  const { pageNumber, keyword } = useParams()
  const {
    data,
    isLoading: loading,
    error,
  } = useGetProductsQuery({ pageNumber, keyword })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  if (!data || !data.products || data.products.length === 0) {
    return (
      <>
        <Link to='/' className='btn btn-light my-3'>
          Go Back
        </Link>
        <Message variant='info'>No products found</Message>
      </>
    )
  }

  return (
    <>
      {!keyword ? (
        <SliderHeader />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {!keyword && <Category />}

      {!keyword && <h1>Best Sellers</h1>}
      <Row>
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ''}
      />
      {!keyword && <Banner />}
      {!keyword && <HomeAfrican />}
      {!keyword && <Delivery />}
    </>
  )
}

export default HomeScreen

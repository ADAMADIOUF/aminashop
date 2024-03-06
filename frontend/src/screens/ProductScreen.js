import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useCreateReviewMutation, useDeleteReviewMutation, useGetproductDetailQuery } from '../Slices/productApiSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart } from '../Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import Meta from '../components/Meta'


const ProductScreen = () => {
   const [mainImage, setMainImage] = useState('')
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[qty,setQty]=useState(1)
  const {
    data: product,
    refetch,
    isLoading: loading,
    error,
  } = useGetproductDetailQuery(productId)
  console.log(product);
 const [rating, setRating] = useState(0)
 const [comment, setComment] = useState('')
 const [createReview, { isLoading: loadingProductReview }] =
   useCreateReviewMutation()
   const [deleteReview, { isLoading: loadingdeletedReview }] =
     useDeleteReviewMutation()
    const { userInfo } = useSelector((state) => state.auth)
 const addToCartHandler = () => {
   dispatch(addToCart({ ...product, qty }))
   navigate(`/cart/`)
 }
 const submitHandler = async (e) => {
   e.preventDefault()
   try {
     await createReview({
       productId,
       rating,
       comment,
     }).unwrap()
     refetch()
     toast.success('Review Submited')
     setRating(0)
     setComment('')
   } catch (error) {
     toast.error(error?.data?.message || error.error)
   }
 }
 const deleteReviewHandler = async (reviewId) => {
   try {
     await deleteReview({ productId, reviewId }).unwrap()
     refetch()
     toast.success('Review Deleted')
   } catch (error) {
     toast.error(error?.data?.message || error.error)
   }
 }
const handleThumbnailImageClick = (image) => {
  setMainImage(image)
}
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Message variant='danger'>{error}</Message>
  }

  return (
    <>
      <Link to={`/`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <Meta title={product.name} />
      <Row>
        <Col md={5}>
          <Image
            src={mainImage || product.images[0]}
            alt={product.name}
            fluid
          />

          <div className='mt-3 thumbnail-container'>
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                thumbnail
                className={`thumbnail ${
                  mainImage === image ? 'thumbnail-active' : ''
                }`}
                onClick={() => handleThumbnailImageClick(image)}
                style={{ cursor: 'pointer', width: '50px', height: '50px' }}
              />
            ))}
          </div>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No reviews</Message>}
          <ListGroup variant='flush'>
            {product.reviews.map((review) => (
              <ListGroupItem key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
                {userInfo && review.user === userInfo._id && (
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteReviewHandler(review._id)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </ListGroupItem>
            ))}
            <ListGroupItem>
              <h2>Write a Customer Review</h2>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating' className='my-2'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1-Poor</option>
                      <option value='2'>2-Fair</option>
                      <option value='3'>3-Good</option>
                      <option value='4'>4-Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment' className='my-2'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type='submit'
                    variant='primary'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please<Link to={`/login`}>Sign In</Link> to write a review
                </Message>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen

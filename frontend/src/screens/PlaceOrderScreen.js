import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import CheckoutSteps from '../components/CheckoutSteps'
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { useCreateOrderMutation } from '../Slices/orderApiSlice'
import { clearCartItems } from '../Slices/cartSlice'
const PlaceOrderScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const [createdOrder, { isLoading, error }] = useCreateOrderMutation()
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])
  const placeOrderHandler = async () => {
    try {
      const res = await createdOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error.message || JSON.stringify(error))
    }
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city}
                {cart.shippingAddress.postalCode}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2> Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}x{item.price}CFA= {item.qty * item.price}CFA
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items:</Col>
                  <Col>{cart.itemsPrice} CFA</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{cart.shippingPrice} CFA</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{cart.taxPrice} CFA</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>{cart.totalPrice} CFA</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant='danger'>{error.message}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen

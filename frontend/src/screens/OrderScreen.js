import React, { useEffect } from 'react'
import {
  useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation,
  useDeliverOrderMutation
} from '../Slices/orderApiSlice'
import { toast } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ContactForm from '../components/ContactForm'
const OrderScreen = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  const { id: orderId } = useParams()
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId)
const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
const {
  data: paypal,
  isLoading: loadingPayPal,
  error: errorPayPal,
} = useGetPayPalClientIdQuery()
const[deliverOrder,{isLoading:loadingDeliver}]=useDeliverOrderMutation()
  const { userInfo } = useSelector((state) => state.auth)
useEffect(() => {
  if (!errorPayPal && !loadingPayPal && paypal.clientId) {
    const loadPayPalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'XAF', // Change currency to Franc CFA
        },
      })
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
    }
    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPayPalScript()
      }
    }
  }
}, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

function onApprove(data, actions) {
  return actions.order.capture().then(async function (details) {
    try {
      await payOrder({ orderId, details })
      refetch()
      toast.success(`Payment
  successful`)
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  })
}

function onError(error) {
  toast.error(error.message)
}
function createOrder(data, actions) {
  return actions.order
    .create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    })
    .then((orderId) => {
      return orderId
    })
}

const deliverHandler = async () => {
  try {
    await deliverOrder(orderId)
    refetch()
    toast.success('Order delivered')
  } catch (error) {
    toast.error(error?.data?.message || error.message)
  }
}
  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger' />
  ) : (
    <>
      <h1>Order id {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.images[0]} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x {item.price} CFA ={item.qty * item.price} CFA
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
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
                  <Col>Items</Col>
                  <Col>{order.itemsPrice} CFA</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{order.shippingPrice} CFA</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>{order.taxPrice} CFA</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} CFA</Col>
                </Row>
              </ListGroupItem>

              {order.paymentMethod === 'Cash on Delivery' && !order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                        <ContactForm />
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              )}
              {order.paymentMethod !== 'Cash on Delivery' && !order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroupItem>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroupItem>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen

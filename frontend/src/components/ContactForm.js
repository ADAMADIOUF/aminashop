import React, { useState, useEffect } from 'react'

import { useSendContactFormMutation } from '../Slices/contactApiSlice'
import { useLocation, useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../Slices/orderApiSlice'
import { Col, Row, Form, Button, Alert } from 'react-bootstrap' // Import the necessary components from React Bootstrap

const Contact = () => {
  const location = useLocation()
  const { id: orderId } = useParams()
  const { data: order } = useGetOrderDetailsQuery(orderId)
  console.log(order);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    description: '',
    address: '',
    totalPrice: order ? order.totalPrice : '', // Initialize totalPrice with order total price or empty string
    productName:
      order && order.orderItems.length > 0
        ? order.orderItems.map((item) => item.name).join(', ')
        : '',
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Update totalPrice in formData whenever order changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice: order ? order.totalPrice : '', // Set totalPrice to order total price or empty string
    }))
  }, [location, order])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let emailContent = `
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Phone Number: ${formData.phone}
        Address: ${formData.address}
        Description: ${formData.description}`

      // Add total price to email content if available
      if (formData.totalPrice) {
        emailContent += `\nTotal Price: $${formData.totalPrice}`
      }

      setIsFormSubmitted(true)
      setTimeout(() => {}, 5000)

      const result = await sendContactForm({
        ...formData,
        message: emailContent,
      })

      setFormData({
        firstName: '',
        lastName: '',
        subject: '',
        phone: '',
        description: '',
        address: '',
        totalPrice: '',
        productName: '', // Reset productName state after form submission
      })
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <>
      {!isFormSubmitted && (
        <Form onSubmit={handleSubmit}>
          <h2>Billing details</h2>
          <Form.Group controlId='firstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId='lastName'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId='phoneNumber'>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type='tel'
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId='totalPrice'>
            <Form.Label>Prix Total CFA:</Form.Label>
            <Form.Control
              type='text'
              value={formData.totalPrice}
              onChange={(e) =>
                setFormData({ ...formData, totalPrice: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId='productName'>
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type='text'
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
          </Form.Group>
          <Button type='submit' className='btn-contact' disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </Button>
          {isError && (
            <Alert variant='danger' className='mt-3'>
              An error occurred while submitting the form. Please try again.
            </Alert>
          )}
        </Form>
      )}
      {isFormSubmitted && !isError && (
        <Alert variant='success' className='mt-3'>
          Message sent successfully! We will respond to you soon.
        </Alert>
      )}
    </>
  )
}

export default Contact

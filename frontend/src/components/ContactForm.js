import React, { useState, useEffect } from 'react'
import { useSendContactFormMutation } from '../Slices/contactApiSlice'
import { useLocation, useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../Slices/orderApiSlice'
import { Col, Row } from 'react-bootstrap'

const Contact = () => {
  const location = useLocation()
  const { id: orderId } = useParams()
  const { data: order } = useGetOrderDetailsQuery(orderId)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    description: '',
    address: '',
    totalPrice: order ? order.totalPrice : '', // Initialize totalPrice with order total price or empty string
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

       
        setTimeout(() => {
          setIsFormSubmitted(false)
        }, 5000)
     
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
        totalPrice:""
      })
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='section-center'>
      <h2>Billing details</h2>
      <div>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          id='firstName'
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          id='lastName'
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor='phoneNumber'>Phone Number:</label>
        <input
          type='tel'
          id='phoneNumber'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor='address'>Address:</label>
        <textarea
          id='address'
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>
      <div className='order-input'>
        <label htmlFor='totalPrice'>prix total CFA:</label>
        <input
          type='text'
          id='totalPrice'
          name='totalPrice'
          value={formData.totalPrice}
          onChange={(e) =>
            setFormData({ ...formData, totalPrice: e.target.value })
          }
        />
      </div>
      <button type='submit' className='btn-contact' disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
      {isFormSubmitted && !isError && (
        <p className='success-message'>
          Message sent successfully! We will respond to you soon.
        </p>
      )}
      {isError && (
        <p className='error-message'>
          An error occurred while submitting the form. Please try again.
        </p>
      )}
    </form>
  )
}

export default Contact

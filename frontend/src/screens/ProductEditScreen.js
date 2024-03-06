import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
useGetproductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../Slices/productApiSlice'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Form } from 'react-bootstrap'
const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
   const [images, setImages] = useState([])
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetproductDetailQuery(productId)
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImages(product.images)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      productId,
      name,
      price,
      images,
      brand,
      category,
      countInStock,
      description,
    }
    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Product updated')
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()

    // Append each selected file to the formData object
    for (let i = 0; i < Math.min(e.target.files.length, 5); i++) {
      formData.append('images', e.target.files[i])
    }

    try {
      const res = await uploadProductImage(formData).unwrap()
      const uploadedImages = res.images

      // Concatenate the newly uploaded images with the existing ones
      setImages((prevImages) => [...prevImages, ...uploadedImages])

      toast.success(res.message)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const deleteImageHandler = (index) => {
    // Create a new array of images excluding the one to delete
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }
  return (
    <>
      <Link to={`/admin/productlist`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image' className='my-2'>
              <label htmlFor='images'>Images</label>
              <input
                type='file'
                id='images'
                multiple // Allow multiple file selection
                onChange={uploadFileHandler}
              />
              {images && images.length > 0 && (
                <div className='mt-2'>
                  {images.map((image, index) => (
                    <div key={index} className='mb-2'>
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className='img-thumbnail mr-2'
                        style={{ width: '100px', height: '100px' }}
                      />
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => deleteImageHandler(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen

import express from "express"
import { createProduct, createProductReview, deleteProduct, deleteProductReview, getPorducts, getPorductsClothing, getPorductsShoes, getSingleProduct, getTopProducts, updateProduct } from "../controllers/productController.js"
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route(`/shoes`).get(getPorductsShoes)
router.route(`/clothing`).get(getPorductsClothing)
router.route(`/`).get(getPorducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router
  .route(`/:id`)
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

router.route('/:id/reviews').post(protect, createProductReview)
router.delete('/:id/reviews/:reviewId', protect, deleteProductReview)

export default router
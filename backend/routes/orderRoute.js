import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updatedOrderToDelivered, updatedOrderToPaid } from '../controllers/orderController.js'
const router = express.Router()
router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updatedOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updatedOrderToDelivered)



export default router
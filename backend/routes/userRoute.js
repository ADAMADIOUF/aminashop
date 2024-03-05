import express from "express"
import {
  login,
  register,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deletedUser,
  getUserByID,
  updatedUser,
} from '../controllers/userController.js'
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()
router.route('/').post(register).get(protect,admin,getUsers)

router.post("/logout",logout)
router.post('/login', login)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deletedUser)
  .get(getUserByID)
  .put(protect, admin,updatedUser)


export default router
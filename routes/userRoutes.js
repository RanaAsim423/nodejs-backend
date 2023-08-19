import express from "express";
const router = express.Router();
import UserController from '../controller/userController.js'

// public routes
router.post('/register', UserController.userReginstration)
router.post('/login', UserController.userLogin)


// private route

export default router

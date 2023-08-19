import express from "express";
const router = express.Router();
import ProductController from '../controller/productController.js'
import UserController from '../controller/userController.js'
import OrderController from '../controller/orderController.js'
import CategoryController from '../controller/categoryController.js'
import {requireSignin} from "../config/middlewares.js";

const mid = (req, res, next) => {
    console.log(req.headers)
}
router.get('/GetAllProducts',ProductController.GetAllProducts)
router.get('/GetProductForHome',ProductController.GetAllProductsListHome)
router.get('/GetAllCategoriesList',CategoryController.GetAllCategory)
router.get('/GetAllProductsForListing',ProductController.GetAllProductsList)
router.post('/register',UserController.userReginstration)
router.post('/login',UserController.userLogin)
router.post('/GetloginUserInfo',requireSignin,UserController.GetloginUserInfo)
router.post('/CheckOutRequest',requireSignin, OrderController.CheckOutRequest)
router.get('/orders/:id',requireSignin, OrderController.getAllOrders)
router.get('/productDetail/:id', ProductController.productDetail)



// private route

export default router

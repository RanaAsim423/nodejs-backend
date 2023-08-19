import express from "express";
const router = express.Router();
import AuthController from '../controller/authController.js'
import CategoryController from '../controller/categoryController.js'
import ProductController from '../controller/productController.js'
import OrderController from "../controller/orderController.js";
import {adminMiddleware, requireSignin} from '../config/middlewares.js'

const mid = (req, res, next) => {
    console.log(req.headers)
}
// private routes
router.post('/PortalRegister', AuthController.portalhReginstration)
router.post('/PortalLogin', AuthController.portalLogin)
router.post('/categoryAdd',requireSignin,adminMiddleware, CategoryController.AddCategory)
router.get('/GetAllCategory',requireSignin,adminMiddleware, CategoryController.GetAllCategory)
router.post('/EditCategory',requireSignin,adminMiddleware, CategoryController.EditCategory)
router.post('/CategoryUpdate',requireSignin,adminMiddleware, CategoryController.CategoryUpdate)
router.post('/CategoryDelete',requireSignin,adminMiddleware, CategoryController.CategoryDelete)
router.get('/GetAllProducts',requireSignin,adminMiddleware, ProductController.GetAllProducts)
router.post('/ProductAdd',requireSignin,adminMiddleware, ProductController.ProductAdd)
router.post('/ProductEdit',requireSignin,adminMiddleware, ProductController.ProductEdit)
router.get('/ProductDelete/:id',requireSignin,adminMiddleware, ProductController.ProductDelete)
router.get('/orders',requireSignin,adminMiddleware, OrderController.getAllOrdersAdmin)


export default router

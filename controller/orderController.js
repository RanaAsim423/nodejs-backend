import multer from "multer";
import Order from "../models/Order.js";
import mongoose from "mongoose";
import order from "../models/Order.js";
const upload = multer({
    dest: './upload/',
    limits: {
        fileSize: 1000000,
    }
})

class OrderController{
    static CheckOutRequest = async (req, res) => {
        const {cart,checkout} = req.body;
        console.log(cart,"====",checkout)
        try{
            const {userId,email,name,phone,country,city,zipcode,address,notes,paymentMethod,charges,total} = checkout;
           const orderSave =  await new Order({
                userId:userId,
                email:email,
                name:name,
                phone:phone,
                country:country,
                city:city,
                zipcode:zipcode,
                address:address,
                notes:notes,
                paymentMethod:paymentMethod,
                charges:charges,
                total:total,
                orderDetails:cart
            })
            await orderSave.save();
            res.status(200).send({
                status:"Success",
                message:"Order Place Successfully",
                data: orderSave
            })
        }catch (e) {
            console.log(e)
            res.status(500).send({
                status:"Failed",
                message:"Server Error",
            })
        }
    }
    static getAllOrders = async (req, res) => {
        try{
            const orders = await Order.find({userId:req.params.id});
            res.status(200).send({
                status:"Success",
                message:"Order History",
                orders: orders
            })
        }catch (e) {
            res.status(500).send({
                status:"Failed",
                message:"Server Error",
            })
        }

    }

    static getAllOrdersAdmin = async (req, res) => {
        try{
            const orders = await Order.find();
            res.status(200).send({
                status:"Success",
                message:"Order History",
                orders: orders
            })
        }catch (e) {
            res.status(500).send({
                status:"Failed",
                message:"Server Error",
            })
        }

    }
}

export default OrderController

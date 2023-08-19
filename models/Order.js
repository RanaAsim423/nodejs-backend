import mongoose from "mongoose";
// define user schema
const rendomOrderId = () => {
    const min = 10;
    const max = 10;
    const RId = Math.floor(Math.random() * (max - min + 999999999) ) + min;
    return `#${RId}`
}
const orderSchema = new mongoose.Schema({
        userId:{
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true
        },
        orderId:{
            type:String,
            default: rendomOrderId()
        },
        email:{type:String, required:true},
        name:{type:String, required:true},
        phone:{type:String, required:true},
        country:{type:String, required:true},
        city:{type:String,required:true},
        zipcode:{type:String,required:true},
        address:{type:String,required:true},
        notes:{type:String},
        paymentMethod:{type:String},
        charges:{type:String},
        total:{type:String},
        orderStatus:{type:String,default:"Pending"},
        orderDetails:[
            {
                id: {
                    type: mongoose.Schema.ObjectId,
                    ref: "products",
                    required: true
                },
                Name:{type:String, required:true},
                Price:{type:String, required:true},
                Slug:{type:String, required:true},
                Thumbnail:{type:String, required:true},
                cartQuantity:{type:String, required:true},
            },{ timestamps: true }
        ]
    },
    { timestamps: true }
)
const OrderModel = mongoose.model("orders", orderSchema)
export default OrderModel

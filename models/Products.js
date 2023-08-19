import mongoose from "mongoose";

// define user schema
const productsSchema = new mongoose.Schema({
        ProductName: {type: String, required: true},
        ProductCategory: {
            type: mongoose.Schema.ObjectId,
            ref: "categories",
            required: true
        },
        ProductSlug: {type: String, required: true, trim: true},
        ProductMK: {type: String, required: true},
        ProductMD: {type: String, required: true},
        ProductPrice: {type: String, required: true},
        ProductWeight: {type: String,default:"N/A"},
        ProductQuantity: {type: String,default:"N/A"},
        ProductDescription: {type: String, required: true},
        ProductStatus: {type: String, default: "Active"},
        ProductShowOnHome: {type: String, default: "No"},
        ProductThumbnail: {type: String},
        ProductImage1: {type: String},
        ProductImage2: {type: String},
        ProductImage3: {type: String},
        ProductImage4: {type: String},
    },
    {timestamps: true}
)
const ProductModel = mongoose.model("products", productsSchema)
export default ProductModel

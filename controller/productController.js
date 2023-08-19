import ProductModel from "../models/Products.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from "multer";
import Order from "../models/Order.js";
import Products from "../models/Products.js";
import CategoryModel from "../models/Category.js";
const upload = multer({
    dest: './upload/',
    limits: {
        fileSize: 1000000,
    }
})


class ProductController{

    static ProductAdd = async (req, res) =>{
        try{
            const{ProductName, ProductCategory, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductWeight, ProductQuantity, ProductDescription,
                ProductStatus, ProductShowOnHome}  = req.body
            console.log(req.body,req.files)
            const createProduct = await new ProductModel({
                ProductName:ProductName,
                ProductCategory:ProductCategory,
                ProductSlug:ProductSlug,
                ProductMK:ProductMK,
                ProductMD:ProductMD,
                ProductPrice:ProductPrice,
                ProductWeight:ProductWeight,
                ProductQuantity:ProductQuantity,
                ProductDescription:ProductDescription,
                ProductStatus:ProductStatus,
                ProductShowOnHome:ProductShowOnHome,
            })
            await createProduct.save()
            const CheckFiles = req.files
            const {ProductThumbnail , ProductImage1, ProductImage2, ProductImage3, ProductImage4} = req.files
            if(CheckFiles === null){
                console.log("nofile")
            }else if(CheckFiles !== null) {
                if (ProductThumbnail !== undefined) {
                    let GetFile = ProductThumbnail;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductThumbnail: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage1 !== undefined) {
                    let GetFile = ProductImage1;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage1: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage2 !== undefined) {
                    let GetFile = ProductImage2;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage2: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage3 !== undefined) {
                    let GetFile = ProductImage3;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage3: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage4 !== undefined) {
                    let GetFile = ProductImage4;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage4: randomString + '.' + ext,
                        }
                    })
                }
            }
            const Products = await ProductModel.findOne({_id : createProduct._id}).populate('ProductCategory',{_id:1,CategoryName:1}).exec();
            console.log(Products)
            res.status(200).send({
                status:"Success",
                message:"Product Add Successfully",
                product: Products
            })

        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error",

            })
        }
    }

    static GetAllProducts = async (req, res) => {
        try{
            const AllProducts = await ProductModel.find().populate('ProductCategory',{_id:1,CategoryName:1}).exec();
            console.log(AllProducts)
            res.status(200).send({
                status:"Success",
                message:"Get All Products",
                products:AllProducts
            })
        }catch (error){
            console.log(error)
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static ProductEdit = async (req, res) => {
        try{
            const{id,ProductName, ProductCategory, ProductSlug, ProductMK, ProductMD, ProductPrice, ProductWeight, ProductQuantity, ProductDescription,
                ProductStatus, ProductShowOnHome}  = req.body
           // console.log(req.body,req.files)
            const createProduct = await ProductModel.findByIdAndUpdate(id,{
                $set:{
                    ProductName:ProductName,
                    ProductCategory:ProductCategory,
                    ProductSlug:ProductSlug,
                    ProductMK:ProductMK,
                    ProductMD:ProductMD,
                    ProductPrice:ProductPrice,
                    ProductWeight:ProductWeight,
                    ProductQuantity:ProductQuantity,
                    ProductDescription:ProductDescription,
                    ProductStatus:ProductStatus,
                    ProductShowOnHome:ProductShowOnHome,
                }
            })
            const CheckFiles = req.files
            console.log(CheckFiles)
            if(CheckFiles === null){
                console.log("nofile")
            }else if(CheckFiles !== null) {
                const {ProductThumbnail , ProductImage1, ProductImage2, ProductImage3, ProductImage4} = CheckFiles
                if (ProductThumbnail !== undefined) {
                    let GetFile = ProductThumbnail;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductThumbnail: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage1 !== undefined) {
                    let GetFile = ProductImage1;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage1: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage2 !== undefined) {
                    let GetFile = ProductImage2;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage2: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage3 !== undefined) {
                    let GetFile = ProductImage3;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage3: randomString + '.' + ext,
                        }
                    })
                }
                if (ProductImage4 !== undefined) {
                    let GetFile = ProductImage4;
                    let getFileName = GetFile.name;
                    let ext = getFileName.split(".").pop();
                    let randomString = Math.random().toString(36).substr(2, 14);
                    let uploadPath = './public/uploads/products/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await ProductModel.findByIdAndUpdate( createProduct._id,{
                        $set:{
                            ProductImage4: randomString + '.' + ext,
                        }
                    })
                }
            }
            const Products = await ProductModel.findOne({_id : createProduct._id}).populate('ProductCategory',{_id:1,CategoryName:1}).exec();
            console.log(Products)
            res.status(200).send({
                status:"Success",
                message:"Product Edit Successfully",
                product: Products
            })

        }catch (error){
            console.log(error)
            res.status(500).send({
                status:"Failed",
                message:"Server Error",

            })
        }
    }

    static GetAllProductsList = async (req, res) => {
        try{
            const AllProducts = await ProductModel.find().where({ProductStatus:"Active"}).populate('ProductCategory',{_id:1,CategoryName:1}).exec();
            console.log(AllProducts)
            res.status(200).send({
                status:"Success",
                message:"Get All Products",
                products:AllProducts
            })
        }catch (error){
            console.log(error)
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static GetAllProductsListHome = async (req, res) => {
        try{
            const AllProducts = await ProductModel.find().where({ProductStatus:"Active"}).where({ProductShowOnHome:"Yes"}).populate('ProductCategory',{_id:1,CategoryName:1}).limit("9").exec();
            console.log(AllProducts)
            res.status(200).send({
                status:"Success",
                message:"Get All Products",
                products:AllProducts
            })
        }catch (error){
            console.log(error)
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static productDetail = async (req,res) => {
        try{
            const orders = await ProductModel.findOne({ProductSlug:req.params.id});
            res.status(200).send({
                status:"Success",
                message:"Product Details",
                productDetails: orders
            })
        }catch (e) {
            res.status(500).send({
                status:"Failed",
                message:"Server Error",
            })
        }
    }

    static ProductDelete = async (req,res) =>{
        const id = req.params.id
        try{
            const Productydelete = await ProductModel.findOneAndDelete({ _id: id });
            res.status(200).send({
                status:"Success",
                message:"Product Deleted Successfully",
            })
        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

}

export default ProductController

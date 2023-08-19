import UserModel from "../models/User.js"
import CategoryModel from "../models/Category.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from "multer";
const upload = multer({
    dest: './upload/',
    limits: {
        fileSize: 1000000,
    }
})


class CategoryController{

    static AddCategory = async (req, res) =>{
        try{
            const {CategoryName,CategorySlug,CategoryMK,CategoryMD,CategoryStatus} = req.body
            const createCategory = await new CategoryModel({
                CategoryName:CategoryName,
                CategorySlug:CategorySlug,
                CategoryMK:CategoryMK,
                CategoryMD:CategoryMD,
                CategoryStatus:CategoryStatus,
            })
            await createCategory.save()
            const CheckFiles = req.files
            if(CheckFiles === null){
                console.log("nofile")
            }else if(CheckFiles !== null) {
                if (CheckFiles.CategoryImg !== undefined) {
                    const GetFile = CheckFiles.CategoryImg;
                    const getFileName = GetFile.name;
                    const ext = getFileName.split(".").pop();
                    const randomString = Math.random().toString(36).substr(2, 14);
                    const uploadPath = './public/uploads/categories/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await CategoryModel.findByIdAndUpdate( createCategory._id,{
                        $set:{
                            CategoryImg: randomString + '.' + ext,
                        }
                    })
                }
            }
            const Categories = await CategoryModel.findOne({_id : createCategory._id});
            console.log(Categories)
            res.status(200).send({
                status:"Success",
                message:"Category Add Successfully",
                category: Categories
            })

        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error",

            })
        }
    }

    static GetAllCategory = async (req, res) => {
        try{
            const AllCategories = await CategoryModel.find();
            res.status(200).send({
                status:"Success",
                message:"Get All Categories",
                categories:AllCategories
            })

        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static EditCategory = async (req, res) =>{
        try{
            const {cID} = req.body;
            const Categories = await CategoryModel.findOne({_id : cID});
            res.status(200).send({
                status:"Success",
                message:"Get Category By ID",
                categories:Categories
            })

        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static CategoryUpdate = async (req, res) =>{
        try{
            const {id,CategoryName,CategorySlug,CategoryMK,CategoryMD,CategoryStatus} = req.body;
            await CategoryModel.findByIdAndUpdate( id,{
                $set:{
                    CategoryName:CategoryName,
                    CategorySlug:CategorySlug,
                    CategoryMK:CategoryMK,
                    CategoryMD:CategoryMD,
                    CategoryStatus:CategoryStatus,
                }
            })
            const CheckFiles = req.files
            if(CheckFiles === null){
                console.log("nofile")
            }else if(CheckFiles !== null) {
                if (CheckFiles.CategoryImg !== undefined) {
                    const GetFile = CheckFiles.CategoryImg;
                    const getFileName = GetFile.name;
                    const ext = getFileName.split(".").pop();
                    const randomString = Math.random().toString(36).substr(2, 14);
                    const uploadPath = './public/uploads/categories/' + randomString + '.' + ext;
                    GetFile.mv(uploadPath, function(err) {});
                    await CategoryModel.findByIdAndUpdate( id,{
                        $set:{
                            CategoryImg: randomString + '.' + ext,
                        }
                    })
                }
            }
            const latestCategory = await CategoryModel.findOne({_id : id});
            res.status(200).send({
                status:"Success",
                message:"Category Updated Successfully",
                latestEditCategory : latestCategory
            })

        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static CategoryDelete = async (req, res) =>{
        const id = req.body.cId
        try{
            const Categorydelete = await CategoryModel.findOneAndDelete({ _id: id });
            console.log(Categorydelete)
            // if(Categorydelete)
            res.status(200).send({
                status:"Success",
                message:"Category Deleted Successfully",
            })
        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

}

export default CategoryController

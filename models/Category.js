import mongoose from "mongoose";

// define user schema
const categorySchema = new mongoose.Schema({
            CategoryName:{type:String, required:true},
            CategorySlug:{type:String, required:true, trim:true},
            CategoryMK:{type:String, required:true},
            CategoryMD:{type:String, required:true},
            CategoryStatus:{type:String,default:"Active"},
            CategoryImg:{type:String},
            SubCategories:[
                {
                    SubCategoryName: {type:String},
                    SubCategorySlug:{type:String, required:true, trim:true},
                    SubCategoryMK:{type:String, required:true},
                    SubCategoryMD:{type:String, required:true},
                    SubCategoryStatus:{type:String},
                    SubCategoryImg:{type:String},
                },{ timestamps: true }
            ]
    },
    { timestamps: true }
)
const CategoryModel = mongoose.model("categories", categorySchema)
export default CategoryModel

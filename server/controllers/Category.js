// const Tags = require("../models/Tags");
const Category = require("../models/category");

// create a tag
exports.createCategory = async (req,res) =>{
    try{
        const {name,description} = req.body;
        if(!name){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        };
        const CategorysDetails = await Category.create({
            name: name,
			description: description,
        });
        console.log(CategorysDetails);
        return res.status(200).json({
            success:true,
            message:"tag created successfully",
            data:CategorysDetails,
        })
    }catch(error){
        console.log("ERROR IN CREATING TAG ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN CREATING TAG"
        })
    }
}

// get all tags
exports.showAllCategory = async(req,res) =>{
    try{
        // console.log("Inside show category api call")
        const allCategorys = await Category.find({}, {name:true ,description:true});
        // console.log("Sending data",allCategorys)
        return res.status(200).json({
            success:true,
            message:"ALL TAGS ARE THESE",
            data:allCategorys
        })
    }catch(error){
        console.log("ERROR IN GETTING ALL TAGs ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN GETTING ALL TAGs"
        })
    }
}

// categoryPageDetails
exports.categoryPageDetails = async(req,res) =>{
    try{
        // get Categoryid
        const {categoryID} = req.body;
        // get Course for specified category
        const selectedCategory = await Category.findById({_id:categoryID})
                                                .populate("courses")
                                                .exec(); 
        // validation
        if(!selectedCategory){
            return res.status(500).json({
                success:false,
                message:"No Course avail for this Category"
            })
        }
        // get course for different categoires
        const differentCategories = await Category.find({
                                     _id:{$ne:categoryID}
                                    })
                                    .populate("courses")
                                    .exec();
        // get top selling courses : TODO -> HOMEWORK

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                // top selling category
            },
        })
    }catch(error){
        console.log("ERROR IN GETTING categoryPageDetails ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN GETTING categoryPageDetails"
        })
    }
}
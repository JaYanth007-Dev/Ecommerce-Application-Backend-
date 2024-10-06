const categoryModel = require("../models/category.model")

exports.createNewCategory =async (req,res) => {
    const cat_obj = {
        name: req.body.name,
        description: req.body.description
    }
    try {
        const category = await categoryModel.create(cat_obj)
        res.status(201).send(category)
    }
    catch (e) {
        console.log("Error while cerating caategory", e)
        res.status(400).send({
            message: "Error while creating category"
        })
    }
}




const NoText = require('../models/notextModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const text = await NoText.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            text,
            message: "Text creation successfully"
        }
    })
}

exports.deleteText = async(req,res) => {
    try{
        text = await NoText.findByIdAndDelete(req.params.id);
        if(!text) {
            return res.status(404).json("No text found")
        }
        res.status(204).json({
            status:"success",
            data:null
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to delete data",
            error: error.message
        })

    }
}

exports.deleteAll = async(req , res) => {
    try{
        
        text = await NoText.deleteMany()
        if(!text) {
            return res.status(404).json("No text found")
        }
        res.status(204).json({
            status:"success",
            data:null
        })


    }catch(error){
        res.status(500).json({
            message:"Failed to delete all data",
            error: error.message
        })
    }
}
exports.getById = async(req , res) => {
    try{
    const text = await NoText.findById(req.params.id)

    if(!text) {
        return res.status(404).json("No text found")
    }
    res.status(200).json({
        status:'success',
        data: text
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get text",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(NoText.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const text = await features.query
    res.status(200).json({
        status:"success",
        result:text.length,
        data:{
            text
        }
    })
}
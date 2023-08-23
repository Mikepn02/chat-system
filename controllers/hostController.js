const Host= require('../models/hostModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create= async(req ,res) => {
    const host = await Host.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            host,
            message: "host creation successfully"
        }
    })
}

exports.deleteHost = async(req,res) => {
    try{
        host = await Host.findByIdAndDelete(req.params.id);
        if(!host) {
            return res.status(404).json("No host found")
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
        
        host = await Host.deleteMany()
        if(!host) {
            return res.status(404).json("No host found")
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
    const host = await Host.findById(req.params.id)

    if(!text) {
        return res.status(404).json("No host found")
    }
    res.status(200).json({
        status:'success',
        data: text
    })

    }catch(error) {
        res.status(5000).json({
            message:"Failed to get hos",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Host.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const host = await features.query
    res.status(200).json({
        status:"success",
        result:host.length,
        data:{
            host
        }
    })
}
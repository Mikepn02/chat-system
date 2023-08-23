const Hits = require('../models/notextModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const hits = await Hits.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            hits,
            message: "hits creation successfully"
        }
    })
}

exports.deleteById = async(req,res) => {
    try{
        hits = await Hits.findByIdAndDelete(req.params.id);
        if(!text) {
            return res.status(404).json("No hits found")
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
        
        hits = await Hits.deleteMany()
        if(!hits) {
            return res.status(404).json("No hits found")
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
    const hits = await Hits.findById(req.params.id)

    if(!hits) {
        return res.status(404).json("No text found")
    }
    res.status(200).json({
        status:'success',
        data: hits
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get hits",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Hits.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const hits = await features.query
    res.status(200).json({
        status:"success",
        result:hits.length,
        data:{
            hits
        }
    })
}
const Bots = require('../models/botsListModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const bots = await Bots.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            bots,
            message: "Bots creation successfully"
        }
    })
}

exports.deleteBots = async(req,res) => {
    try{
        bots = await Bots.findByIdAndDelete(req.params.id);
        if(!bots) {
            return res.status(404).json("No Bots found")
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

exports.getById = async(req , res) => {
    try{
    const bots = await Bots.findById(req.params.id)

    if(!bots) {
        return res.status(404).json("No Bots found")
    }
    res.status(200).json({
        status:'success',
        data: bots
    })

    }catch(error) {
        res.status(5000).json({
            message:"Failed to get Bots",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Bots.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const bots = await features.query
    res.status(200).json({
        status:"success",
        result:bots.length,
        data:{
            bots
        }
    })
}
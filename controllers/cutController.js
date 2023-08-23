const Cut = require('../models/cutModel')
const APIFeatures = require('../utils/apiFeatures')




exports.createCut = async(req ,res) => {
    const cut = await Cut.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            band,
            message: "bsb creation successfully"
        }
    })
}

exports.deleteById = async(req,res) => {
    try{
        cut = await Cut.findByIdAndDelete(req.params.id);
        if(!bsb) {
            return res.status(404).json("No cut found")
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
    const cut = await Cut.findById(req.params.id)

    if(!bsb) {
        return res.status(404).json("No Bsb found")
    }
    res.status(200).json({
        status:'success',
        data: cut
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get cut",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Cut.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const cut= await features.query
    res.status(200).json({
        status:"success",
        result:bsb.length,
        data:{
            cut
        }
    })
}

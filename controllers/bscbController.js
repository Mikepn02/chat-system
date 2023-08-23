const Bsb = require('../models/bsbListModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create= async(req ,res) => {
    const bsb = await Bsb.create(req.body)

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
        bsb = await Bsb.findByIdAndDelete(req.params.id);
        if(!bsb) {
            return res.status(404).json("No bsb found")
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
    const bsb = await Bsb.findById(req.params.id)

    if(!bsb) {
        return res.status(404).json("No host found")
    }
    res.status(200).json({
        status:'success',
        data: bsb
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get host",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Bsb.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const bsb= await features.query
    res.status(200).json({
        status:"success",
        result:bsb.length,
        data:{
            bsb
        }
    })
}

exports.update = async(req,res) => {
    try{

        const bsb = await Bsb.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidator: true
         })
         if(!bsb) {
            return res.status(500).json("No bsb found")
         }
    
         res.status(200).json({
            status: 'success',
            data:{
                bsb
            }
         })

    }catch(error) {
        res.status(500).json("Failed to update")
    }
}

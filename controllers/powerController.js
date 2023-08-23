const  Power = require('../models/powersModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const power = await Power.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            power,
            message: "Power creation successfully"
        }
    })
}

exports.deleteText = async(req,res) => {
    try{
        let power = await NoText.findByIdAndDelete(req.params.id);
        if(!power) {
            return res.status(404).json("No power found")
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
        
        power = await Power.deleteMany()
        if(!power) {
            return res.status(404).json("No power found")
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
    const power = await Power.findById(req.params.id)

    if(!power) {
        return res.status(404).json("No power found")
    }
    res.status(200).json({
        status:'success',
        data: power
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get power",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Power.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const power = await features.query
    res.status(200).json({
        status:"success",
        result:power.length,
        data:{
            power
        }
    })
}

exports.update = async(req,res) => {
    try{

        const power = await Power.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidator: true
         })
         if(!power) {
            return res.status(500).json("No power found")
         }
    
         res.status(200).json({
            status: 'success',
            data:{
                power
            }
         })

    }catch(error) {
        res.status(500).json("Failed to update")
    }
}

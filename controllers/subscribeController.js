
const { subscribe } = require('diagnostics_channel')
const Subscribe = require('../models/subscribeModel')
const APIFeatures = require('../utils/apiFeatures')




exports.createText = async(req ,res) => {
    const subscribe = await Subscribe.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            subscribe,
            message: "subscribe creation successfully"
        }
    })
}

exports.delete = async(req,res) => {
    try{
        subscribe = await Subscribe.findByIdAndDelete(req.params.id);
        if(!text) {
            return res.status(404).json("No subscribe found")
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
        
        subscribe = await Subscribe.deleteMany()
        if(!subscribe) {
            return res.status(404).json("No subscribe found")
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

exports.getByIdUser = async(req ,res) => {
    const id = req.params.id

    try{

        const result = await Subscribe.find({iduser: id})
        
        if(result.length > 0) {
            res.json(result)
        }else{
            res.status(404).json({ message: 'No matching records found.' });
        }

    }catch(err){
        res.status(500).json({ error: 'An error occurred' });
    }
}
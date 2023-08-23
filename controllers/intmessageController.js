const Intromsg = require('../models/intomsgModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const msg = await Intromsg.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            msg,
            message: "message creation successfully"
        }
    })
}

exports.delete= async(req,res) => {
    try{
        msg = await Intromsg.findByIdAndDelete(req.params.id);
        if(!msg) {
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

exports.getById = async(req , res) => {
    try{
    const msg = await Intromsg.findById(req.params.id)

    if(!msg) {
        return res.status(404).json("No msg found")
    }
    res.status(200).json({
        status:'success',
        data: msg
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get message",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Intromsg.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const msg = await features.query
    res.status(200).json({
        status:"success",
        result:msg.lenght,
        data:{
            msg
        }
    })
}


exports.getByCategory = async (req, res) => {
    const data = req.body.category; 

    try {
        const result = await Intromsg.find({ category: data });
        
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'No matching records found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

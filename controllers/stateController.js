const State = require('../models/stateModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const state = await State.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            state,
            message: "state creation successfully"
        }
    })
}

exports.delete = async(req,res) => {
    try{
        let state = await State.findByIdAndDelete(req.params.id);
        if(!state) {
            return res.status(404).json("No state found")
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
        
        let state = await State.deleteMany()
        if(!state) {
            return res.status(404).json("No state found")
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
    const state = await State.findById(req.params.id)

    if(!state) {
        return res.status(404).json("No state found")
    }
    res.status(200).json({
        status:'success',
        data: state
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get state",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(State.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const state = await features.query
    res.status(200).json({
        status:"success",
        result: state.length,
        data:{
            state
        }
    })
}
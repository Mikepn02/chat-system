const Log = require('../models/logsModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const log = await Log.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            log,
            message: "log creation successfully"
        }
    })
}

exports.delete= async(req,res) => {
    try{
        log = await Intromsg.findByIdAndDelete(req.params.id);
        if(!log) {
            return res.status(404).json("No log found")
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
        
        log = await Log.deleteMany()
        if(!text) {
            return res.status(404).json("No log found")
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
    const features = new APIFeatures(Log.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const log= await features.query
    res.status(200).json({
        status:"success",
        result:log.length,
        data:{
            log
        }
    })
}


exports.getByIp = async (req, res) => {
    const data = req.body; 

    try {
        const result = await Log.findOne({
            ip: data.ip,
            state: data.state,
            topic: data.topic,
            username: data.username
        });
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'No matching records found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
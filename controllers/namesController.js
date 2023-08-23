const Names = require('../models/namesModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const name = await Names.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            name,
            message: "name creation successfully"
        }
    })
}

exports.delete= async(req,res) => {
    try{
       let  name = await Names.findByIdAndDelete(req.params.id);
        if(!name) {
            return res.status(404).json("No name found")
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
        
       let  name = await Names.deleteMany()
        if(!name) {
            return res.status(404).json("No name  found")
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
    const name = await Name.findById(req.params.id)

    if(!name) {
        return res.status(404).json("No name found")
    }
    res.status(200).json({
        status:'success',
        data: name
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get message",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Names.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const name= await features.query
    res.status(200).json({
        status:"success",
        result:log.length,
        data:{
            name
        }
    })
}


exports.getByIp = async (req, res) => {
    const data = req.body; 

    try {
        const result = await Log.findOne({
            ip: data.ip
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
const Band = require('../models/ban_list')
const APIFeatures = require('../utils/apiFeatures')




exports.createBand = async(req ,res) => {
    const band = await Band.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            band,
            message: "Band creation successfully"
        }
    })
}

exports.deleteBand = async(req,res) => {
    try{
        band = await band.findByIdAndDelete(req.params.id);
        if(!band) {
            return res.status(404).json("No Band found")
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
        
        band = await band.deleteMany()
        if(!band) {
            return res.status(404).json("No Band found")
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
    const band = await band.findById(req.params.id)

    if(!band) {
        return res.status(404).json("No Band found")
    }
    res.status(200).json({
        status:'success',
        data: band
    })

    }catch(error) {
        res.status(5000).json({
            message:"Failed to get Band",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Band.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const band= await features.query
    res.status(200).json({
        status:"success",
        result:band.length,
        data:{
            band
        }
    })
}

exports.update = async(req,res) => {
    try{

        const band = await Band.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidator: true
         })
         if(!band) {
            return res.status(500).json("No band found")
         }
    
         res.status(200).json({
            status: 'success',
            data:{
                band
            }
         })

    }catch(error) {
        res.status(500).json("Failed to update")
    }
}
exports.getByIps = async (req, res) => {
    const data = req.body;

    try {
        let query;

        if (data.device_band.trim()) {
            query = { deviceBand: data.devicBand };
        } else if (data.ip_band.trim()) {
            query = { ip_band: data.ip_band };
        } else if (data.country_band.trim()) {
            query = { country_band: data.country_band };
        } else if (data.decoderDans.trim()) {
            query = { decoderDans: data.decoderDans };
        }

        const result = await Band.findOne(query);
        
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'No matching records found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
const Site= require('../models/siteModel')
const APIFeatures = require('../utils/apiFeatures')




exports.createText = async(req ,res) => {
    const site = await Site.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            site,
            message: "site creation successfully"
        }
    })
}

exports.deleteSite = async(req,res) => {
    try{
        let site = await Site.findByIdAndDelete(req.params.id);
        if(!site) {
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
    const site = await Site.findById(req.params.id)

    if(!site) {
        return res.status(404).json("No site found")
    }
    res.status(200).json({
        status:'success',
        data: site
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to site text",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Site.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const site = await features.query
    res.status(200).json({
        status:"success",
        result:site.length,
        data:{
            site
        }
    })
}

exports.updateBannerLogo = async (req, res) => {
    const data = req.body; 

    try {
        const { id, img, state } = data;

        let fieldToUpdate;

        switch (state) {
            case 'banner':
                fieldToUpdate = 'banner';
                break;
            case 'logo':
                fieldToUpdate = 'logo';
                break;
            case 'pmpic':
                fieldToUpdate = 'pmpic';
                break;
            case 'prvpic':
                fieldToUpdate = 'prvpic';
                break;
            case 'prv2pic':
                fieldToUpdate = 'prv2pic';
                break;
            case 'prv3pic':
                fieldToUpdate = 'prv3pic';
                break;
            default:
                return res.status(400).json({ error: 'Invalid state.' });
        }

        const updateObj = {};
        updateObj[fieldToUpdate] = img;

        await Site.findByIdAndUpdate(id, updateObj);

        res.json({ message: `${fieldToUpdate} updated successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
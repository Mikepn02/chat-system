const Story = require('../models/storyModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchASync')




exports.create = async(req ,res) => {
    const story = await Story.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            story,
            message: "story creation successfully"
        }
    })
}

exports.delete = async(req,res) => {
    try{
        let story = await Story.findByIdAndDelete(req.params.id);
        if(!story) {
            return res.status(404).json("No Story found")
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
        
        let story = await Story.deleteMany()
        if(!story) {
            return res.status(404).json("No Story found")
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
    const story = await Story.findById(req.params.id)

    if(!story) {
        return res.status(404).json("No Story found")
    }
    res.status(200).json({
        status:'success',
        data: story
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to get Story",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(Story.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const story = await features.query
    res.status(200).json({
        status:"success",
        result: story.length,
        data:{
            story
        }
    })
}
exports.update = catchAsync(async (req, res, next) => {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!story){
        return   res.status(404).json("No story found")
        
      }

    res.status(200).json({
        status: 'success',
        data: {
            story
        }
    })
})
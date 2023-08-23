const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}


exports.signup = async(req,res)=> {
    const newUser =  await User.create(req.body)
    const token= signToken(newUser._id)
    

    res.status(201).json({
        status:'success',
        token,
        data:{
            user : newUser
        }
    })
}

exports.login = async(req,res) => {
    const {username , password} = req.body;

    if(!username || !password) {
        return res.status(404).json("No user found with those credentials")
    }

    const user = await User.findOne({username}).select('+password')
    if(!user || !await user.correctPassword(password , user.password)){
        return res.status(401).json("invalid username or password")
    }

    const token = signToken(user._id)
    res.status(200).json({
        status:'success',
        token,
        message:"successfully logged in"
    })
}
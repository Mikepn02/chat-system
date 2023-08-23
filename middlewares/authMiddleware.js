const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const { decode } = require('punycode');


const protectUser = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startWith("Bearer")) {
         try{

            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token.process.env.JWT_SECRET);
            req.user = await  User.findById(decode.id).select("-password");
            next()

         }catch(error){
            res.status(401);
			throw new Error("Not Authorized, Token Failed !");
         }
    }
    if (!token) {
		res.status(401);
		throw new Error("Not Authorized, No Token !");
	}
})

module.exports = { protectUser };
const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')




exports.create = async(req ,res) => {
    const user = await User.create(req.body)

    res.status(201).json({
        status: "success",
        data:{
            user,
            message: "user created successfully"
        }
    })
}

exports.delete= async(req,res) => {
    try{
    const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json("No user found")
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

exports.deleteAll = async (req, res) => {
    try {
        const deletedUsers = await User.deleteMany();
        
        if (deletedUsers.deletedCount === 0) {
            return res.status(404).json({ message: 'No users found to delete' });
        }
        
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete all users',
            error: error.message
        });
    }
};







exports.getById = async(req , res) => {
    try{
    const user = await User.findById(req.params.id)

    if(!user) {
        return res.status(404).json("No User found")
    }
    res.status(200).json({
        status:'success',
        data: user
    })

    }catch(error) {
        res.status(500).json({
            message:"Failed to geUser",
            error: error.message
        })

    }
}

exports.getAll = async(req,res) => {
    const features = new APIFeatures(User.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

    const user = await features.query
    res.status(200).json({
        status:"success",
        result: user.length,
        data:{
            user
        }
    })
}
exports.updateId = async (req, res) => {
    const data = req.body; 

    try {
        const { ip, id, uid } = data;

        await User.findOneAndUpdate({ uid: uid }, { ip: ip, id: id });

        res.json({ message: 'User ID and IP updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updatePic = async (req, res) => {
    const data = req.body; 
    try {
        const { pic, uid } = data;

        await User.findOneAndUpdate({ uid: uid }, { pic: pic });

        res.json({ message: 'User profile picture updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updatePicx = async (req, res) => {
    const data = req.body; 

    try {
        const { im1, uid } = data;

        await User.findOneAndUpdate({ uid: uid }, { im1: im1 });

        res.json({ message: 'User im1 picture updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.updateUser = async (req, res) => {
    const data = req.body; 

    try {
        const { uid, bg, mcol, ucol, evaluation, ico, ip, fp, id, lid, msg, pic, im1, im2, im3, power, rep, topic, username, password, token, loginG, muted, documentationc, lastssen, joinuser } = data;

        await User.findOneAndUpdate({ uid: uid }, {
            bg: bg,
            mcol: mcol,
            ucol: ucol,
            evaluation: evaluation,
            ico: ico,
            ip: ip,
            fp: fp,
            id: id,
            lid: lid,
            msg: msg,
            pic: pic,
            im1: im1,
            im2: im2,
            im3: im3,
            power: power,
            rep: rep,
            topic: topic,
            username: username,
            password: password,
            token: token,
            loginG: loginG,
            muted: muted,
            documentationc: documentationc,
            lastssen: lastssen,
            joinuser: joinuser
        });

        res.json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};







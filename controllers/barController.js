const Bar = require('../models/barsListModel'); 

exports.create = async (req, res) => {
    const data = req.body; 
    try {
        const newBar = new Bar({
            bg: data.bg,
            bid: data.bid,
            lid: data.lid,
            mcol: data.mcol,
            msg: data.msg,
            pic: data.pic,
            topic: data.topic,
            ucol: data.ucol,
            uid: data.uid
        });

        const savedBar = await newBar.save();
        res.json(savedBar);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteall = async (req, res) => {
    try {
        await Bar.deleteMany({});
        res.json({ message: 'All records deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id; 

    try {
        await Bar.deleteOne({ bid: id });
        res.json({ message: 'Record deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteBy = async (req, res) => {
    const data = req.body; 

    try {
        await Bar.deleteOne({ bid: data.id, lid: data.lid });
        res.json({ message: 'Record deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteById = async (req, res) => {
    const id = req.params.id; 

    try {
        await Bar.findByIdAndDelete(id);
        res.json({ message: 'Record deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updateLiked = async (req, res) => {
    const data = req.body; 

    try {
        await Bar.updateOne({ bid: data.bid }, { likes: data.likes });
        res.json({ message: 'Likes updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updateComment = async (req, res) => {
    const data = req.body; 

    try {
        await Bar.updateOne({ bid: data.bid }, { bcc: data.bcc });
        res.json({ message: 'Comment count updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.getById = async (req, res) => {
    const id = req.params.id; 

    try {
        const bar = await Bar.findOne({ bid: id });
        
        if (bar) {
            res.json(bar);
        } else {
            res.status(404).json({ message: 'No matching record found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const bars = await Bar.find();
        res.json(bars);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

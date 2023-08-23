const Room = require("../models/roomsModel");
const APIFeatures = require("../utils/apiFeatures");

exports.create = async (req, res) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      owner,
      message: "Room creation successfully",
    },
  });
};

exports.deleteAll = async (req, res) => {
  try {
    let room = await Room.deleteMany();
    if (!room) {
      return res.status(404).json("No room found");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete all data",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json("No room found");
    }
    res.status(200).json({
      status: "success",
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get room",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const features = new APIFeatures(Room.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const room = await features.query;
  res.status(200).json({
    status: "success",
    result: room.length,
    data: {
      room,
    },
  });
};

exports.getByIp = async (req, res) => {
  const data = req.body;

  try {
    const result = await Log.findOne({
      ip: data.ip,
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No matching records found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.update = async (req, res) => {
    const data = req.body
    try{
        const { id } = data;

        await Owner.findByIdAndUpdate(id, {
          topic: data.topic,
          broadcast: data.broadcast,
          about: data.about,
          pass:data.pass,
          needpass: data.needPass,
          max:data.max,
          rmli:data.rmli,
          color:data.color,
          pic: data.pic,
          id: data.id

        });
      
        res.json({message: "Updated successfully"})
    }catch(error){
        res.status(500).json({error:"an error occured"})

    }
};

exports.updatePass = async (req, res) => {
    const data = req.body; 

    try {
        const { id, pass, needpass } = data;

        await Room.findByIdAndUpdate(id, {
            pass: pass,
            needpass: needpass
        });

        res.json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updatePic = async (req, res) => {
    const data = req.body;

    try {
        const { id, pic } = data;

        await Room.findByIdAndUpdate(id, {
            pic: pic
        });

        res.json({ message: 'Picture updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};
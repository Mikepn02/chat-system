const Owner = require("../models/ownerModel");
const APIFeatures = require("../utils/apiFeatures");

exports.create = async (req, res) => {
  const owner = await Owner.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      owner,
      message: "owner creation successfully",
    },
  });
};

exports.delete = async (req, res) => {
  try {
    let owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) {
      return res.status(404).json("No name found");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete data",
      error: error.message,
    });
  }
};
exports.deleteAll = async (req, res) => {
  try {
    let owner = await Owner.deleteMany();
    if (!owner) {
      return res.status(404).json("No owner found");
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
    const owner = await Owner.findById(req.params.id);

    if (!owner) {
      return res.status(404).json("No owner found");
    }
    res.status(200).json({
      status: "success",
      data: owner,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get message",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const features = new APIFeatures(Owner.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const owner = await features.query;
  res.status(200).json({
    status: "success",
    result: owner.length,
    data: {
      owner,
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
          bars: data.bars,
          isbanner: data.bnr,
          isbanner1: data.bnr1,
          isbanner2: data.bnr2,
          isbanner3: data.bnr3,
          isbanner4: data.bnr4,
          rc: data.rc,
          cooment: data.cooment,
          datafinish: data.time,
          Gust: data.gust,
          room: data.room,
          MaxRep: data.max,
          Vpn: data.vpn,
          Vistor: data.vistor,
          Tv: data.Tv,
          offline: data.offline,
        });
      
        res.json({message: "Updated successfully"})
    }catch(error){
        res.status(500).json({error:"an error occured"})

    }
};

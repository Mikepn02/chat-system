const Setting = require("../models/settingModel");
const APIFeatures = require("../utils/apiFeatures");

exports.create = async (req, res) => {
  const setting = await Setting.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      setting,
      message: "Setting creation successfully",
    },
  });
};



exports.getById = async (req, res) => {
  try {
    const setting = await Setting.findById(req.params.id);

    if (!setting) {
      return res.status(404).json("No setting found");
    }
    res.status(200).json({
      status: "success",
      data: setting,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get setting to be updated",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const features = new APIFeatures(Setting.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const setting = await features.query;
  res.status(200).json({
    status: "success",
    result: setting.length,
    data: {
      setting,
    },
  });
};


exports.update= async (req, res) => {
    const data = req.body; 

    try {
        const { id ,site,sico,dro3,emo  } = data;

        await Room.findByIdAndUpdate(id, {
            site: site,
            sico: sico,
            emo: emo,
            dro3: dro3
        });

        res.json({ message: 'All  updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};


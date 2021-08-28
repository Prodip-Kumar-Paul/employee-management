const Profile = require("../models/profile");
const Connection = require("../models/connection");

exports.createProfile = async (req, res, next) => {
  const { name, phone, address, role, bossId } = req.body;
  // console.log(req.body);
  try {
    const newUser = new Profile({
      name,
      phone,
      address,
      role,
    });
    const user = await newUser.save();

    const newConnection = new Connection({
      profileId: user._id,
      bossId,
    });
    const connector = await newConnection.save();
    res.status(201).json({
      message: "success",
      user,
      connector,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBossDetails = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const boss = await Connection.findOne({ profileId: userId }).populate(
      "bossId"
    );
    res.status(200).json({
      message: "success",
      boss,
    });
  } catch (err) {
    next(err);
  }
};

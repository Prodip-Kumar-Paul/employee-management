const validator = require("validator");
const ObjectId = require("mongoose").Types.ObjectId;

const Profile = require("../models/profile");

const errorHandler = (msg) => {
  const error = new Error(msg);
  error.statusCode = 422;
  throw error;
};

const validProfileId = async (Id) => {
  const result = await Profile.findById(Id).exec();
  // console.log(result);
  if (!result) {
    console.log(result);
    return false;
  } else {
    return true;
  }
};

exports.profileData = async (req, res, next) => {
  const { name, phone, address, role, bossId } = req.body;
  try {
    if (validator.isEmpty(name)) {
      errorHandler("Invalid name");
    }
    if (!validator.isMobilePhone(phone, ["en-IN"])) {
      errorHandler("Invalid Phone Number");
    }
    if (validator.isEmpty(address)) {
      errorHandler("Invalid address");
    }
    if (validator.isEmpty(role)) {
      errorHandler("Invalid role");
    }
    if (!ObjectId.isValid(bossId)) {
      errorHandler("Invalid ObjectId");
    }
    const user = await validProfileId(bossId);
    if (!user) {
      errorHandler("Invalid user");
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.bossData = async (req, res, next) => {
  const { userId } = req.body;
  try {
    if (!ObjectId.isValid(userId)) {
      errorHandler("Invalid ObjectId");
    }
    const user = await validProfileId(userId);
    if (!user) {
      errorHandler("Invalid user");
    }
    next();
  } catch (err) {
    next(err);
  }
};

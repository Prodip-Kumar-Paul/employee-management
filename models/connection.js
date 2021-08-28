const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    require: true,
  },
  bossId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    require: true,
  },
});

module.exports = mongoose.model("Connection", connectionSchema);

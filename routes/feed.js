const express = require("express");

const router = express.Router();

const isValid = require("../middleware/is-valid");
const feedController = require("../controller/feed");

router.post("/profile", isValid.profileData, feedController.createProfile);
router.post("/user", isValid.bossData, feedController.getBossDetails);

module.exports = router;

const express       = require("express");
const validator     = require("../validation/report");
const controller    = require("../controllers/report");

const router = express.Router();

router.route("/report1").get(
    [validator.report1Validate],
    controller.report1
);
router.route("/report2").get(
    [validator.report2Validate],
    controller.report2
);
module.exports=router;
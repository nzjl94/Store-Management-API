const express       = require("express");
const validator     = require("../validation/category");
const controller    = require("../controllers/category");

const router = express.Router();

router.route("/")
    .post(
        [validator.insertValidateData],
        controller.insertData
    ).get(
        [validator.paginationValidate],
        controller.getAllData
    );

router.route("/:id")
    .get(
        [validator.validateID],
        controller.getData
    ).put(
        [validator.updateValidateData],
        controller.updateData
    ).delete(
        [validator.validateID],
        controller.deleteData
    );
module.exports=router;
const express       = require("express");
const validator     = require("../validation/item");
const controller    = require("../controllers/item");
const imageUpload   = require("../middleware/uploader").single('uploads/item',"image");

const router        = express.Router();

router.route("/")
    .post(
        [
            imageUpload,
            validator.insertValidateData
        ],
        controller.insertData
    ).get(
        [
            validator.paginationValidate
        ],
        controller.getAllData
    );

router.route("/:id")
    .get(
        [
            validator.validateID
        ],
        controller.getData
    ).put(
        [
            imageUpload,
            validator.updateValidateData
        ],
        controller.updateData
    ).delete(
        [
            validator.validateID
        ],
        controller.deleteData
    );


module.exports=router;
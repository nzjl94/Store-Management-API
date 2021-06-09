const store              = require("../models/store");
const {ID,INT,EXIST,NAME}    = require("./rules/validation_rules");
const {case1}            = require("./rules/validation_errors");

exports.validateID = [
    ID("id"),
    EXIST(store,"id","id","param","not_exist"),
    case1
];
exports.paginationValidate = [
    INT("page",1,10000000,"query"),
    INT("size",1,10000000,"query"),
    case1
];
exports.insertValidateData = [
    NAME("name"),
    EXIST(store,"name","name"),
    case1
];
exports.updateValidateData = [
    ID("id"),
    EXIST(store,"id","id","param","not_exist"),
    NAME("name"),
    EXIST(store,"name","name"),
    case1
];
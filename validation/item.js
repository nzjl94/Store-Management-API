const item                              = require("../models/item");
const category                          = require("../models/category");
const {ID,EXIST,TEXT,NAME,INT,FLOAT}    = require("./rules/validation_rules");
const {case1}                           = require("./rules/validation_errors");

exports.validateID = [
    ID("id"),
    EXIST(item,"id","id","param","not_exist"),
    case1
];
exports.paginationValidate = [
    INT("page",1,10000000,"query"),
    INT("size",1,10000000,"query"),
    case1
];
exports.insertValidateData = [
    TEXT("note"),
    NAME("name"),

    INT("categoryId",1,1000),
    EXIST(category,"id","categoryId","body","not_exist"),
    FLOAT("price"),
    case1
];
exports.updateValidateData = [
    ID("id"),
    TEXT("note"),
    NAME("name"),

    INT("categoryId",1,1000),
    EXIST(category,"id","categoryId","body","not_exist"),
    FLOAT("price"),
    case1
];
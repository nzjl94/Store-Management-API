const store                             = require("../models/store");
const category                          = require("../models/category");
const {ID,EXIST,TEXT,NAME,INT}          = require("./rules/validation_rules");
const {case1}                           = require("./rules/validation_errors");

exports.validateID = [
    ID("id"),
    EXIST(category,"id","id","param","not_exist"),
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
    INT("storeId",1,1000),
    EXIST(store,"id","storeId","body","not_exist"),
    case1
];
exports.updateValidateData = [
    ID("id"),
    TEXT("note"),
    NAME("name"),
    INT("storeId",1,1000),
    EXIST(store,"id","storeId","body","not_exist"),
    case1
];
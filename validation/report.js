const {INT,NAME}    = require("./rules/validation_rules");
const {case1}       = require("./rules/validation_errors");


exports.report1Validate = [
    NAME("store_name","c1","query"),
    NAME("category_name","c1","query"),
    INT("store_id",1,10000000,"query_report"),
    INT("category_id",1,10000000,"query_report"),
    case1
];
exports.report2Validate = [
    INT("price_from",1,10000000,"query_report"),
    INT("price_to",1,10000000,"query_report"),
    case1
];
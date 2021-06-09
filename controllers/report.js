const messages              = require("../util/message");
const { QueryTypes }        = require('sequelize');
const sequelize             = require('../util/database');

exports.report1=async (req,res)=>{

    const replacements={};
    let conditions="";
    if (req.query.store_name !== undefined){
        replacements["store_name"]=req.query.store_name;
        conditions+=` stores.name = :store_name AND `;
    }
    if (req.query.category_name !== undefined){
        replacements["category_name"]=req.query.category_name;
        conditions+=` categories.name = :category_name AND`;
    }
    if (req.query.store_id !== undefined){
        replacements["store_id"]=req.query.store_id;
        conditions+=` stores.id = :store_id AND `;
    }
    if (req.query.category_id !== undefined){
        replacements["category_id"]=req.query.category_id;
        conditions+=` categories.id = :category_id AND `;
    }
    const users = await sequelize.query(`
        SELECT
            items.id,
            items.name as 'item_name',
            categories.name as 'categoty_name',
            stores.name as 'store_name',
            items.note,
            price,
            concat('http://127.0.0.1:3000/',items.imagePath) as 'url',
            items.created_at
        FROM
            items,
            categories,
            stores
        WHERE
            ${conditions}
            items.categoryId =  categories.id AND
            stores.id = categories.storeId AND
            items.deleted_at is null AND
            categories.deleted_at is null AND
            stores.deleted_at is null
    `, { 
        replacements:replacements,
        type: QueryTypes.SELECT 
    }); 
    try{
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json(users);
    }
}
exports.report2=async (req,res)=>{
    const replacements={};
    let conditions="";

    if (req.query.price_from !== undefined && req.query.price_to !== undefined){
        replacements["price_from"]=req.query.price_from;
        replacements["price_to"]=req.query.price_to;
        conditions+=` price between :price_from AND :price_to AND `;
    }else if (req.query.price_from !== undefined){
        replacements["price_from"]=req.query.price_from;
        conditions+=` price = :price_from AND `;
    }else if (req.query.price_to !== undefined){
        replacements["price_to"]=req.query.price_to;
        conditions+=` price = :price_to AND `;
    }
    const users = await sequelize.query(`
        SELECT
            items.id,
            items.name as 'item_name',
            categories.name as 'categoty_name',
            stores.name as 'store_name',
            items.note,
            price,
            concat('http://127.0.0.1:3000/',items.imagePath) as 'url',
            items.created_at
        FROM
            items,
            categories,
            stores
        WHERE
            ${conditions}
            items.categoryId =  categories.id AND
            stores.id = categories.storeId AND
            items.deleted_at is null AND
            categories.deleted_at is null AND
            stores.deleted_at is null
    `, { 
        replacements:replacements,
        type: QueryTypes.SELECT 
    }); 
    try{
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json(users);
    }  
}

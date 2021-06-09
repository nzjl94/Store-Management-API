const messages              = require("../util/message");
const needs                 = require("../util/needs");
const item                 = require("../models/item");
const category                 = require("../models/category");

exports.getData=(req,res)=>{
    item.findByPk(req.params.id,{
        include:[
            {
                model:category,
                attributes: ['id','name'],
                where:{},
                order:[]
            }
        ],
        attributes: ['id','name','note','price','imageUrlPath',['created_at','datetime']]
    }).then(result=>{
        return res.status(result==null?400:200).json(result==null?{"response":"This row not found!!!"}:result);
    }).catch(err=>{
        return res.status(400).json(err);
    }) 
}
exports.getAllData=function(req,res){
    item.findAndCountAll({
        include:[
            {
                model:category,
                attributes: ['id','name'],
                where:{}
            }
        ],
        attributes: ['id','name','note','price','imageUrlPath',['created_at','datetime']],
        order:['id'],
        offset:(req.query.page * req.query.size) - req.query.size,
        limit: Number(req.query.size)
    }).then(result=>{
        return res.status(200).json(result);
    }).catch(err=>{
        return res.status(400).json(err);
    })   
}
exports.insertData=async function(req,res){
    const extra={};
    if(req.file !== undefined){
        extra["imagePath"]=req.file.path;
    }
    item.create({
        "name":req.body.name,
        "note":req.body.note,
        "price":req.body.price,
        ...extra
    }).then(new_item=>{
        new_item.setCategory(req.body.categoryId);
        return messages.insert(res,1,new_item.id);
    }).catch(err=>{
        return res.status(400).json({"response":err});
    });
}
exports.updateData=async function(req,res){
    try {
        previous_item=await item.findByPk(req.params.id,{});
        try{
            const extra={};
            //if the request contain image
            if(req.file !== undefined){
                //delete old image
                needs.delete_old_image([previous_item.imagePath]);
                //set the new image
                extra["imagePath"]=req.file.path;
            }
            //update the item data
            await previous_item.update({
                "name":req.body.name,
                "note":req.body.note,
                "price":req.body.price,
                ...extra
            });
            return res.status(200).json({"response":"This data has been updated successfully!!!"});
        }catch(err){
            return res.status(400).json("There is something wrong with updating item");
        }
    }catch(err){
        return res.status(400).json({"response":"There is something wrong with check data!!!"});
    }
}
exports.deleteData=async function(req,res){
    item.findByPk(req.params.id,{}).then(async result=>{
        needs.delete_old_image([result.imagePath]);
        result.destroy();
        return res.status(200).json({"response":"This data has been deleted successfully!!!"});
    }).catch(err=>{
        return res.status(400).json({"response":"There are no item with this id!!!"});
    });
}
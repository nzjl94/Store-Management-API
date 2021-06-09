const messages              = require("../util/message");
const needs                 = require("../util/needs");
const store                 = require("../models/store");



exports.getData=(req,res)=>{
    store.findByPk(req.params.id,{
        attributes: ['id','name','imagePath',['created_at','datetime']]
    }).then(result=>{
        return res.status(result==null?400:200).json(result==null?{"response":"This row not found!!!"}:result);
    }).catch(err=>{
        return res.status(400).json(err);
    }) 
}
exports.getAllData=function(req,res){
    store.findAndCountAll({
        attributes: ['id','name','imageUrlPath',['created_at','datetime']],
        offset:(req.query.page * req.query.size) - req.query.size,
        limit: Number(req.query.size),
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
    store.create({
        "name":req.body.name,
        ...extra
    }).then(new_store=>{
        return messages.insert(res,1,new_store.id);
    }).catch(err=>{
        return res.status(400).json({"response":err});
    });
}
exports.updateData=async function(req,res){
    try {
        previous_store=await store.findByPk(req.params.id,{});
        try{
            const extra={};
            //if the request contain image
            if(req.file !== undefined){
                //delete old image
                needs.delete_old_image([previous_store.imagePath]);
                //set the new image
                extra["imagePath"]=req.file.path;
            }
            //update the store data
            await previous_store.update({
                "name":req.body.name,
                ...extra
            });
            return res.status(200).json({"response":"This data has been updated successfully!!!"});
        }catch(err){
            return res.status(400).json("There is something wrong with updating store");
        }
    }catch(err){
        return res.status(400).json({"response":"There is something wrong with check data!!!"});
    }
}
exports.deleteData=async function(req,res){
    store.findByPk(req.params.id,{}).then(async result=>{
        needs.delete_old_image([result.imagePath]);
        result.destroy();
        return res.status(200).json({"response":"This data has been deleted successfully!!!"});
    }).catch(err=>{
        return res.status(400).json({"response":"There are no store with this id!!!"});
    });
}
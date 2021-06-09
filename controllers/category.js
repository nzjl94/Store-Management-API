const category              = require("../models/category");
const store                 = require("../models/store");
const messages              = require("../util/message");

exports.getData=(req,res)=>{
    category.findByPk(req.params.id,{
        include:[
            {
                model:store,
                attributes: ['id','name'],
                where:{},
                order:[]
            }
        ],
        attributes: ['id','name','note',['created_at','datetime']]
    }).then(result=>{
        return res.status(result==null?400:200).json(result==null?{"response":"This row not found!!!"}:result);
    }).catch(err=>{
        return res.status(400).json(err);
    }) 
}
exports.getAllData=function(req,res){
    category.findAndCountAll({
        include:[
            {
                model:store,
                attributes: ['id','name'],
                where:{},
            }
        ],
        attributes: ['id','name','note',['created_at','datetime']],
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
    category.create({
        "name":req.body.name,
        "note":req.body.note
    }).then(new_category=>{
        new_category.setStore(req.body.storeId);
        return messages.insert(res,1,new_category.id);
    }).catch(err=>{
        return res.status(400).json({"response":err.errors[0].message});
    });
}
exports.updateData=async function(req,res){
    try {
        previous_category=await category.findByPk(req.params.id,{});
        try{
            await previous_category.update({
                "storeId":req.body.storeId,
                "name":req.body.name,
                "note":req.body.note
            });
            return res.status(200).json({"response":"This data has been updated successfully!!!"});
        }catch(err){
            return res.status(400).json("There is something wrong with updating category");
        }
    }catch(err){
        return res.status(400).json({"response":"There is something wrong with check data!!!"});
    }
}
exports.deleteData=async function(req,res){
    category.findByPk(req.params.id,{}).then(async result=>{ 
        result.destroy();
        return res.status(200).json({"response":"This data has been deleted successfully!!!"});
    }).catch(err=>{
        return res.status(400).json({"response":"There are no category with this id!!!"});
    });
}
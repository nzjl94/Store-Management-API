const { DataTypes } = require('sequelize');

const sequelize =require('../util/database');

const store=sequelize.define('store',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len: [3,30],
            notNull: true,           
            notEmpty: true,        
        }
    },
    imagePath:{
        type: DataTypes.TEXT,
        allowNull:true,
        defaultValue: null,
    },
    imageUrlPath: {
        type: DataTypes.VIRTUAL(DataTypes.STRING,["imagePath"]),
        get() {
            if(this.getDataValue('imagePath')===null){
                return "http://localhost:3000/uploads/general/error.jpg";
            }else{
                return "http://localhost:3000/"+this.getDataValue('imagePath');
            }
        }
    }
},{
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes:[
    ]
});
module.exports= store;
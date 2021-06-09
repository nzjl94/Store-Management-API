const { DataTypes } = require('sequelize');

const sequelize =require('../util/database');

const category=sequelize.define('category',{
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
    note: {
        type: DataTypes.TEXT,
        allowNull:true
    },
},{
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes:[
    ]
});
module.exports= category;
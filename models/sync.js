const sequelize         = require('../util/database');
const user              = require('./user');
const store             = require('./store');
const category          = require('./category');
const item              = require('./item');

module.exports=()=>{
  store.hasOne(category, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  });
  category.belongsTo(store);

  category.hasOne(item, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  });
  item.belongsTo(category);
  
  sequelize.sync(/*{ force: true }*/).then(result=>{
    //console.log(result);
  }).catch(err=>{
    console.log(err);
  });
}
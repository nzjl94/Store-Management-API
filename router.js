const is_auth = require ("./middleware/is-auth");
module.exports.set_route = function(app) {
    app.use('/user',[is_auth],require('./routes/user'));
    app.use('/report',[is_auth],require('./routes/report'));
    app.use('/store',[is_auth],require('./routes/store'));
    app.use('/category',[is_auth],require('./routes/category'));
    app.use('/item',[is_auth],require('./routes/item'));
    app.use('/login',[],require('./routes/login'));
}
 
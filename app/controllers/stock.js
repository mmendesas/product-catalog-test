//load  validator and schemas
var schema_validator = require('../validator/schema-validator').validate;
var sch_stock = require('../schemas/stock.json');

//load DAO methods
var CrudProducts = require('../crud-products');
var RedisDAO = require('../dao/redis/stock');
var MongoDAO = require('../dao/mongo/stock');

var crud = new CrudProducts();
crud.setStrategy(new MongoDAO());

module.exports = function (app) {

    app.get("/stock", function (req, res) {
        crud.list(req, res);
    });
}
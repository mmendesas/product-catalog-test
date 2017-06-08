//load  validator and schemas
var schema_validator = require('../validator/schema-validator').validate;
var sch_stock = require('../models/schemas/stock.json');
var sch_stocklist = require('../models/schemas/stock-list.json');

//load DAO methods
var CrudProducts = require('../dao/crud-products');
var RedisDAO = require('../dao/redis/stock');
var MongoDAO = require('../dao/mongo/stock');
var storage = require('../config/storage');

var crud = new CrudProducts();
crud.setStrategy(new MongoDAO());

module.exports = function (app) {

    var crud = null;

    app.get("/stock", function (req, res) {
        crud = getCrudStrategy();
        crud.list(req, res);
    });

    app.post("/stock", schema_validator({ body: sch_stocklist }), function (req, res) {
        crud = getCrudStrategy();
        crud.add(req, res);
    });
}

function getCrudStrategy() {

    var crud = new CrudProducts();

    if (storage.getStorage().toLowerCase() == "redis") {
        crud.setStrategy(new RedisDAO());
    } else {
        crud.setStrategy(new MongoDAO());
    }

    return crud;
}
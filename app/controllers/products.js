//load  validator and schemas
var schema_validator = require('../validator/schema-validator').validate;
var sch_productlist = require('../models/schemas/product-list.json');
var sch_product = require('../models/schemas/product.json');

//load DAO methods
var CrudProducts = require('../dao/crud-products');
var RedisDAO = require('../dao/redis/products');
var MongoDAO = require('../dao/mongo/products');
var storage = require('../config/storage');

module.exports = function (app) {

    var crud = null;

    app.get("/products", function (req, res) {
        crud = getCrudStrategy();
        crud.list(req, res);
    });

    app.get("/products/:id", function (req, res) {
        crud = getCrudStrategy();
        crud.findById(req, res);
    });

    app.post("/products", schema_validator({ body: sch_productlist }), function (req, res) {
        crud = getCrudStrategy();
        crud.add(req, res);
    });

    app.put("/products/:id", schema_validator({ body: sch_product }), function (req, res) {
        crud = getCrudStrategy();
        crud.update(req, res);
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
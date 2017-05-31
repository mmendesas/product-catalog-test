var schema_validator = require('../validator/schema-validator').validate;

var products = require('../schemas/products.json');
var CrudProducts = require('../dao/crud-products');
var RedisDAO = require('../dao/redis-dao');
var MongoDAO = require('../dao/mongo-dao');

var crud = new CrudProducts();
crud.setStrategy(new RedisDAO());

module.exports = function (app) {

    app.get("/products", function (req, res) {
        crud.list(req, res);
    });

    app.post("/products", schema_validator({ body: products }), function (req, res) {
        crud.add(req, res);
    });

}
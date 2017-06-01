//load  validator and schemas
var schema_validator = require('../validator/schema-validator').validate;
var sch_products = require('../schemas/products.json');
var sch_product = require('../schemas/product.json');

//load DAO methods
var CrudProducts = require('../crud-products');
var RedisDAO = require('../dao/redis/products');
var MongoDAO = require('../dao/mongo/products');

var crud = new CrudProducts();
crud.setStrategy(new MongoDAO());

module.exports = function(app) {

    app.get("/products", function(req, res) {
        crud.list(req, res);
    });

    app.get("/products/:id", function(req, res) {
        crud.findById(req, res);
    });

    app.post("/products", schema_validator({ body: sch_products }), function(req, res) {
        crud.add(req, res);
    });

    app.put("/products/:id", schema_validator({ body: sch_product }), function(req, res) {
        crud.update(req, res);
    });

}
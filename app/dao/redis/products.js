var redis = require('redis');
var client = redis.createClient();

module.exports =
    class RedisProductsDAO {

        list(req, res) {
            console.log("[REDIS] - get all products");
            var list = [];
            client.hgetall('Products', function (err, products) {
                if (products) {
                    Object.keys(products)
                        .forEach(function (key) {
                            list.push(JSON.parse(products[key]));
                        });
                }
                res.status(200).json(list);
            });
        };

        findById(req, res) {
            console.log("[REDIS] - find product by ID");
            var _id = req.params.id;
            client.hget('Products', _id, function (err, product) {
                res.status(201).json(JSON.parse(product));
            });
        };

        removeById(req, res) {
            console.log("[REDIS] - remove product by ID");
            var _id = req.params.id;
            if (_id) {
                client.hdel("Products", _id);
            }
        };

        add(req, res) {
            console.log("[REDIS] - add products");
            var products = req.body;
            products.forEach(function (product) {
                client.hset('Products', product.sku, JSON.stringify(product));
            });

            res.sendStatus(201);//.json(products);
        };

        update(req, res) {
            console.log("[REDIS] - update product");
            var _id = req.params.id;
            var _product = req.body;
            if (_id) {
                client.hset('Products', _id, JSON.stringify(_product));
            }
            res.sendStatus(204);//.json(products);
        };

    };
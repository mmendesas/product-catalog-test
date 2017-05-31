var redis = require('redis');
var client = redis.createClient();

module.exports =
    class RedisDAO {

        list(req, res) {
            console.log("list on redisola");
            var list = [];
            client.hgetall('Products', function(err, products) {
                if (products) {
                    Object.keys(products)
                        .forEach(function(key) {
                            list.push(JSON.parse(products[key]));
                        });
                }
                res.status(200).json(list);
            });
        };

        findById(req, res) {
            console.log("findById on redisola");
            var _id = req.body.id;
            client.hget('Products', _id, function(err, product) {
                res.status(201).json(product);
            });
        };

        removeById(req, res) {
            console.log("remove item by id on redisola");
            var _id = req.query['id'];
            if (_id) {
                client.hdel("Products", _id);
            }
        };

        add(req, res) {
            console.log("add products on redis");
            var products = req.body;

            products.forEach(function(product) {
                client.hset('Products', product.sku, JSON.stringify(product));
            });

            res.sendStatus(201);//.json(products);
        };

        update() {
            console.log("update do sernhor Redis");
        };

    };
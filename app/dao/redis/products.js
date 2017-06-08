var redisConf = require('../../config/redis-conf');

module.exports =
    class RedisProductsDAO {

        list(req, res) {            
            console.log("[REDIS] - Products - get all");
            var list = [];
            redisConf.getClient().hgetall('Products', function (err, products) {
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
            console.log("[REDIS] - Products - find by ID");
            var _id = req.params.id;
            redisConf.getClient().hget('Products', _id, function (err, product) {
                res.status(201).json(JSON.parse(product));
            });
        };

        removeById(req, res) {
            console.log("[REDIS] - Products - remove by ID");
            var _id = req.params.id;
            if (_id) {
                redisConf.getClient().hdel("Products", _id);
            }
        };

        add(req, res) {            
            console.log("[REDIS] - Products - add");
            var products = req.body;
            products.forEach(function (product) {
                redisConf.getClient().hset('Products', product.sku, JSON.stringify(product));
            });

            res.sendStatus(201);//.json(products);
        };

        update(req, res) {            
            console.log("[REDIS] - Products - update by Id");
            var _id = req.params.id;
            var _product = req.body;
            if (_id) {
                redisConf.getClient().set('Products', _id, JSON.stringify(_product));
            }
            res.sendStatus(204);//.json(products);
        };
    };
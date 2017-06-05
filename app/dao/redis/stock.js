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

    };
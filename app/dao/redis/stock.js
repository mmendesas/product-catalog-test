var redisConf = require('../../config/redis-conf');

module.exports =
    class RedisProductsDAO {

        list(req, res) {
            console.log("[REDIS] - Stock - get all");
            var list = [];
            redisConf.getClient().hgetall('StockList', function (err, products) {
                if (products) {
                    Object.keys(products)
                        .forEach(function (key) {
                            list.push(JSON.parse(products[key]));
                        });
                }
                res.status(200).json(list);
            });
        };

        add(req, res) {
            console.log("[REDIS] - Stock - add");
            var stock_list = req.body;
            stock_list.forEach(function (stock) {
                redisConf.getClient().hset('StockList', stock.sku, JSON.stringify(stock));
            });

            res.sendStatus(201);
        };

    };
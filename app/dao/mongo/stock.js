var mongoose = require('mongoose');
var model = mongoose.model('Stock');

module.exports =
    class MongoProductsDAO {

        list(req, res) {
            console.log("[MONGO] - Stock - get information");
            model
                .find(req.query)
                .then(function (stock_list) {
                    var response = {
                        quantity: stock_list.length,
                        warehouse: stock_list.warehouse
                    }
                    res.json(response);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

        add(req, res) {
            console.log("[MONGO] - Stock - add");
            var stock_items = req.body;
            model
                .find(stock_items)
                .then(function (stock_list) {
                    if (stock_list.length > 0) {
                        var msg = "Stock already exists";
                        var response = {
                            messsage: msg,
                            stock_list: stock_list
                        }
                        console.log(msg);
                        res.status(422).send(response);
                    } else {
                        model
                            .insertMany(stock_items)
                            .then(function (_stock_items) {
                                res.sendStatus(201).json(_stock_items);
                            }, function (err) {
                                console.log(err);
                                res.status(500).json(err);
                            });
                    }
                });
        };

    };
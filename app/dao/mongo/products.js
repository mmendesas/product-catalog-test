var mongoose = require('mongoose');
var model = mongoose.model('Product');

module.exports =
    class MongoProductsDAO {

        list(req, res) {
            console.log("[MONGO] - Products - get all");
            model
                .find(req.query)
                .then(function (products) {
                    res.json(products);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

        findById(req, res) {            
            console.log("[MONGO] - Products - find by Id");
            model
                .find({ sku: req.params.id })
                .then(function (product) {
                    if (!product) throw Error('Product not found!');
                    res.json(product);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

        removeById(req, res) {            
            console.log("[MONGO] - Products - remove by Id");
            model
                .findByIdAndRemove(req.params.id)
                .then(function () {
                    res.sendStatus(204);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

        add(req, res) {            
            console.log("[MONGO] - Products - add");
            var products = req.body;
            model
                .find(products)
                .then(function (prodList) {
                    if (prodList.length > 0) {
                        var msg = "Products already exists";
                        var response = {
                            messsage: msg,
                            products: prodList
                        }
                        console.log(msg);
                        res.status(422).send(response);
                    } else {
                        model
                            .insertMany(products)
                            .then(function (_products) {
                                res.sendStatus(201).json(_products);
                            }, function (err) {
                                console.log(err);
                                res.status(500).json(err);
                            });
                    }
                });
        };

        update(req, res) {            
            console.log("[MONGO] - Products - update by Id");
            model
                .update({ sku: req.params.id }, req.body)
                .then(function (product) {
                    res.json(product);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

    };
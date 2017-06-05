var mongoose = require('mongoose');
var model = mongoose.model('Product');

module.exports =
    class MongoProductsDAO {

        list(req, res) {
            console.log("[MONGO] - get all products");
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
            console.log("[MONGO] - find product by ID");
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
            console.log("[MONGO] - remove product by ID");
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
            console.log("[MONGO] - add products");
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
            console.log("[MONGO] - update product");
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
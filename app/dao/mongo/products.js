var mongoose = require('mongoose');
var model = mongoose.model('Product');

module.exports =
    class MongoProductsDAO {

        list(req, res) {
            console.log("[MONGO] - get all products");
            model
                .find({})
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
                .findById(req.params.id)
                .then(function (project) {
                    if (!project) throw Error('Product not found!');
                    res.json(project);
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

            // model
            //     .insertMany(products)
            //     .then(function (_products) {
            //         res.sendStatus(201).json(_products);
            //     }, function (err) {
            //         console.log(err);
            //         res.status(500).json(err);
            //     });

            products
                .forEach(function (product) {
                    model
                        .find({ sku: product.sku }, function (err, docs) {
                            if (!docs.length) {
                                model
                                    .create(product)
                                    .catch(function (err) {
                                        console.log(err);
                                        res.status(500).json(err);
                                    });
                            } else {
                                var msg = "Product [" + product.sku + "] already exists";
                                console.log(msg);
                                res.status(422).send({ "messsage": msg });
                            }
                        });
                });
        };

        update(req, res) {
            console.log("[MONGO] - update product");
            model
                .findByIdAndUpdate(req.params.id, req.body)
                .then(function (product) {
                    res.json(product);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

    };
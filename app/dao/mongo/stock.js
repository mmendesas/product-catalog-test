var mongoose = require('mongoose');
var model = mongoose.model('Product');

module.exports =
    class MongoProductsDAO {

        list(req, res) {
            console.log("[MONGO] - get stock information");
            model
                .find(req.query)
                .then(function (stock) {
                    var response = {
                        quantity: stock.length,
                        warehouse: stock.warehouse
                    }
                    res.json(response);
                }, function (err) {
                    console.log(err);
                    res.status(500).json(err);
                });
        };

    };
//var mongoose = require('mongoose');

// get the product model
//var model = mongoose.model('Products');

module.exports =
    class MongoDAO {
        
        list() {
            console.log("list on Mongoloides");
        };

        findById() {
            console.log("findById on Mongoloides");
        };

        removeById() {
            console.log("remove By ID on Mongoloides");
        };

        add() {
            console.log("add on Mongoloides");
        };

        update() {
            console.log("update do sernhor Mongo");
        };
    };
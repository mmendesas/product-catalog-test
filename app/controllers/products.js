var validate = require('express-jsonschema').validate;
var productlist = require('../schemas/productlist.json');



module.exports = function (app) {

    var StreetSchema = {
        type: 'object',
        properties: {
            number: {
                type: 'number',
                required: true
            },
            name: {
                type: 'string',
                required: true
            },
            type: {
                type: 'string',
                required: true,
                enum: ['Street', 'Avenue', 'Boulevard']
            }
        }
    }

    // This route validates req.body against the StreetSchema
    app.post('/street/', validate({ body: StreetSchema }), function (req, res) {

        console.log(req.body);
        // At this point req.body has been validated and you can
        // begin to execute your application code
    });

    app.get("/products", function (req, res) {
        res.send('ok');
    });

    app.post("/products", function (req, res) {

        var products = req.body;

        products.forEach(function (element) {
            console.log('ATESA', JSON.stringify(element));
        });

        res.send('ok');
    });

}
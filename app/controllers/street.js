var validate = require('express-jsonschema').validate;
var streetSchema = require('../schemas/street.json');

module.exports = function (app) {

    // var StreetSchema = {
    //     type: 'object',
    //     properties: {
    //         number: {
    //             type: 'number',
    //             required: true
    //         },
    //         name: {
    //             type: 'string',
    //             required: true
    //         },
    //         type: {
    //             type: 'string',
    //             required: true,
    //             enum: ['Street', 'Avenue', 'Boulevard']
    //         }
    //     }
    // }

    // This route validates req.body against the StreetSchema
    app.post('/street/', validate({ body: streetSchema }), function (req, res) {
        // At this point req.body has been validated and you can
        // begin to execute your application code
        console.log(req.body);
        res.send('OK');
    });
}
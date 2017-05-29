
var errorHandler = {

    logErrors: function (err, req, res, next) {
        console.error(err.stack);
        next(err);
    },

    clientErrorHandler: function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' })
        } else {
            next(err)
        }
    },

    errorHandler: function (err, req, res, next) {
        res.status(500)
        res.render('error', { error: err })
    },

    schemaValidation: function (app) {
        return function (err, req, res, next) {
            var responseData;

            if (err.name === 'JsonSchemaValidation') {
                // Log the error however you please
                console.log(err.message);
                // logs "express-jsonschema: Invalid data found"

                // Set a bad request http response status or whatever you want
                res.status(400);

                // Format the response body however you want
                responseData = {
                    statusText: 'Bad Request',
                    jsonSchemaValidation: true,
                    validations: err.validations  // All of your validation information
                };

                // Take into account the content type if your app serves various content types
                if (req.xhr || req.get('Content-Type') === 'application/json') {
                    res.json(responseData);
                } else {
                    // If this is an html request then you should probably have
                    // some type of Bad Request html template to respond with
                    res.render('badrequestTemplate', responseData);
                }
            } else {
                // pass error to next error middleware handler
                next(err);
            }
        }
    }


}

module.exports = errorHandler;
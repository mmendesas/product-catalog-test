
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

    schemaValidation: function (err, req, res, next) {
        var responseData;

        if (err.name === 'MySchemaValidation') {

            console.log(err.message);

            responseData = {
                statusText: 'Bad Request',
                schemaValidation: true,
                validationErrors: err.validations
            };

            res.status(400).json(responseData);

        } else {
            // pass error to next error middleware handler
            next(err);
        }
    }
}

module.exports = errorHandler;
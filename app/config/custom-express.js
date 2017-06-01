var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var errhandler = require('../error/error-handler');

module.exports = function () {

    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    consign({ cwd: 'app' })
        .include('models')
        .then('controllers')
        .into(app);

    // handle errors
    app.use(errhandler.schemaValidation);
    app.use(errhandler.logErrors);
    app.use(errhandler.clientErrorHandler);
    app.use(errhandler.errorHandler);

    return app;
}

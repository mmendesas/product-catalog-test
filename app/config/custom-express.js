var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var errhandler = require('../error/error-handler');

module.exports = function () {

    var app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(errhandler.schemaValidation(app))

    consign({ cwd: 'app' })
        .include('controllers')
        .into(app);

    return app;

}
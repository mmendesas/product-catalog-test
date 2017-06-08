var mongoose = require('mongoose');

module.exports = function (uri) {

    mongoose.connect('mongodb://' + uri);

    mongoose.connection.on('connected', function () {
        console.log('Connected to MongoDB.\n')
    });

    mongoose.connection.on('error', function (error) {
        console.log('Connection error: ' + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Disconnected from MongoDB.');
    });

    //when application is closed
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Connection closed at the end of the application.');
            process.exit(0);
        });
    });
};
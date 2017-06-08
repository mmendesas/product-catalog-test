var app = require('./config/custom-express')();
require('./config/mongo-conf')('localhost/product_catalog_db');
require('./config/redis-conf').start();

//define storage for use : MONGO or REDIS
require('../app/config/storage').setStorage("REDIS");

app.set('port', process.env.PORT || 3300);

var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});
var app = require('./app/config/custom-express')();
//require('./app/config/database')('localhost/product_catalog_db');

app.listen(3300, function () {        
    console.log('Server running on pont 3300');
})
var mongoose = require('mongoose');

//load schemas
//var sch_products = require('../schemas/products.json');
var sch_product = require('../schemas/product.json');

//create models
mongoose.model('Product', mongoose.Schema(sch_product.properties));
//mongoose.model('Products', mongoose.Schema(sch_products));
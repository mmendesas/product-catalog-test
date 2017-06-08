var mongoose = require('mongoose');

//load schemas
var sch_product = require('./schemas/product.json');
var sch_stock = require('./schemas/stock.json')

//create models
mongoose.model('Product', mongoose.Schema(sch_product.properties));
mongoose.model('Stock', mongoose.Schema(sch_stock.properties));
var express = require('express');
var router = express.Router();
var products = require('../configs/model/product-schema');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('./shop/index', { title: 'Online Boutique' });
});

module.exports = router;

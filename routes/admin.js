var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin/admin-home', {title : 'Admin', layout: 'admin-layout'});
});

/* GET add products page */
router.get('/addProduct', function(req, res, next) {
    res.render('admin/add-products', {title : 'Add New products', layout: 'admin-layout'});
});




module.exports = router;

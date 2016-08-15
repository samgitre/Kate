var express = require('express');
var router = express.Router();
var products = require('../configs/model/product-schema');

/* GET users listing. */
router.get('/admin-home', function(req, res, next) {
    res.render('admin/admin-home', {title : 'Admin', layout: 'admin-layout'});
});

/* GET add products page */
router.get('/all-products', function(req, res, next) {
    res.render('admin/all-products', {title : 'Manage Products', layout: 'admin-layout'});
});


router.get('/add-products', function(req, res, next) {
    res.render('admin/add-products', {title : 'Add New Products', layout: 'admin-layout'});
});


router.post('/product', function (req, res) {
    var newProduct = new products({
        title : req.body.title,
        category : req.body.category,
        color : req.body.color,
        price : req.body.price,
        quantity : req.body.quantity,
        photo :  req.file
    });
    newProduct.save(function (err) {
        if (err){
            res.send(err);
            return err;
        }
        res.json({message: 'New product created'});
    });
});


router.get('/product/:id', function (req, res) {
    products.findById(req.params.id, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json(product);

    });

});


router.delete('/product/:id',function (req,res) {
    products.remove({_id: req.params.id}, function (err, product) {
        if(err){
            res.send(err);
        }
        res.json({message : 'product deleted successfully'});
    });
});


module.exports = router;

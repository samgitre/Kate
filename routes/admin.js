var express = require('express');
var router = express.Router();
var products = require('../configs/model/product-schema');
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination : function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename : function (req, file, callback) {
        callback(req.body.productImage, file.name + '.-' );
    }
});

var upload = multer({storage : storage}).single('productImage');



/* GET users listing. */
router.post('/admin-login', function(req, res, next) {
    res.render('admin/admin-home', {title : 'Admin Dashboard', layout: 'admin-layout'});

});


router.get('/admin-login', function(req, res, next) {
    res.render('admin/admin-login', {title : 'Admin Login'});


});

router.get('/admin-user', function(req, res, next) {
    res.render('admin/admin-user', {title : 'Admin User' , layout: 'admin-layout'});
});





/* GET add products page */
router.get('/all-products', function(req, res, next) {
    res.render('admin/all-products', {title : 'Manage Products', layout: 'admin-layout'});
});

router.get('/add-products', function(req, res, next) {
    res.render('admin/add-products', {title : 'Add New Products', layout: 'admin-layout'});
});


router.post('/addproduct', function (req, res) {
    var newProduct = new products({
        title : req.body.title,
        category : req.body.category,
        color : req.body.color,
        price : req.body.price,
        quantity : req.body.quantity,
        image :  upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        })

    });
    newProduct.save(function (err) {
        if (err){
            res.send(err.message);
            return;
        }
         res.status(200).send('Product save to database successfully');
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

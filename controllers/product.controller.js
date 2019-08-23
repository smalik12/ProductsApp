const Product = require('../models/product.model');

exports.product_create = (req, res) => {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }

        res.send('Product created successfully');
    })
};

exports.product_all = function (req, res) {
    Product.find({}, function (err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.json(allProducts);
        }
    });
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return next(err);
        }

        res.json(product);
    });
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
        if (err) {
            return next(err);
        }

        res.send('Product updated');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }

        res.send('Deleted successfully');
    });
};
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
    Product.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        },
        { upsert: true } // adds document if id does not exist
    ).catch((err) => {
        res.send(err);
    })

    res.send("Product Updated");
};

exports.product_delete = function (req, res) {
    Product.deleteOne(
        { _id: req.params.id },
    ).catch((err) => {
        res.send(err);
    })

    res.send("Product Deleted");
};
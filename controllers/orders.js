var config = require('../config'),
    o = require('./library/orders'),
    Q = require('q');

/**
 * curl -X GET http://localhost:8080/v1/api/orders
 */
exports.main = function(req, res) {
    Q.allResolved([o.get_orders()])
        .spread(function(cart_data) {
            var result = {
                result: cart_data
            };
            res.send(result);
        });
};

/**
 * curl -X DELETE http://localhost:8080/v1/api/orders/5255ef81c6bd02b804000001
 */
exports.delete = function(req, res) {
    var id = req.params.id;
    return o.delete_order(id)
        .then(function(data) {
            var result = {
                result: id + ' removed'
            };
            res.send(result);
        });
};

/**
 * curl -X POST -H "Content-Type: application/json" -d '{"lat":"123","lon":"123"}' http://localhost:8080/v1/api/orders
 */
exports.add = function(req, res) {
    var order = {
        lat: '123',
        lon: '123'
    };
    return o.add_order(order)
    .then(function(data) {
        var result = {
            order_id: data
        };
        res.send(result);
    });
};

/**
 * curl -X PUT http://localhost:8080/v1/api/orders/5255f02e47e2e5d104000002
 */
exports.update = function(req, res) {
    var id = req.params.id

    var order = {
        'lat': '1234',
        'lon': '1234',
    };

    return o.update_order(id, order)
        .then(function(data) {
            res.send(data);
        });
};

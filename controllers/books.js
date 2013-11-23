var config = require('../config'),
    o = require('./library/books'),
    Q = require('q');

/**
 * curl -X GET http://localhost:8080/v1/api/books
 */
exports.main = function(req, res) {
    Q.allResolved([o.get_books()])
        .spread(function(cart_data) {
            var result = {
                result: cart_data
            };
            res.send(result);
        });
};

/**
 * curl -X DELETE http://localhost:8080/v1/api/books/5255ef81c6bd02b804000001
 */
exports.delete = function(req, res) {
    var id = req.params.id;
    return o.delete_book(id)
        .then(function(data) {
            var result = {
                result: id + ' removed'
            };
            res.send(result);
        });
};

/**
 * curl -X POST -H "Content-Type: application/json" -d '{"user_id": "1", "book_name":"Enders Game", "lat":"123","lon":"123"}' http://localhost:8080/v1/api/books
 */
exports.add = function(req, res) {
    var book = {
        user_id: req.body.user_id,
        book_name: req.body.book_name,
        book_caption: req.body.book_caption,
        book_url: req.body.book_url,
        lat: req.body.lat,
        lon: req.body.lon,
    };
    return o.add_book(book)
    .then(function(data) {
        var result = {
            book_id: data
        };
        res.send(result);
    });
};

/**
 * curl -X PUT http://localhost:8080/v1/api/books/5255f02e47e2e5d104000002
 */
exports.update = function(req, res) {
    var id = req.params.id

    var book = {
        'lat': '1234',
        'lon': '1234',
    };

    return o.update_book(id, book)
        .then(function(data) {
            res.send(data);
        });
};

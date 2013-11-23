var config = require('../config'),
    u = require('./library/users'),
    Q = require('q');

/**
 * curl -X GET http://localhost:8080/v1/api/users
 */
exports.main = function(req, res) {
    Q.allResolved([u.get_users()])
        .spread(function(data) {
            var result = {
                result: data
            };
            res.send(result);
        });
};

/**
 * curl -X GET http://localhost:8080/v1/api/users/verify?username=jason&password=1234
 * http://localhost:8080/v1/api/users/verify?username=jason&password=1234
 */
exports.verify = function(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    console.log(username);
    Q.allResolved([u.verify_user(username, password)])
        .spread(function(data) {
            if(data.length > 0) {
                var result = {
                    status: 1000,
                    result: data
                };
            } else {
                var result = {
                    status: 1001,
                    result: 'Invalid username and/or password'
                };
                console.log(result);

            }
            res.send(result);
        });
};


/**
 * curl -X DELETE http://localhost:8080/v1/api/users/5255ef81c6bd02b804000001
 */
exports.delete = function(req, res) {
    var id = req.params.id;
    return u.delete_user(id)
        .then(function(data) {
            var result = {
                result: id + ' removed'
            };
            res.send(result);
        });
};

/**
 * curl -X POST -H "Content-Type: application/json" -d '{"user_name": "jason", "user_password":"1234", "user_email":"jason@jkyau.com","user_real_name":"Jason Yau"}' http://localhost:8080/v1/api/users
 */
exports.add = function(req, res) {
    var user = {
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        user_email: req.body.user_email,
        user_real_name: req.body.user_real_name,
        user_profile_photo: req.body.user_profile_photo
    };
    return u.add_user(user)
    .then(function(data) {
        var result = {
            user_id: data
        };
        res.send(result);
    });
};

/**
 * curl -X PUT http://localhost:8080/v1/api/users/5255f02e47e2e5d104000002
 */
exports.update = function(req, res) {
    var id = req.params.id

    var user = {
        'lat': '1234',
        'lon': '1234',
    };

    return u.update_user(id, user)
        .then(function(data) {
            res.send(data);
        });
};

var Q = require('q'),
    ObjectID = require('mongodb').ObjectID,
    mongo = require('mongodb');

var config = require('../../config');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.production.mongo_host, config.production.mongo_port, {auto_reconnect: true});
db = new Db('hemingway', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'hemingway' database");
        db.collection('users', {safe:true}, function(err, collection) {
        }); 
    } else {
        console.log(err);
    }   
});

exports.get_users = function() {
    var d = Q.defer();

    db.collection('users', function(err, collection) {
        collection.find().sort({_id:-1}).limit(50).toArray(function(err, items) {
            d.resolve(items);
        });
    });

    return d.promise;
};

exports.verify_user = function(username, password) {
    var d = Q.defer();

    db.collection('users', function(err, collection) {
        collection.find({'user_name':username, 'user_password':password}).toArray(function(err, items) {
            d.resolve(items);
        });
    });

    return d.promise;
};

exports.delete_user = function(id) {
    var d = Q.defer();
    var _id = new ObjectID(id);

    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({"_id": new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                console.log({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                d.resolve('true');
            }
        });
    });

    return d.promise;
};

exports.add_user = function(user) {
    d = Q.defer();
    db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                d.resolve(result[0]._id);
            }
        });
    });
    return d.promise;
};

exports.update_user = function(id, user) {
    var d = Q.defer();
    console.log('Updating user: ' + id);

    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
            } else {
                console.log('' + result + ' document(s) updated');
                d.resolve(user);
            }
        });
    });
    return d.promise;
};

var Q = require('q'),
    ObjectID = require('mongodb').ObjectID,
    mongo = require('mongodb');

var config = require('../../config');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server(config.production.mongo_host, config.production.mongo_port, {auto_reconnect: true});
db = new Db('cartgirl', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'cartgirl' database");
        db.collection('orders', {safe:true}, function(err, collection) {
        }); 
    } else {
        console.log(err);
    }   
});

exports.get_orders = function() {
    var d = Q.defer();

    db.collection('orders', function(err, collection) {
        collection.find().toArray(function(err, items) {
            d.resolve(items);
        });
    });

    return d.promise;
};

exports.delete_order = function(id) {
    var d = Q.defer();
    var _id = new ObjectID(id);

    console.log('Deleting order: ' + id);
    db.collection('orders', function(err, collection) {
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

exports.add_order = function(order) {
    d = Q.defer();
    db.collection('orders', function(err, collection) {
        collection.insert(order, {safe:true}, function(err, result) {
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

exports.update_order = function(id, order) {
    var d = Q.defer();
    console.log('Updating order: ' + id);

    console.log(JSON.stringify(order));
    db.collection('orders', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, order, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating order: ' + err);
            } else {
                console.log('' + result + ' document(s) updated');
                d.resolve(order);
            }
        });
    });
    return d.promise;
};

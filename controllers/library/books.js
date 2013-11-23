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
        db.collection('books', {safe:true}, function(err, collection) {
        }); 
    } else {
        console.log(err);
    }   
});

exports.get_books = function() {
    var d = Q.defer();

    db.collection('books', function(err, collection) {
        collection.find().sort({_id:-1}).limit(50).toArray(function(err, items) {
            d.resolve(items);
        });
    });

    return d.promise;
};

exports.delete_book = function(id) {
    var d = Q.defer();
    var _id = new ObjectID(id);

    console.log('Deleting book: ' + id);
    db.collection('books', function(err, collection) {
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

exports.add_book = function(book) {
    d = Q.defer();
    db.collection('books', function(err, collection) {
        collection.insert(book, {safe:true}, function(err, result) {
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

exports.update_book = function(id, book) {
    var d = Q.defer();
    console.log('Updating book: ' + id);

    console.log(JSON.stringify(book));
    db.collection('books', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, book, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating book: ' + err);
            } else {
                console.log('' + result + ' document(s) updated');
                d.resolve(book);
            }
        });
    });
    return d.promise;
};

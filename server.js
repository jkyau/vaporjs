var express = require('express'),
    http = require('http'),
    sys = require('sys'),
    config = require('./config'),
    fs = require('fs'),
    passport = require('passport'),
    engine = require('ejs-locals'),
    util = require('util'),
    GoogleStrategy = require('passport-google').Strategy,
    io = require('socket.io'),
    https = require('https'),
    path = require('path');

var api = express();

api.configure(function(req, res) {
    api.set('port', config.port);
    api.set('api_version', config.api_version);
    api.use(express.logger());
    api.use(express.cookieParser());
    api.use(express.bodyParser());
    api.use(express.methodOverride());
    api.use(express.session({secret: 'keyboard cat'}));
    api.use(express.static(path.join(__dirname, 'public')));
    api.set('view engine', 'ejs');
    api.set('views', __dirname + '/views');
    //api.engine('html', require('ejs').renderFile);
    api.engine('html', engine);
});

/******************* socket io ********************/
var server = http.createServer(api);
var io = io.listen(server);
/******************* socket io ********************/

server.listen(api.get('port'), function() {
    console.log('server running on 8080');
});

require('./routes')(api);

/*
 * Configuration data for application
 */
var config = {};

config.production = {
    'mongo_host' : '54.225.235.228',
    'mongo_port' : '27017'
};

config.amazon = {
    'secret_key' : 'kfZ6HZxU9bnFg3Pck7+TNGsBZaYBlE1Han9Zc641',
    'access_key' : 'AKIAJ2FHLICJATFSMN2Q'
};

config.facebook = {
    'app_id':'633177986705650',
    'app_secret':'b80e6025543fe821a5c65de480f09922'
};

/*
 * Server configuration
 */
config.port = 8080;
config.api_version = 'v1';

module.exports = config;

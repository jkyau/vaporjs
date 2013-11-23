var config = require('./config');

exports = module.exports = function(api) {
    require('./routes/jkyau')(api);

    api.get('/'+api.get('api_version')+'/api/:resource/:action?', function(req, res) {
        var resource = req.params.resource;
        var action = req.params.action;

        var lat = req.query.lat;
        var lon = req.query.lon;
        var host = req.headers.host;

        var params = '';
        for(var key in req.query) {
           params += key + '=' + req.query[key] + '&'; 
        }
        uri_params = '?'+params.substring(0, params.length - 1);

        if(action) {
            var uri = host+'/'+api.get('api_version')+'/api/'+resource+'/'+action+uri_params;
        } else {
            var uri = host+'/'+api.get('api_version')+'/api/'+resource+'/'+uri_params;
        }

        var now = new Date();

        var loggy = {
            date: now,
            uri: uri,
            params: req.query,
        }

        console.log(loggy);

        try {
            var resource = require('./controllers/' + resource);
        } catch(e) {
            console.log('couldnt find resource',e);
            res.send(config.errors.invalid_resource);
            return;
        }

        if(action) {
            try {
                console.log("invoking action=" + action);
                resource[action](req,res);
            } catch(e) {
                res.send(config.errors.invalid_action);
            }
        } else {
            console.log("invoking main()");
            resource.main(req,res);
        }

    });

    api.post('/'+api.get('api_version')+'/api/:resource', function(req, res) {
        console.log('POST call ' + '/'+api.get('api_version')+'/api/:resource');
        var resource = req.params.resource;
        var action = "add";

        try {
            var resource = require('./controllers/' + resource);
        } catch(e) {
            console.log("resource not found " + './controllers/' + resource + '.js', e);
            res.send(config.errors.invalid_resource);
            return;
        }

        if(action) {
            try {
                console.log("invoking action=" + action);
                resource[action](req,res);
            } catch(e) {
                console.log(resource, action);
                console.log("add method not found in " + './controllers/' + resource + '.js', e);
                res.send(config.errors.invalid_action);
            }
        } else {
            console.log('action not set for resource ' + resource);
            resource.main(req,res);
        }
    });

    api.delete('/'+api.get('api_version')+'/api/:resource/:id', function(req, res) {
        var resource = req.params.resource;
        var action = "delete";

        try {
            var resource = require('./controllers/' + resource);
        } catch(e) {
            res.send(config.errors.invalid_resource);
            return;
        }

        if(action) {
            try {
                resource[action](req,res);
            } catch(e) {
                res.send(config.errors.invalid_action);
            }
        } else {
            resource.main(req,res);
        }
    });

    api.put('/'+api.get('api_version')+'/api/:resource/:id', function(req, res) {
        var resource = req.params.resource;
        var action = "update";

        try {
            var resource = require('./controllers/' + resource);
        } catch(e) {
            res.send(config.errors.invalid_resource);
            return;
        }

        if(action) {
            try {
                resource[action](req,res);
            } catch(e) {
                res.send(config.errors.invalid_action);
            }
        } else {
            resource.main(req,res);
        }
    });
}

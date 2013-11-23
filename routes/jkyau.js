exports = module.exports = function(api) {
    api.get('/', function(request, response){
            response.render("index.html", { type: "all"});
    });
}

var config = require('../config'),
    request = require('request'),
    xml2js = require('xml2js');

exports.search = function(req, res) {
    var q = req.query.q;
    var url = "https://www.goodreads.com/search.xml?key=8sqEM76VPX4YYC24WAteTA&q=" + q;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parser = new xml2js.Parser();

            parser.on('end', function(result) {
                var _result = result.GoodreadsResponse.search[0].results[0].work;

                var results = []; 
                for (var i=0; i<_result.length; i++) {
                    console.log(_result[i]);
                    var _book = {
                        title: _result[i].best_book[0].title[0],
                        author: _result[i].best_book[0].author[0].name[0],
                        image_url: _result[i].best_book[0].image_url[0],
                        small_image_url: _result[i].best_book[0].small_image_url[0]
                    }
                    results.push(_book);
                }   

                var _results = { 
                    results:results
                }   
                res.send(_results);
            }); 
            parser.parseString(body);
        }   
    }); 
};

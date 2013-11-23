var auth = {};

auth.ensureAuthenticated = function(req, res, next) {
        if (req.isAuthenticated()) {
            var email = req.user.emails[0].value;
            if(email.indexOf('@samsungaccelerator.com') !== -1 ) 
                return next(); 
        } 

    console.log('not logged in');
    res.redirect('/login');
}

module.exports = auth; 

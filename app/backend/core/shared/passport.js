var google   = require('passport-google-oauth').OAuth2Strategy,
    config = require('./../../../settings');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });    

    passport.use(new google({
    clientID        :'549580664966-1o7g7d9mqke4jsijon6ae30jv9onhfo8.apps.googleusercontent.com',
    clientSecret    :'8hw9ooOPGTses-3PcLg3_gys',
    callbackURL     : config.domainUrl
    },function(token, tokenSecret, profile, done){
        profile.userToken = token;
        profile.userTokenSecret = tokenSecret;
        return done(null,profile);
    }));
}


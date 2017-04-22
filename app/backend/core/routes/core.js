/**
 * @module app/backend/core/routes
 * @description Core Routes
 */

let passport = require('passport'),
session = require('express-session'),
appAuthentication = require('./../shared/passport');

module.exports = (app) => {

    app.use(session({
    secret: 'gsewithgoogle',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure:false,
        maxAge:1800000
        }
    }));

    let passportInstance = passport;
    app.use(passportInstance.initialize());
    app.use(passportInstance.session());
    appAuthentication(passportInstance);


    app.get('/authenticate', passportInstance.authenticate('google', { 
        scope: 'email profile',
        successRedirect: '/authenticated',
        failureRedirect: '/notauthenticated'
    }));

    app.get('/authenticated', function(req, res) {
        res.redirect('/');
    });

    app.get('/notauthenticated', function(req, res){
    res.redirect('/');
    });

    app.route('/')
        .get((req, res) => {
            console.log({isAuthenticatedUser: req.isAuthenticated()});
            res.render('index',{isAuthenticatedUser: req.isAuthenticated()});
        });

    app.get('/bmi',function(req,res){
        res.json({
            bmi:"323",
            status:"Normal"
        });
    })
};

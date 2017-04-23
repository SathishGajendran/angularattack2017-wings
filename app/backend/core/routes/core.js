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
            secure: false,
            maxAge: 1800000
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

    app.get('/authenticated', function (req, res) {
        res.redirect('/');
    });

    app.get('/notauthenticated', function (req, res) {
        res.redirect('/');
    });

    app
        .route('/')
        .get((req, res) => {
            res.render('index', {
                isAuthenticatedUser: req.isAuthenticated()
            });
        });

    app.get('/userdetails', (req, res) => {
        if (req.isAuthenticated()) {
            res.json({code: 200, user: req.user});
        } else {
            res
                .status(401)
                .json({srr: 'Unauthorized Access!!!'});
        }
    });

    app.get('/bmi', function (req, res) {
        let BMI = [
                {
                    from: 0,
                    to: 18.4,
                    stage: "Underweight"
                }, {
                    from: 18.5,
                    to: 24.99,
                    stage: "Normal Weight"
                }, {
                    from: 25,
                    to: 29.99,
                    stage: "Overweight"
                }, {
                    from: 30,
                    to: 39.99,
                    stage: "Obesity"
                }, {
                    from: 40,
                    to: 60,
                    stage: "Morbid Obesity"
                }
            ],
            BMIRange,
            result;
        //weight-->kg height-->m 0.0254
        BMIRange = req.query.weight / ((req.query.height * req.query.height) / 10000);

        result = BMI.filter((val) => {
            return (BMIRange >= val.from) && (BMIRange <= val.to);
        })[0];

        result = result|| BMI[4];

        result.bmi = BMIRange;

        res.json(result);
    })
};

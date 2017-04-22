/**
 * @name app/express
 * @description Express Middleware configurations
 * @argument dbConObject
 * @returns {Object} app
 */
// NPM modules
var express = require('express'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    path = require('path'),
    http = require('http'),
    compression = require('compression'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),

    // configurations
    config = require('.././');
/**
 * @function initAppLocals
 * @description It is app local variables, It can access via server views
 */
module.exports.initAppLocals = (app) => {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;

    // Passing environment locals to response objects
    app.use((req, res, next) => {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
};

/**
 * @function initViewEngine
 * @description Initialize view engine for server side views
 */
module.exports.initViewEngine = (app) => {
    // Compression
    app.use(compression());
    // Set views path and view engine
    app.set('view engine', config.templateEngine);
    app.set('views', './app/views');
};

/**
 * @function initMiddlewares
 * @description Initialize App Middlewares
 */
module.exports.initMiddlewares = (app) => {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Should be placed before express.static
    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Environment dependent middleware
    if (config.environment === 'local') {
        // Disable views cache
        app.set('view cache', false);
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
};

/**
 * @function initSessions
 * @argument app {Object} dbConObject
 * @description Initialize MongoDB Sessions
 */
module.exports.initSessions = (app, db) => {
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.session.secret,
        cookie: config.session.cookie,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: config.session.collection
        })
    }));
};


/**
 * @function initHelmetHeaders
 * @description Initialize Helmet headers to secure Express headers
 */
module.exports.initHelmetHeaders = (app) => {
    let SIX_MONTHS = 15778476000;
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
};

/**
 * @function initClientModules
 * @description Initialize Publicly served modules in App
 */
module.exports.initClientModules = (app) => {
    let options = {};
    
    if (config.environment === 'production') {
        options.maxAge = (1000 * 60 * 60 * 24); // 1 day
    }
    // Setting Static Assets folders
    app.use('/', express.static(path.resolve('./public'), options));
    app.use('/assets', express.static(path.resolve('./app/frontend/assets'), options));
};

/**
 * @function initServerRoutes
 * @description Initialize Server Routes
 */
module.exports.initServerRoutes = (app) => {
    let router = express.Router(),
        routes = [
            'app/backend/**/routes/*.js'
        ];
    config.getPaths(routes).forEach((route) => {
        require(path.resolve(route))(router);
    });
    app.use('/', router);
};


/**
 * @function initErrorHandler
 * @description Handling the errors in Server Side
 */
module.exports.initErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        if (!err) {
            next();
        }
        // Log in server
        console.log(err.stack);

        // Redirect to Index Page
        res.render('index');
    })
};

/**
 * @function createServer
 * @description Create app server
 * @argument app
 * @returns {Object} serverObj
 */
module.exports.createServer = (app) => {
    var server = http.createServer(app);
    return server;
};

/**
 * @function init
 * @description Initialize the express Middleware
 */
module.exports.init = (db) => {
    var self = this,
        app;

    // Express App
    app = express();

    // Initialize App Local Variables
    self.initAppLocals(app);

    // Initialize View Engine
    self.initViewEngine(app);

    self.initSessions(app);

    // Initialize Helmet security headers
    self.initHelmetHeaders(app);

    // Initialize App Middlewares
    self.initMiddlewares(app);

    // Initialize Client modules
    self.initClientModules(app);

    // Initialize Server routes
    self.initServerRoutes(app);

    // Initialize Error Handler
    self.initErrorHandler(app);

    // Creating App Server
    app = self.createServer(app);

    return app;
};

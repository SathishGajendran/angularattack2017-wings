/**
 * @module app/frontend/webpack
 * @name BuildSystem:Webpack
 * @description It is a Build System for Front End Application.
 */

/** NPM Modules */
var webpack = require('webpack'),
    path = require('path');

/** Configuration */
var config = {

    /** Node Configurations */
    node: {
        fs: 'empty'
    },

    /** source files */
    entry: {
        app: './app/frontend/bootstrap.ts',
        vendor: './app/frontend/vendor.ts',
        polyfills: './app/frontend/polyfills.ts'
    },

    /** resolve condition */
    resolve: {
        /** file extensions */
        extensions: ['.ts', '.js', '.vue']
    },

    /** output files */
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'public'),
        chunkFilename: '[name]-[id].chunk.js'
    },

    /** modules */
    module: {
        /** Rules with Loaders */
        rules: [
            {
                test: /\.ts$/,
                exclude: [
                    path.resolve(process.cwd(), 'app/frontend/tests'),
                    'node_modules',
                    '*.spec.ts'
                ],
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(process.cwd(), 'app/frontend/tsconfig.json')
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],

        /** warnings */
        exprContextCritical: false
    },

    /** plugins */
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.resolve(process.cwd(), 'app/frontend'),
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            children: true,
            async: true,
            minChunks: 3
        })
    ]
};

module.exports = config;
/**
 * @module app/frontend/polyfills
 * @name polyfills
 * @description It is used to provide the browser support.
 */

/** NPM Modules */
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');


Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');
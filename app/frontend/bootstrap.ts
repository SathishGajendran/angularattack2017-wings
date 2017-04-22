/**
 * @module app/frontend/app/bootstrap
 * @name bootstrap
 * @description It is used to bootstraping the Angular Module
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

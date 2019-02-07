/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { WebHost } from '@microsoft/mixed-reality-extension-sdk';
import { log } from '@microsoft/mixed-reality-extension-sdk/built/log';
import { resolve as resolvePath } from 'path';
import SolarSystem from './app';

log.enable('app');
// log.enable('network', 'debug');

process.on('uncaughtException', err => console.log('uncaughtException', err));
process.on('unhandledRejection', reason => console.log('unhandledRejection', reason));

// Start listening for connections, and serve static files
const server = new WebHost({
    baseDir: resolvePath(__dirname, '../public'),
//    baseUrl: 'http://915514d2.ngrok.io'
});

// Handle new application sessions
server.adapter.onConnection(context => new SolarSystem(context, server.baseUrl));

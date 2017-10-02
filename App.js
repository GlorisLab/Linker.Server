'use strict'

const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database');

const Server = require('./server/Server');

const server = new Server()
						.attachDatabase(databaseConfig)
						.attachRouter(routesConfig)
						.enableLogs()
						.serve(3000);

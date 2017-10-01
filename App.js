'use strict'

const databaseConfig = require('./config/database');

const Server = require('./server/Server');

const server = new Server()
						.attachDatabase(databaseConfig)
						.attachRouter('')
						.enableLogs()
						.serve(3000);

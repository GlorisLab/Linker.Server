'use strict'

const Server = require('./server/Server');

const server = new Server()
						.enableLogs()
						.attachRouter('')
						.serve(3000);

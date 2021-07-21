/**
 * Copyright (c) 2020 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Logger } from "@utils/logger";

const WebSocketClient = require('websocket').client;

export class NodeDebugger {
	client = new WebSocketClient();

	constructor() {
		this.client.on('connectFailed', function (error) {
			console.log('Connect Error: ' + error.toString());
		});

		this.client.on('connect', (connection) => {
			console.log('WebSocket Client Connected');
			connection.on('error', function (error) {
				console.log("Connection Error: " + error.toString());
			});
			connection.on('close', function () {
				console.log('echo-protocol Connection Closed');
			});
			connection.on('message', function (message) {
				if (message.type === 'utf8') {
					console.log("Received: '" + message.utf8Data + "'");
				}
			});

			function sendNumber() {
				if (connection.connected) {
					var number = Math.round(Math.random() * 0xFFFFFF);
					connection.sendUTF(number.toString());
					setTimeout(sendNumber, 1000);
				}
			}

			sendNumber();
		});
	}

	public connect(pid: number): void {
		let port = 9229;
		let url = `ws://127.0.0.1:${ port }/${ pid }`;
		Logger.logGreen(`Connection to "${ url }" on port "${ port }"`)
		this.client.connect(url);
	}
}

const pid = "10"; //CliCommander.getParamByName("pid");

let debug: NodeDebugger;

try {
	if (pid) {
		debug = new NodeDebugger();
		debug.connect(Number.parseInt(pid));
	}
	else {
		console.log('PID is Missing');
		process.exit(-99);
	}

} catch (err) {
	console.log('Error starting debug client ::', err);
}

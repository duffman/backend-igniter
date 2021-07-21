"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeDebugger = void 0;
/**
 * Copyright (C) 2020 Ionic Igniter - ionicigniter.com
 * Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var cli_commander_1 = require("../core/terminal/cli.commander");
var cli_logger_1 = require("../core/terminal/cli.logger");
var WebSocketClient = require('websocket').client;
var NodeDebugger = /** @class */ (function () {
    function NodeDebugger() {
        this.client = new WebSocketClient();
        this.client.on('connectFailed', function (error) {
            console.log('Connect Error: ' + error.toString());
        });
        this.client.on('connect', function (connection) {
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
    NodeDebugger.prototype.connect = function (pid) {
        var port = 9229;
        var url = "ws://127.0.0.1:" + port + "/" + pid;
        cli_logger_1.Logger.logGreen("Connection to \"" + url + "\" on port \"" + port + "\"");
        this.client.connect(url);
    };
    return NodeDebugger;
}());
exports.NodeDebugger = NodeDebugger;
var pid = cli_commander_1.CliCommander.getParamByName("pid");
var debug;
try {
    if (pid) {
        debug = new NodeDebugger();
        debug.connect(Number.parseInt(pid));
    }
    else {
        console.log('PID is Missing');
        process.exit(-99);
    }
}
catch (err) {
    console.log('Error starting debug client ::', err);
}

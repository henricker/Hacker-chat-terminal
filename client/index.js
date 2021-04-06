#!/usr/bin/env node

/*
    chmod +x index.js
*/

/*
./index.js \
    --username henricker \
    --room sala01
*/
import Events from 'events';
import TerminalController from "./src/TerminalController.js";
import CliCommands from './src/CliCommands.js';
import SocketClient from './src/Socket.js';
import EventManager from './src/eventManager.js';

const [nodePath, filePath, ...commands] = process.argv;
const config = CliCommands.parseArguments(commands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);
await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });
const events = eventManager.getEvents();
socketClient.attachEvents(events);

const data = {
    roomId: config.room,
    userName: config.username,
}
eventManager.joinRoomAndWaitForMessages(data);

const controller = new TerminalController();
await controller.initializeTable(componentEmitter);
"use strict"

const fs = require("fs");
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const reader = require('./reader.js');

const chatMsgs = [];
let clientCounter = 1;

const isFile = (path) => fs.lstatSync(path).isFile();

const server = http.createServer((req, res)=> {

    const fullPath = path.join(process.cwd(), req.url);
    let linksList = '';
    let breadCrumbs = `<a href="${req.url.replace(req.url, '/')}">Go back</a>`;

    if (!fs.existsSync(fullPath)) return res.end('File or directory not found');

    if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
    }
    
    fs.readdirSync(fullPath)
        .forEach(fileName => {
            const filePath = path.join(req.url, fileName);
            linksList += `<li><a href="${filePath}">${fileName}</a></li>`;
        });
    
    const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##links', linksList).replace('##breadCrumbs', breadCrumbs);

    return res.end(HTML);

}).listen(5555);

const io = socket(server);
io.on('connection', client => {
    client.emit('conncected', chatMsgs, clientCounter);
    client.on('client-msg', (data)=> {
        chatMsgs.push(data);
        client.emit('srv-msg', data);
        client.broadcast.emit('srv-msg', data);
    });
    clientCounter++;

    client.on('disconnect', () => {
        clientCounter -= 1;
        client.broadcast.emit('user-disconnected', clientCounter)
    })
});
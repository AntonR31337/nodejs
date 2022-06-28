"use strict"

const worker_threads = require('worker_threads');

const fs = require("fs");
const path = require('path');

const fullPath = worker_threads.workerData;

const data = fs.readFileSync(fullPath, 'utf-8');
const regExp = new RegExp('', 'igm');

worker_threads.parentPort.postMessage(`Найдено ${data.match(regExp).length} шт.`);
"use strict"

const worker_threads = require('worker_threads');
const fs = require("fs");

const reader = (fullPath, searchText) => {
    console.log("Recived data: "+ fullPath);
    return new Promise((resolve, reject)=> {
        const worker = new worker_threads.Worker('./readerWorker.js', {
            workerData: fullPath,
        });
        worker.on('message', resolve);
        worker.on('messageerror', reject);
    });
};

module.exports = (async (fullPath, searchText)=> {
    const someData = await reader(fullPath, searchText);
    console.log(someData);
});
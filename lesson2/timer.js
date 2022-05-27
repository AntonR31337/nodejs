'use strict';

// node timer.js YYYY-MM-DD

const colors = require("colors");
const events = require("events");
const moment = require("moment");
const momentPreciseRangePlugin = require("moment-precise-range-plugin");

const EventEmitter = events;
const emitter = new EventEmitter();

const futureDate = moment(process.argv[2].toString());

console.log(new Date(futureDate))

emitter.on('timerEnd', () => {
    console.log(colors.red("Твоё время пришло!"));
    clearInterval(dateTimer);
});
emitter.on('showTimer', (diff) => {
    console.log(`До часа ${colors.blue("Х")} осталось ${colors.green(diff)}`);
});

const dateTimer = setInterval(()=>{
    const now = Date.now();
    if (now >= futureDate) {
        emitter.emit('timerEnd')
    } else {
        const diff = moment.preciseDiff(futureDate, now);
        console.clear();
        emitter.emit('showTimer', diff);
    }
}, 1000)
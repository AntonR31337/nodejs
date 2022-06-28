"use strict"
const fs = require("fs");
const readline = require("readline");
const inquirer = require('inquirer');
const path = require('path');
const yargs = require('yargs');

const LOGS = "./logs.log";
let executionDir = process.cwd();

const options = yargs
    .positional('d', {
        describe: "Path to directory",
        default: executionDir,
    })
    .positional("p", {
        describe: "Pattern",
        default: "",
    }).argv;
    console.log(options);
    console.log(options._);

// const requests = [
//     "127.0.0.1 - - [31/Jan/2021:11:11:20 -0300] POST /foo HTTP/1.1 200 0 - curl/7.47.0",
//     "127.0.0.1 - - [32/Jan/2021:11:11:20 -0300] POST /foo HTTP/1.1 200 0 - curl/7.47.0",
// ];

// console.clear();

// fs.writeFile(LOGS, requests[1] + "\n", {
//     encoding: "utf-8",
//     flag: 'a',
//         }, (err)=> {
//         if (err) console.log(err);
//     })

// const writeStream = fs.createWriteStream(LOGS, {
//     encoding: "utf-8",
//     flags: "a",
// });

// requests.forEach((logsString)=> {
//     writeStream.write(logsString + "\n");
// })

// const paydAccount = false;
// const readStream = fs.createReadStream(LOGS);

// const tStream = new Transform({
//     transform(chunk, encoding, callback){
//         if (!paydAccount) {
//             const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, ['HIDDEN IP']);
//             this.push(transformed);
//         } else this.push(chunk);
//         callback();
//     }
// });

// readStream.pipe(tStream).pipe(process.stdout);

// const isFile = (fileName)=> fs.lstatSync(fileName).isFile();
// const list = fs.readdirSync('./');

const reader = ()=> {
    const isFile = (dir, fileName) => fs.lstatSync(path.resolve(dir, fileName)).isFile();
    let list = fs.readdirSync(executionDir);
    inquirer.prompt([
    {
        name: 'fileName',
        type: 'list',
        message: "Выберите файл",
        choices: list,
    }
    ]).then( ({fileName}) => {
    if (isFile(executionDir, fileName)){
        inquirer.prompt([
            {
                name: 'saveResult',
                type: 'list',
                message: 'Сохранить результат поиска в файл?',
                choices: ['Yes', "No"],
            }
        ]).then(({saveResult})=>{
            const fullPath = path.join(executionDir, fileName);
            const data = fs.readFileSync(fullPath, 'utf-8');
            
            if (saveResult == 'Yes'){
                processLineByLine();
            } else {
                const regExp = new RegExp(options.p, 'igm');
                console.log(data.match(regExp));
            }
        })
        
    } else {
        // executionDir += `/${fileName}`;
        executionDir = path.join(executionDir, fileName);
        return reader();
    }
})};

async function processLineByLine(){
    const fileStream = fs.createReadStream(LOGS);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        // const searchIP = [
        //     "127.0.0.1",
        //     "127.0.0.2",
        // ];
        const searchIP = options._;
        searchIP.forEach((el)=> {
            if (line.includes(el)){
                fs.appendFile(`./${"logs_" + el}`, line + "\n", (err)=> {
                    if (err) console.log(err);
                })
            }
        })
    }
}
reader();
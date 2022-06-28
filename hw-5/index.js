"use strict"

const fs = require("fs");
const path = require('path');
const http = require('http');

(async ()=> {
    const isFile = (path) => fs.lstatSync(path).isFile();

    http.createServer((req, res)=> {

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
})();

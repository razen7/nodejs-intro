let http = require('http');
const fs = require('fs');

let counter = 0;
const server = http.createServer((req, res) => {
    console.log('Request Incoming');

    let path = './views/';
    let urls = ['/', '/product', '/contact'];
    if (urls.includes(req.url)) {
        res.setHeader('Content-Type', 'text/html');
        path += 'index.html';
        counter++;
    } else if (req.url === '/style.css') {
        res.setHeader('Content-Type', 'text/css');
        path += 'style.css';
    } else {
        res.end();
    }

    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
        if (err) {
            res.write('Server Error', err.message);
        } else {
            data = data.replace('{{{counter}}}', counter);
            let page = req.url.split('/').pop();
            data = data.replace('{{{header}}}', page ? page : 'home');
            res.write(data);
        }
        res.end();
    })
});

server.on('error', (err) => {
    console.log('Error Occured: ' + err.message);
})
server.on('close', () => {
    console.log('SERVER shutting down');
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log('Server is running at http://localhost:' + PORT);
})
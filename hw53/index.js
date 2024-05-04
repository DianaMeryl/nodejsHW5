const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3000;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`App up and running on port ${PORT}`);
});

app.use((req, res, next) => {

    const timestamp = new Date().toISOString();
    const clientIP = req.ip || '127.0.0.1'; 

    const method = req.method;
    const url = req.originalUrl;
    const queryParams = req.query;

    const logEntry = `${timestamp} - ${clientIP} - ${method} ${url} - Query: ${JSON.stringify(queryParams)}\n`;

    fs.appendFile('./hw53/logtext.txt', logEntry, (err) => {
        if (err) {
            console.error(err);
        }
    });

    const originalSend = res.send;
    
    res.send = function (body) {

        originalSend.call(this, body);

        const responseLogEntry = `${timestamp} - ${clientIP} - ${method} ${url} - Status: ${res.statusCode}\n`;

        fs.appendFile('./hw53/responsetext.txt', responseLogEntry, (err) => {
            if (err) {
                console.error('Error writing to response log:', err);
            }
        });
    };
    next();
})


app.get('/', (req, res) => {
    res.send('Hello World!');
});
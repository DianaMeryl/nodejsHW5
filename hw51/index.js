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

    fs.appendFile('./hw51/text.txt', logEntry, (err) => {
        if (err) {
            console.error(err);
        }
    });
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});
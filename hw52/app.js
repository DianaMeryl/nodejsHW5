const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 3000;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`App up and running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post("/create-contact", (req, res) => {

    const {name, email, message} = req.body;
    const data = `${name} - ${email} - ${message}\n`;

    fs.appendFile('./hw52/contactdata.txt', data, (err) => {
        if (err) {
            console.error(err);
        }
    });
})

const express = require('express');

const app = express();

const PORT = 3000;


app.get('/', (req, res) => {
    
    res.send('CyberBionic');
});

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`App up and running on port ${PORT}`);
});
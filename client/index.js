const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(process.env.PORT, ()=>{
    console.log(`server running on ${process.env.PORT}`)
});
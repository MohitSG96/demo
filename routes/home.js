const express = require('express');
const home = express.Router();
home.get("/", (req, res) => {
    res.render('index', {
        title: 'My Express Demo',
        message: 'Hello World!!!'
    });
});

module.exports = home;
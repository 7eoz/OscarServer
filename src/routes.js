const express = require('express');
const routes = express.Router();
const DB = require('./movies');

routes.get('/movies', function (req, res) {
	res.status(200).json(DB.characters);
});

module.exports = routes;

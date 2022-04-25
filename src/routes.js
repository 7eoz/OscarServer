const express = require('express');
const routes = express.Router();
const DB = require('./movies');

routes.get('/movies', (req, res) => {
	res.status(200).json(DB.characters);
});

routes.get('/movies/:id', (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const movie = DB.movies.find((movie) => movie.id === id);
		if (movie !== undefined) {
			res.status(200).json(movie);
		} else {
			res.status(404).json({ msg: 'Movie not found' });
		}
	}
});

module.exports = routes;

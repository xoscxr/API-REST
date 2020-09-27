const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const movies = require('../sample.json');

router.get('/', (req, res) => {
    res.json(movies);
});  

router.post('/', (req, res) => {
    const id = movies.length + 1;
    const { title, director, year, rating } = req.body;w      
    const newMovie = { ...req.body, id };
    if (id && title && director && year && rating) {
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});
//al igual aqui si quiere modificar uno tiene que agregarle el id al link, y luego poner todos los parametros que quiera
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (id && title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id === id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});
//si quiere borrar algo solo tiene que ponerle el id correspondiente solo agregandole /"id" en el link 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movies.splice(i, 1);
            }
        });
        res.json(movies);
    }
});

module.exports = router;
const express = require('express');
const movieRouter = express.Router();
const Movie = require('../models/movieModel');
const Celeb = require('../models/celebModel');

movieRouter.get('/movies', (req, res, next) => {
  Movie.find()
  .populate('cast')
  .then( responseFromDB => {
     console.log('Movies: ', responseFromDB);
     //              variable to be used in view:     placeholder
     //                                     |           |
     res.render('movies/movie-index', {movies: responseFromDB});
  })
  .catch(err => console.log('Error getting movies from DB', err));
});

movieRouter.get('/movies/create', (req, res, next) => {
        console.log('routing to new movie');
        // res.send("connecting to new movie")
        res.render('movies/newMovie');
   
});

// <form action="/movies/addMovie" method="post"> 
movieRouter.post('/movies/addMovie', (req, res, next)=> {
    const newMovie = {
        title: req.body.newTitle,
        genre: req.body.newGenre,
        plot: req.body.newPlot,
        cast: req.body.newCast

    }

    Movie.create(newMovie)
    .then(()=> {
        res.redirect('/movies')
    })
    .catch(err => console.log('error saving the new movie', err));
});

//update the movie - get route to display the form

movieRouter.get('/movies/edit/:movieId', (req, res, next)=> {
    const id = req.params.movieId;
    // console.log("id is ", id);
    Movie.findById(id)
    .then(oneMovie => {
        Celeb.find()
        .then(castResult => {
            // console.log("is this one movie: >>>>>>>>>>>", oneMovie.cast);
            // console.log("is this cast ============: ", castResult);
            data = {
                movie: oneMovie,
                cast: castResult
            }
            res.render('movies/edit-movie', data)
        })
    })
    .catch(err => console.log("error while editing movie info", err))
})

movieRouter.post('/movies/update/:id', (req, res, next) => {
    const movieId = req.params.id;
    const updMovie = {
        title: req.body.updTitle,
        genre: req.body.updGenre,
        plot: req.body.updPlot,
        cast: req.body.updCast
    }
    // console.log('edited: ', updMovie);
    Movie.findByIdAndUpdate(movieId, updMovie)
    .then(() => {
        res.redirect(`/movies/${movieId}`);
    })
    .catch(err => console.log ('error while saving the update', err))
})

movieRouter.post('/movies/:movieId/delete', (req, res, next) => {
    const id = req.params.movieId;
    Movie.findByIdAndRemove(id)
    .then( () =>{
        res.redirect('/movies');
    })
    .catch( err => console.log("Error while deleting the movie", err));
})

movieRouter.get('/movies/:theId', (req, res, next) => {
    const movieId = req.params.theId;
    Movie.findById(movieId)
    .populate('cast')
    .then( oneMovieFromDB => {
        // console.log('movie from DB', oneMovieFromDB);
        res.render('movies/oneMovieDetails', {movie: oneMovieFromDB })
    })
    .catch( err => console.log("error while getting a movie from DB", err));
});

module.exports = movieRouter;
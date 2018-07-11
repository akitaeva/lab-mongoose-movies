const express = require('express');
const reviewRouter = express.Router();
const Movie = require('../models/movieModel');

reviewRouter.get('/movies/:id/reviews/new', (req, res, next) =>{
    Movie.findById(req.params.id)
    .then((theMovieImEditing)=>{
        
        res.render('addReview', {movie: theMovieImEditing});
    })
    .catch((err)=> {
        next(err);
    })
});




module.exports = reviewRouter;
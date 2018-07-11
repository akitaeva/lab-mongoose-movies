const express = require('express');
const celebRouter  = express.Router();
const Celeb    = require('../models/celebModel');

celebRouter.get('/celebrities', (req, res, next) => {
    Celeb.find()
    .then((listOfCelebs)=>{
        res.render('celebrities/celeb-index', {celebrities: listOfCelebs});
    })
    .catch((err)=>{
        next(err); 
     })
});

celebRouter.get('/celebrities/create', (req, res, next) => {
  console.log('routing to a new celeb page');
  res.render('celebrities/newCeleb');
});

celebRouter.post('/celebrities/addCeleb', (req, res, next) => {
    const newCeleb = {
       name: req.body.newName,
       occupation: req.body.newOccupation,
       catchPhrase: req.body.newCatchPhrase
    }

    Celeb.create(newCeleb)
    .then(()=> {
        res.redirect('/celebrities')
    })
    .catch(err => console.log ('error saving a new celeb entry', err));
});

celebRouter.get('/celebrities/edit/:celebId', (req, res, next) => {
    const id = req.params.celebId;
    Celeb.findById(id)
    .then(oneCeleb => {
        res.render('celebrities/edit-celeb', {celeb: oneCeleb})
    })
    .catch(err => console.log('error while editing celeb info', err))
})

celebRouter.post('/movies/edit/:id', (req, res, next) => {
    const celebId = req.params.id;
    const updCeleb = {
        name: req.body.updName,
        occupation: req.body.updOccupation,
        catchPhrase: req.body.updCatchPhrase
    }
    Celeb.findByIdAndUpdate(celebId, updCeleb)
    .then( () => {
        res.redirect(`/celebs/${celebId}`);
    })
    .catch(err => console.log ('error while saving the update', err));
})

celebRouter.post('/celebrities/:celebId/delete', (req, res, next) => {
    const id = req.params.celebId;
    console.log(id);
    Celeb.findByIdAndRemove(id)
    .then( () =>{
        res.redirect('/celebrities');
    })
    .catch( err => console.log("Error while deleting the celeb info", err));
})


 

celebRouter.get('/celebrities/:theId', (req, res, next) => {
    const celebId = req.params.theId;
    Celeb.findById(celebId)
    .then( oneCelebFromDB => {
        console.log('celebrity from DB', oneCelebFromDB);
        res.render('celebrities/oneCelebDetails', {celeb: oneCelebFromDB })
    })
    .catch( err => console.log("error while getting a celebrity from DB", err));
});

module.exports = celebRouter;
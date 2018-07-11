const mongoose = require('mongoose');
const Celeb = require('../models/celebModel');
const Movie = require('../models/movieModel') //importing models for blueprints

const dbName = 'movie-and-celeb' //connecting to DB (make sure the name corresponds w/one in app.js)
mongoose.connect(`mongodb://localhost/${dbName}`);

const av_act = {_id: new mongoose.Types.ObjectId(), name: "Alicia Vikander", occupation: "Actress", catchPhrase: "I love when I am outside my comfort zone."};
const mf_act = {_id: new mongoose.Types.ObjectId(), name: "Michael Fassbender", occupation: "Actor", catchPhrase: "I don't think peroxide-blond hair is a beneficial look for me."};
const nm_act = {_id: new mongoose.Types.ObjectId(), name: "Nick Murphy", occupation: "Singer", catchPhrase: "You can turn something into art just because of the way you tell people to look at it."};

const celebs = [av_act, mf_act, nm_act];


const moviesArr = [
    { title: "Blade Runner",
    genre: "Fantasy/Sciencer",
    plot: "...",
    cast: [av_act._id, mf_act._id]
    },
    { title: "Pulp Fiction",
    genre: "Drama/Crime",
    plot: "...",
    cast: [nm_act._id, mf_act._id]
    },
    { title: "Citizen Kane",
    genre: "Drama/Mystery",
    plot: "...",
    cast: [av_act._id]
    }
]


Celeb.create(celebs)
.then((result)=>{
    console.log(`created ${result.length} celebs`);
    Movie.create(moviesArr)
    .then((result)=>{
        console.log(`created ${result.length} movies`);
        result.forEach(oneMovie => {
            console.log('In DB ', oneMovie.title)
        })
        mongoose.disconnect();
            
        })
    .catch((err)=>{
            console.log('error creating movies collection', err)
        })
})
.catch((err)=>{
    console.log('error creating celebs collection', err)
})
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;



const movieSchema = new Schema({
  title: {type: String, required: true},
  genre: {type: String, default: "unknown"},
  plot: String,
  cast: [{type: Schema.Types.ObjectId, ref: 'Celeb'}],
  reviews: [{reviewer: String, content: String}]
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

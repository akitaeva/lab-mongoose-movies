const mongoose = require("mongoose");
const Schema   = mongoose.Schema;



const celebSchema = new Schema({
  name: {type: String, required: true},
  occupation: {type: String, default: "unknown"},
  catchPhrase: String
});

const Celeb = mongoose.model("Celeb", celebSchema);



module.exports = Celeb;
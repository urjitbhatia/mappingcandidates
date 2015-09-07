// candidate model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    // // require Ingredient model
    Event = require('./event');

var CandidateSchema = new Schema({
  name: String,
  party: String,
  events: [Event.schema] // I think there was a typo here. It should be Event.schema not Event.Schema
});

var Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;

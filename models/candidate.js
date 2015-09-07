// candidate model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // // require event model
    Event = require('./event');

var CandidateSchema = new Schema({
  name: String,
  party: String,
  events: [Event.schema]
});

var Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;






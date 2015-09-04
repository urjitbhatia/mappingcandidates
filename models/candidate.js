// candidate model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // require Todo model
    Event = require('./event');

var CandidateSchema = new Schema({
  name: String,
  party: String,
  // reference events in list
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

var Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
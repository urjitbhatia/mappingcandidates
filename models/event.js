// event model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  time: Number, 
  location: String, 
  state: String,
  completed: Boolean
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;


// event model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  time: String, 
  location: String, 
  url: String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;





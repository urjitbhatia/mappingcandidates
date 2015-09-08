// event model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: String,
  date: String,
  time: String, 
  location: String,
  lat: Number,
  lng: Number,
  url: String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;

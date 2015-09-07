// Script to load candidate data into mongo.
var Candidate = require("../models/candidate"),
    Event = require("../models/event"),
    request = require("request"),
    async = require("async");

var GEOCODER_API_URL = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

var createCandidate = module.exports = function (name, party, eventsJsonArray) {

  console.log("Saving candidate:", name);
  var candidate = new Candidate();
  candidate.name = name;
  candidate.party = party;
  var candidateEvents = [];
  var fetchLatLongCalls = [];

  eventsJsonArray.forEach(function(rawEvent) {
    var candidateEvent = new Event(rawEvent);
    candidateEvents.push(candidateEvent);
    // fetchLatLongCalls.push(createFetchLatLong(candidateEvent));
    fetchLatLongCalls.push(function(cb) {
      request(GEOCODER_API_URL + candidateEvent.location, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var jsonBody = JSON.parse(body); // Show the HTML for the Google homepage. 
          if (jsonBody.results.length > 0) {
            candidateEvent.lat = Number(jsonBody.results[0].geometry.location.lat);
            candidateEvent.lng = Number(jsonBody.results[0].geometry.location.lng);
          }
        }
        cb(error, candidateEvent);
      });
    });
  });

  async.parallel(fetchLatLongCalls, function(err, results) {
    if (err) {
      console.log("Error in fetchLatLong");
    } else {
      console.log("Done!");
      candidate.events.push.apply(candidate.events, candidateEvents);
      console.log("Added events:", candidate.events.length);
      candidate.isNew = true;
      console.log("Saving...");
      candidate.save(function (err) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success");
        }
      });
    }
  });
};

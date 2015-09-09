// script to load candidate data into mongo.
var Candidate = require("../models/candidate"),
    Event = require("../models/event"),
    request = require("request"),
    // need this to make sure all the lat & log are loaded before 
    async = require("async");

// creating a var for the api url that can be accessed
var GEOCODER_API_URL = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=";

var fetchLatLong = function(candidateEvent, cb) {
  request(GEOCODER_API_URL + candidateEvent.location, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsonBody = JSON.parse(body); // show the html for the google homepage. 
      if (jsonBody.results.length > 0) {
        // console.log("Fetched lat long... ok");
        candidateEvent.lat = Number(jsonBody.results[0].geometry.location.lat);
        candidateEvent.lng = Number(jsonBody.results[0].geometry.location.lng);
      } else {
        console.log("GEOCODER_API jsonBody is empty. CandidateEvent:", candidateEvent);
        if (jsonBody.error_message) {
          console.log("Error:", jsonBody.error_message);
        }
      }
    } else {
      console.log("GEOCODER_API response:", response.statusCode, "CandidateEvent", candidateEvent,
        "error", error);
    }
    // we are setting the lat/long on the candidate... nothing to return
    cb(error, null);
  });
};

// creating a candidate
var createCandidate = module.exports = function (name, party, eventsJsonArray) {

  console.log("saving candidate:", name);
  var candidate = new Candidate();
  candidate.name = name;
  candidate.party = party;
  // store all of the candidate events into this array
  var candidateEvents = [];
  // store all of the lat & long calls in this array
  var fetchLatLongCalls = [];

  eventsJsonArray.forEach(function(rawEvent) {
    // going through all the events & storing them in the var candidateEvent
    var candidateEvent = new Event(rawEvent);
    candidateEvents.push(candidateEvent);
  });

  async.map(candidateEvents, fetchLatLong, function(err, results) {
    if (err) {
      console.log("error in fetchLatLong");
    } else {
      console.log("done fetching lat/long!");
      candidate.events.push.apply(candidate.events, candidateEvents);
      console.log("added events:", candidate.events.length);
      candidate.isNew = true;
      console.log("saving...");
      candidate.save(function (err) {
        if (err) {
          console.log("error", err);
        } else {
          console.log("success");
        }
      });
    }

    process.exit();
  });
};

// Script to load candidate data into mongo.
var Candidate = require("../models/candidate"),
    Event = require("../models/event");

var createCandidate = module.exports = function (name, party, eventsJsonArray) {

  console.log("Saving candidate:", name);
  var candidate = new Candidate();
  candidate.name = name;
  candidate.party = party;

  var i = 1;
  eventsJsonArray.forEach(function(rawEvent) {
  	// console.log("Adding event:", i);
  	var candidateEvent = new Event(rawEvent);
  	candidate.events.push(candidateEvent);
  	 i++;
  });
  console.log("Added events:", i - 1);
  candidate.isNew = true;
  console.log("Saving...");
  candidate.save(function (err) {
  	if (err) {
  		console.log("Error", err);
  	} else {
  		console.log("Success");
  	}
  });
};

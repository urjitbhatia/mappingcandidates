// server.js

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),  // for data from the request body
    mongoose = require('mongoose');       // to interact with our db
    Candidate = require('./models/candidate');
    Event = require('./models/event');
    
// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mappingcandidates'
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ------------------------------- //

// CANDIDATE //

// get all candidate information
app.get('/candidate', function (req, res) {
  Candidate.find({}, function (err, candidates) {
    res.json(candidates);
  });
});

/* This way of doing things creates embedded documents. This means that
* the candidateEvent and otherCandidateEvent below will not be created in
* their
*/ 
app.get('/candidateCreate', function (req, res) {

  var candidateEvent = new Event();
  candidateEvent.title = "hello world";
  candidateEvent.time = "1:00 pm - 2:00 pm CDT";
  candidateEvent.url = "www.foobar.com";
  candidateEvent.location = "Iowa";
  
  var otherCandidateEvent = new Event();
  otherCandidateEvent.title = "hello universe";
  otherCandidateEvent.time = "1:00 pm - 9:00 pm EST";
  otherCandidateEvent.url = "www.foobarOther.com";
  otherCandidateEvent.location = "Patiala";

  var candidate = new Candidate();
  candidate.name = "Taranmol";
  candidate.party = "JakaraParty";
  candidate.events.push(candidateEvent);
  candidate.events.push(otherCandidateEvent);

  candidate.save(function (err) {
    if (!err) console.log('Success!');
  });
});

// create new candidate
app.post('/candidate', function (req, res) {
  // create new candiate with data from the body of the request (`req.body`)
  // body should contain the candidate text itself
  var newCandidate = new Candidate(req.body);

  // save new candidate
  newCandidate.save(function (err, savedCandidate) {
    res.json(savedCandidate);
  });
});




// ------------------------------- //


// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});
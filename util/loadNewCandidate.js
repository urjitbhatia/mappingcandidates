// require express and other modules
var mongoose = require("mongoose");      // to interact with our db
var createCandidate = require("./createCandidate");

var LOCAL_DB = "mongodb://localhost/mappingcandidates";

if (process.argv.length < 5) {
 console.log("Missing arguments...");
 process.exit(1);
}

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  LOCAL_DB
);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", function () {  
  console.log("Mongoose default connection open to ", LOCAL_DB);
  var name = process.argv[2];
  var party = process.argv[3];
  var eventsData = require(process.argv[4]);
  createCandidate(name, party, eventsData);
}); 

// If the connection throws an error
mongoose.connection.on("error",function (err) {  
  console.log("Mongoose default connection error: ", err);
}); 

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {  
  console.log("Mongoose default connection disconnected"); 
});

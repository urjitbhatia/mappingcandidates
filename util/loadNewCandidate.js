// require express and other modules
var mongoose = require("mongoose");      
// to interact with our db
var createCandidate = require("./createCandidate");
//local_db is creating a var to call this db
var LOCAL_DB = "mongodb://localhost/mappingcandidates";

// making sure that there is the right number of attributes
if (process.argv.length < 5) {
 console.log("missing arguments...");
 process.exit(1);
}

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  LOCAL_DB
);

// CONNECTION EVENTS
// when successfully connected
mongoose.connection.on("connected", function () {  
  console.log("mongoose default connection open to ", LOCAL_DB);
  var name = process.argv[2];
  var party = process.argv[3];
  var eventsData = require(process.argv[4]);
  createCandidate(name, party, eventsData);
}); 

// if the connection throws an error
mongoose.connection.on("error",function (err) {  
  console.log("mongoose default connection error: ", err);
}); 

// when the connection is disconnected
mongoose.connection.on("disconnected", function () {  
  console.log("mongoose default connection disconnected"); 
});

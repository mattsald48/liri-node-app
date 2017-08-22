
var access = require('./keys');
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');

var consumerKey = access.twitterKeys.consumer_key;
var consumerSecret = access.twitterKeys.consumer_secret;
var accTokenKey = access.twitterKeys.access_token_key;
var accTokenSecret = access.twitterKeys.access_token_secret;
var spotifyID = access.spotifyKeys.spotifyID;
var spotifySecret = access.spotifyKeys.spotifySecret;
var choice = "";
var search = "";

var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accTokenKey,
  access_token_secret: accTokenSecret
});

var spotify = new Spotify({
  id: spotifyID,
  secret: spotifySecret
});


function promptStuff(){
inquirer.prompt([

     {
     	type: "list",
     	message: "What would you like to do?",
     	choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
     	name: "choice"
     },


     {
     	type: "input",
     	message: "What can I help you find today? (Hit enter again if you picked 'do-what-it-says')",
     	name: "search",
     	when: function(answers){
     	    var ans =answers.choice;
          if(ans == "my-tweets"){
     	     return answers.choice !== 'my-tweets';
          };
           return answers.choice !== 'do-what-it-says';
     	}
     }

	]).then(function (user) {
		//console.log(JSON.stringify(user.choice, null, 2));
		//console.log(JSON.stringify(user.search, null, 2));
		choice = user.choice;
		search = user.search;
    if(choice === 'my-tweets' ){
            tweets();
            
        }
        else if(choice === 'spotify-this-song'){
          spotifyIt(search);
          
        }else if(choice === 'movie-this'){
          omdbApi(search);
          
        }else if(choice === 'do-what-it-says'){
          doIt();
          
        }
		    
    
 });//end of the then function
}//end of the prompt function

//////////////function section//////////////////////////////


function doIt(){
fs.readFile('random.txt', "utf8", function(error, data){

  if(error){
    return console.log(error);
  }
   //console.log(data);
   var dataArr = data.split(",");
   choice = dataArr[0];
   search = dataArr[1];
   //console.log(choice);
   //console.log(search);
   spotifyIt(search);
   //promptStuff();
  });
 }; 

//tweets section 
function tweets(){
//console.log("working");
client.get('statuses/home_timeline', {count: 15}, function(error, tweets, response) {
  if(error) throw error;

  for(i = 0; i<14; i++){
  
  console.log(i);
  console.log(JSON.stringify(tweets[i].user.name, null, 2));
  console.log(JSON.stringify("@"+tweets[i].user.screen_name, null, 2));   
  console.log(JSON.stringify(tweets[i].text, null, 2));
  console.log(""); 

  };

 });
  //promptStuff();
};//end of tweets section

///////////////////spotify section//////////////////////////////////////
function spotifyIt(input){
spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  var artistLength = data.tracks.items[0].artists.length;
  //console.log(artistLength);
  var previewURL = JSON.stringify(data.tracks.items[0].preview_url);
  //console.log(previewURL);

for (i = 0; i < artistLength; i++){
  console.log("Artist: "+ data.tracks.items[0].artists[i].name);//Prints out all artist
   };
  console.log("\n Song Name: "+data.tracks.items[0].name);   //name of song

if(previewURL === "null"){
  console.log("\n There is no preview track");         //logs if there is no preview url
 }else{
    console.log("\n Preview url: "+data.tracks.items[0].preview_url);//preview url is logged
 };
  console.log("\n Album Name: "+data.tracks.items[0].album.name);//name of album
//console.log(data.tracks.items[0]);
 });
 //promptStuff();
};


//start of omdb section
function omdbApi(input){
var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";
//var queryUrl = "http://www.omdbapi.com/?t=star+wars&y=&plot=short&apikey=40e9cece";

  //console.log(queryUrl);
   request(queryUrl, function(error, response, body){
    if(error){
      console.log(error);
     }else{
 
    //console.log(body);
      console.log("\n Title: "+JSON.parse(body).Title);
      console.log("Release Date: "+JSON.parse(body).Released);
      console.log(JSON.parse(body).Ratings[0].Source+": "+JSON.parse(body).Ratings[0].Value);
      console.log("Country of origin: "+JSON.parse(body).Country);
      console.log("Language: "+JSON.parse(body).Language);
      console.log("Plot: "+JSON.parse(body).Plot);
      console.log("Actors: " +JSON.parse(body).Actors);
      console.log(JSON.parse(body).Ratings[1].Source+": "+JSON.parse(body).Ratings[1].Value);
      }
       
      });
      //promptStuff();
     }


promptStuff();
	
var twitterKeys = require("./key.js");

var request = require("request");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '5d61c54662b24c338cd712a761f31bff',
    secret: '7fd09e326b0b4c858ab151e8b30dcd5a'


    
});


var userInput = process.argv[2];
var userInputTwo = process.argv[3];

for(i = 4; i < process.argv.length; i ++){
    userInputTwo += "+" + process.argv[i];
}



spotify.search({
    type: 'track',
    query: userInput,
}, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' , err);
    }
// Show the artist, the song's name, a preview link of the song from spotify, the album that the song is from
    // console.log(data.tracks.items);
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(userInput);
    
});





// switch (userInput) {
//     case "spotify-this-song":
//       spotifySong();
//       break;
  
//     case "my-tweets":
//       myTweets();
//       break;
  
//     case "movie-this":
//       movieThis();
//       break;
  
//     case "do-what-it-says":
//       doWhat();
//       break;
//   }
  

// function spotifySong(){
//     fs.readFile("random.txt", "utf8", function(err, data) {
//         if(err) {
//             return console.log(err);
//             // console.log("spotify-song");
//         }
//     });
    
// }




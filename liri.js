// Run npm init 
// run nmp install to install all packages needed for project
// Set up a twitter account and make some tweets! 
// Get keys and secret keys from twitter and spotify


var keys = require("./key.js");

var Twitter = require("twitter");

var request = require("request");

var fs = require("fs");

var Spotify = require('node-spotify-api');

// Make variable for params and to store screen name

var params = {
    screen_name: 'eamatt44',

// Set count to 20 to display last 20 tweets    

    count: 20
}

var spotify = new Spotify({
    id: '5d61c54662b24c338cd712a761f31bff',
    secret: '7fd09e326b0b4c858ab151e8b30dcd5a'



});

// Take in the command line arguments

var userInput = process.argv[2];
var userInputTwo = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
    userInputTwo += "+" + process.argv[i];
}

// Create function for movie-this 

function movieThis() {

    // if the user does not provide a movie name, make the selection mr. nobody

    if (!userInputTwo) {
        userInputTwo = 'mr.nobody';

    }

    // The query url should add the info from userInputTwo for the user's input to go after "move-this"  

    var queryUrl = "http://www.omdbapi.com/?t=" + userInputTwo + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";



    request(queryUrl, function (error, response, body) {

        // If the request is successful

        if (!error && response.statusCode === 200) {

            // Get movie title
            // release year
            // imdb rating
            // rotten tomatoes rating
            // country where the movie was released
            // language of the movie
            // plot of the movie
            // cast of actors
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country of Release: " + JSON.parse(body).Country);
            console.log("Language of the Movie: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Movie Cast: " + JSON.parse(body).Actors);
        }
    });


}

// Create Twitter function to display my last 20 tweets

function myTweets() {

    var client = new Twitter(keys);

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (error) {
            console.log('error:', error);
        }

    // Show my last 20 tweets and when they were created
       
       for (var i = 0; i < tweets.length; i++) {
          
            console.log([i + 1] + '. ' + tweets[i].text);
            console.log('Created on: ' + tweets[i].created_at + "\n");

        }
    });
}

// Create a function to search spotify for a song 

function searchSpotify() {

   // If the user does not type in a song make the default song "The Sign", by Ace of Base 

    if (!userInputTwo) {
        userInputTwo = 'The Sign, Ace of Base';
    }

    spotify.search({
        type: 'track',
        query: userInputTwo,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ', err);
        }
       
        // Show the artist, the song's name, a preview link of the song from spotify, the album that the song is from
        
        console.log("Artist:  " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);


    });

}

// Create a function for do what I say 

function doWhatItSays() {

// Read from the random.txt file to get the info

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

    // Create an array for the data and get the first item 
       
        var dataArr = data.split(',');

        userInput = dataArr[0];

     // Get the second item in the array   

        userInputTwo = dataArr[1];

    // Call the search spotify function

        searchSpotify();
    });

}


// Which function to run when the user types in a command

switch (userInput) {
    case "spotify-this-song":
        searchSpotify();
        break;

    case "my-tweets":
        myTweets();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}


//
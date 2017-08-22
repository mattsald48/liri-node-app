console.log('this is loaded');

var dotenv = require('dotenv');
dotenv.load();

//console.log(process.env.TWITTER_CONSUMER_KEY);
// console.log(process.env.TWITTER_CONSUMER_SECRET);
// console.log(process.env.TWITTER_ACCESS_TOKEN_KEY);
// console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);

exports.twitterKeys = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

exports.spotifyKeys = {
	spotifyID: process.env.SPOTIFY_ID,
	spotifySecret: process.env.SPOTIFY_SECRET
}


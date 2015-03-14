var icecast = require('icecast')
var Twitter = require('twitter')
//var fs = require('fs').createWriteStream('session.mp3') 
var fs = require('fs').createWriteStream('/dev/null')

var client = new Twitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'ACCES_TOKEN_KEY',
  access_token_secret: 'ACCESS_TOKEN_SECRET'
});

var streamUrl = 'http://your.stream/url.mp3'
var currentSong

function init(){
  icecast.get(streamUrl, function (res) {
    res.on('metadata', function (metadata) {
      var parsed = icecast.parse(metadata)
      if(currentSong!=parsed.StreamTitle){
        currentSong=parsed.StreamTitle
        client.post('statuses/update', {status: parsed.StreamTitle},  function(error, tweet, response){
          if(error) console.log(error)
        })
      }
    })
    res.pipe(fs)
  })
}

init()


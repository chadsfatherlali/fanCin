/**
 * Created by chadsfather on 13/12/15.
 */

var tmdb = require('./../tmdbwrapper').tmdbwrapper(),
     _ = require('underscore'),
     twitter = require('twitter'),
     string = require('string'),
     index = 0,
     fs = require('fs'),
     request = require('request'),
     imagePath = 'images/image_',
     ext = '.jpg',
     list = [],
     TinyURL = require('tinyurl');

var client = new twitter({
          consumer_key: 'UacUG3wWt4v7xFNtfMKR115Le',
          consumer_secret: 'JQ7y8bxjRdvhodiNxViIL1YgZMj1jEORsQ7APhtYiLqUhojSlP',
          access_token_key: '2320470469-0kTEEfX94A0V9r5rymxW4aljgyfprXfjLYwOkMf',
          access_token_secret: 'OOaRmHonSk6dhTCD5dOkCgKp4IH8EeDwsUUmLZdGBaJlZ'
     });


tmdb.miscNowPlayingMovies({
          'language': 'es'
     },
     function (err, response) {
          if (err) throw err;

          _.map(response.results, function (value, key) {
               if (value.overview) {
                    value.poster_path = 'http://image.tmdb.org/t/p/w300' + value.poster_path;

                    list.push(_.pick(
                         value,
                         'id',
                         'original_title',
                         'popularity',
                         'vote_count',
                         'poster_path',
                         'release_date',
                         'overview'
                    ));
               }
          });

          loop(index);
     });

function status (status) {
     var title = '#' + string(status.original_title).strip(' ').s + ' | ',
          overview = status.overview;

     return string(title + overview).truncate(80).s;
}

function url (status) {
     return 'https://www.themoviedb.org/movie/' + status.id + '-' + string(status.original_title).slugify().s
}

function loop(index) {
     var item = list[index];

     if (index <= (list.length - 1)) {
          var imgPath = imagePath + item.id + ext;

          download(
               item.poster_path,
               imgPath,
               function () {
                    list[index].poster_path = imgPath;

                    twitteo(list[index]);
               });
     }
};

function twitteo (item) {
     var img = fs.readFileSync(item.poster_path);

     TinyURL.shorten(
          url(item),
          function (res) {
               console.log(status(item) + res);
               client.post('media/upload', {
                         media: img
                    },
                    function (error, media, response) {
                         if (!error) {
                              client.post('statuses/update', {
                                        'status': status(item) + res,
                                        'media_ids': media.media_id_string
                                   },
                                   function (err, tweet, response) {
                                        if (err) throw err;

                                        index++;
                                        loop(index);
                                   });
                         }
                         else {
                              index++;

                              console.log(error);
                              loop(index);
                         }
                    });
          });
};

function download (uri, filename, callback){
     request.head(uri, function(err, res, body){
          console.log('content-type:', res.headers['content-type']);
          console.log('content-length:', res.headers['content-length']);

          request(uri)
               .pipe(fs.createWriteStream(filename))
               .on('close', callback);
     });
};


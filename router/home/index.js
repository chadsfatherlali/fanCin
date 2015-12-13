/**
 * Created by chadsfather on 12/12/15.
 */

/**
 * Informacion del API
 *
 * http://image.tmdb.org/t/p/original/A77Kvnrz1qzV8OSoHINKjigEEvb.jpg
 *
 * base_url: 'http://image.tmdb.org/t/p/',
 * 22:09:02 app-0      secure_base_url: 'https://image.tmdb.org/t/p/',
 * 22:09:02 app-0      backdrop_sizes: [ 'w300', 'w780', 'w1280', 'original' ],
 * 22:09:02 app-0      logo_sizes: [ 'w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original' ],
 * 22:09:02 app-0      poster_sizes: [ 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original' ],
 * 22:09:02 app-0      profile_sizes: [ 'w45', 'w185', 'h632', 'original' ],
 * 22:09:02 app-0      still_sizes: [ 'w92', 'w185', 'w300', 'original' ] },
 */
var tmdb = require('./../../tmdbwrapper').tmdbwrapper(),
     _ = require('underscore');

exports.init = function (app) {
     app.get('/', function (req, res) {
          tmdb.miscNowPlayingMovies({
                    'language': 'es'
               },
               function (err, response) {
                    if (err) throw err;

                    var list = [];

                    _.map(response.results, function (value, key) {
                         if (value.overview) {
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

                    res.render('home', {
                         'movies': list
                    });
               });
     });
};

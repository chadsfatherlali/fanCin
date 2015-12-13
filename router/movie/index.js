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
 *
 * https://www.themoviedb.org/movie/131634-the-hunger-games-mockingjay-part-2
 */
var tmdb = require('./../../tmdbwrapper').tmdbwrapper(),
     _ = require('underscore');

exports.init = function (app) {
     app.get('/pelicula/:title\-\-:id', function (req, res) {
          tmdb.movieInfo({
                    'id': req.params.id,
                    'language': 'es'
               },
               function (err, response) {
                    if (err) console.log(err);

                    res.render('movie', {
                         'movie': response
                    });
               });
     });
};

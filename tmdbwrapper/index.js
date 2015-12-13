/**
 * Created by chadsfather on 12/12/15.
 */
var tmdb = require('moviedb')('a4a971430ce4d2a6fbfb391baba072fe');

exports.tmdbwrapper = function () {
     return tmdb;
};
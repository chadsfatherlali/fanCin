/**
 * Created by chadsfather on 12/12/15.
 */

var string = require('string');

exports.init = function (swig) {
     /**
      * Retorna la url de la imagen en el tamano especificado
      */
     swig.setFilter('getImageUrl', function (url, size) {
          return 'http://image.tmdb.org/t/p/' + size + url;
     });

     /**
      * Retorna una version en formato url de un string
      */
     swig.setFilter('slugify', function (title) {
          return string(title).slugify().s;
     });
};
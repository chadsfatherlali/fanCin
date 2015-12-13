/**
 * Created by chadsfather on 12/12/15.
 */

exports.routes = function (app) {
     /**
      * Route '/'
      */
     require('./home').init(app);

     /**
      * Route '/pelicula/:id'
      */
     require('./movie').init(app);
};

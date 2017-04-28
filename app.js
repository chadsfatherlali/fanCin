/**
 * Esto es unno de prueba
 * Created by chadsfather on 12/12/15.
 *
 * Lanzar el daemon en desarrollo: pm2 start app.js --no-daemon --watch --log -f
 */
var router = require('./router'),
     express = require('express'),
     swig = require('swig'),
     app = express(),
     customFilters = require('./customFilters').init(swig),
     schedule = require('node-schedule');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

//var j = schedule.scheduleJob('* 1 * * *', function () {
     //require('./cron').init();
//});

router.routes(app);

var server = app.listen(process.env.PORT || 3001, function () {
     var host = server.address().address;
     var port = server.address().port;

     console.log('Example app listening at http://%s:%s', host, port);
});

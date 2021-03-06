/**
 * Dependencies
 */

var express = require('express')
  , http = require('http')
  , socket_io = require('socket.io')
  , stylus = require('stylus')
  , nib = require('nib')
  , fs = require('fs')
  , etc = require('etc')
  , path = require('path')
  , Log = require('log')

/**
 * Paths
 */
var paths = {};
paths.app = path.join(__dirname, 'app');
paths.default_config = path.join(paths.app, 'default_config.json');
paths.user_config = path.join(__dirname, 'config.json');
paths.dist_config = path.join(__dirname, 'config.json-dist');
paths.views = path.join(paths.app, 'views');
paths.public = path.join(paths.app, 'public');
paths.routes = path.join(paths.app, 'routes');
paths.public_css = path.join(paths.public, 'css');
paths.public_js = path.join(paths.public, 'js');
paths.public_img = path.join(paths.public, 'img');
paths.public_img_user = path.join(paths.public_img, 'users');

/**
 * Load and combine configs 
 */
var conf_reader = etc();
conf_reader.all();

if(fs.existsSync(paths.user_config)) {
  conf_reader.file(paths.user_config);
} else {
  console.log("No user config found (%s).\nPlease copy and populate %s to %s",
              paths.user_config, paths.dist_config, paths.user_config);
}
conf_reader.add(require(paths.default_config));
var config = conf_reader.toJSON();

/**
 * Setup Logging
 */
var logStream = null;
if(config.log.file.length) {
  logStream = fs.createWriteStream(config.log.file, { 
    flags: 'w+', 
    encoding: null, 
    mode: 0666 
  });
  
  logStream.addListener('error', function(e) { 
    console.log("Unable to write log to %s (%s)", config.log.file, e.message);
    process.exit(1);
  });
}
log = new Log(config.log.level, logStream);
log.info("Started logging");

/**
 * Build app, setup express
 */
var app = express()
  , server = http.createServer(app)
  , io = socket_io.listen(server);


app.set('views', paths.views)
app.set('view engine', 'jade')
app.use(express.logger())
app.use(express.bodyParser())
app.use(express.cookieParser(config.app.cookie_secret))
app.use(express.cookieSession({ cookie: { maxAge: 60 * 60 * 1000 }}))
app.use(express.methodOverride())
app.use(express.static(paths.public))

app.use(stylus.middleware(
{
  src: paths.public
  , compile: function(str, path) {
    return stylus(str).set('filename', path).use(nib())
  }
}))

/**
 * Error Handling
 */
app.use(function(err, req, res, next){
  log.error(err.stack);
  res.send(500, 'Sad Panda :-(');
});

/**
 * Setup routes
 */
var routes = {
  site: require(path.join(paths.routes, 'site.js'))(config),
  register: require(path.join(paths.routes, 'register.js')),
  meeting: require(path.join(paths.routes, 'meeting.js')),
};

app.get('/', routes.site.index);

/**
 * Setup Sockets
 */
io.set('logger', log)
io.set("log level", config.socket_io.log_level)
io.enable('browser client minification')
io.enable('browser client etag')
io.enable('browser client gzip')

/**
 * Start app
 */
server.listen(config.app.port, config.app.ip);
log.info("Started %s, listening on %s:%d...",
              config.display.name, config.app.ip, config.app.port);
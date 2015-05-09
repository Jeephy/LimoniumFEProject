// ===================================================================
//   “星辰花”项目主程序
//    Limonium Project Main Program
//
//    Version 0.2.0  (Starting Front-End Development)
//
//            Created by Jeephy Ji on 2015/05/09.
// ===================================================================



// ------- 头部模块和全局变量   BEGIN MODULE SCOPE VARIABLES ---------

var express = require( 'express' );
var http = require( 'http' );
var bodyparser = require( 'body-parser' );

var app = express();

// -------------------------------------------------------------------



// ------- handlebars 模板引入和引擎配置 ------------------

var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine( 'handlebars', handlebars.engine );
app.set( 'view engine', 'handlebars' );

// --------------------------------------------------------



// -------- BEGIN SERVER CONFIGURATION --------------


// --------------------------------------------------



// -------- 路由配置   BEGIN ROUTE CONFIGURATION ----------

app.use( express.static( __dirname + '/public') );
app.use( bodyparser() );

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/thank-you', function (req, res) {
    res.render('thankyou');
});

app.get('/newsletter', function(req, res) {
    res.render('newsletter', {csrf: 'CSRF token goes here'});
});

app.post('/process', function(req, res) {
    if (req.xhr || req.accepts('json, html') === 'json') {
        res.send({success: true});
    } else {
        res.redirect(303, '/thank-you');
    }
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

//app.use(function(err, req, res, next) {
//    console.error(err.stack);
//    res.status(500);
//    res.render('500');
//});
// ---------------------------------------------------------



// ----------------- 启动服务器    BEGIN START SERVER -------------------

app.set('port', process.env.PORT || 8080);
http.createServer(app).listen(app.get('port'), function() {
    console.log('dirname : '+__dirname);
    console.log('Express server listening on port :' + app.get('port'));
});

// ---------------------------------------------------------------------
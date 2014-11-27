
var express = require('express');
var consolidate = require('consolidate');

var app = express();
var server = require('http').createServer(app);

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

// all environments
app.engine('html',consolidate.underscore);
app.set('views',__dirname + '/views');
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', example);

app.post('/', function(req, res) {
	console.log('when submiting:', req.body.review);
	demo_text = req.body.review;
	example(req, res);
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost:3000'); 
});

var demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.';
var demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen';
var demo_html = '<html><head><title>Node.js Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>';


function example(req, res) {
	var output = {};
	// console.log('in example:', req);
	//Start the analysis chain
	entities(req, res, output);
}


function entities(req, res, output) {
	alchemyapi.entities('text', demo_text,{ 'sentiment':1 }, function(response) {
		output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
		keywords(req, res, output);
	});
}

function keywords(req, res, output) {
	alchemyapi.keywords('text', demo_text, { 'sentiment':1 }, function(response) {
		output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
		sentiment(req, res, output);
	});
}

function sentiment(req, res, output) {
	alchemyapi.sentiment('text', demo_text, {}, function(response) {
		output['sentiment'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['docSentiment'] };
		res.render('example',output);
	});
}


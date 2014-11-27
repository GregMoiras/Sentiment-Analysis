/**
   Copyright 2014 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
var assert = require('assert');


var test_text = 'Bob broke my heart, and then made up this silly sentence to test the Node.js SDK';  
var test_html = '<html><head><title>The best SDK Test | AlchemyAPI</title></head><body><h1>Hello World!</h1><p>My favorite language is Javascript</p></body></html>';
var test_url = 'http://www.nytimes.com/2013/07/13/us/politics/a-day-of-friction-notable-even-for-a-fractious-congress.html?_r=0';
var test_image = './emaxfpo.jpg';



//start the test sequence
entities();


//Entities
function entities() {
	console.log('Checking entities . . . ');
	alchemyapi.entities('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR'); //invalid flavor
		
		alchemyapi.entities('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.entities('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.entities('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Entity tests complete!\n');
					keywords();
				});
			});
		});
	});
}



//Concepts
function concepts() {
	console.log('Checking concepts . . . ');
	alchemyapi.concepts('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor

		alchemyapi.concepts('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.concepts('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.concepts('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Concept tests complete!\n');
					sentiment();
				});
			});
		});
	});
}



//Sentiment
function sentiment() {
	console.log('Checking sentiment . . . ');
	alchemyapi.sentiment('random', test_text, null, function(response) {
		assert.equal(response['status'],'ERROR');	//invalid flavor

		alchemyapi.sentiment('text', test_text, null, function(response) {
			assert.equal(response['status'],'OK');

			alchemyapi.sentiment('html', test_html, null, function(response) {
				assert.equal(response['status'],'OK');
			
				alchemyapi.sentiment('url', test_url, null, function(response) {
					assert.equal(response['status'],'OK');
					console.log('Sentiment tests complete!\n');
					sentiment_targeted();
				});
			});
		});
	});
}




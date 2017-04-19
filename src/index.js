var Alexa = require('alexa-sdk');
var version = '0.1.5';

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
}

var handlers = {
	'LaunchRequest': function() {
		this.emit(':ask', script['launch']);
	},
	'AboutAppIntent': function() {
		this.emit(':tell', script['about'] )
	},
	'ErrorCodeIntent': function() {
		var translate;
		var say = 'I did not get that...';
		var code = this.event.request.intent.slots.error_code.value;
		if (code) { translate = http_codes[code.toString()]; }
		if (translate) {
			say = 'Hello! A ' + code + ' code translates to, "' + translate + '".';
		} else {
			say = 'Sorry, I do not know what a ' + code + ' error is.';
		}
		this.emit(':tell', say);
	},

	'AMAZON.HelpIntent': function() {
		this.emit(':ask', script['help']);
	},
	'AMAZON.StopIntent': function() {
		this.emit(':tell', script['stop']);
	},
	'AMAZON.CancelIntent': function() {
		this.emit(':tell', script['stop']);
	},
	'SessionEndedRequest': function() {
		this.emit(':tell', script['stop']);
	}
}

var script = {
	'launch': 'Hello, Welcome to H T T P Error Codes. Why don\'t you try asking me a question like, "What is a 200 status?", or "Define a 4 18 error." Go ahead, give it a try',
	'about': 'Hello, Welcome to H T T P Error Codes, version '+ version + '.',
	'help': 'Hi friend. You can ask me things like, "What is a 4 18 error", or "Define a 200 status". Give it a try!',
	'stop': 'Thank you for using H T T P Error Codes. I hope you enjoyed my service. Have a great day!'
}


var http_codes = {
	'100': "Continue",
	'101': "Switching Protocols",
	'102': "Processing",
	'200': "OK",
	'201': "Created",
	'202': "Accepted",
	'203': "Non-authoritative Information",
	'204': "No Content",
	'205': "Reset Content",
	'206': "Partial Content",
	'207': "Multi-Status",
	'208': "Already Reported",
	'226': "IM Used",
	'300': "Multiple Choices",
	'301': "Moved Permanently",
	'302': "Found",
	'303': "See Other",
	'304': "Not Modified",
	'305': "Use Proxy",
	'307': "Temporary Redirect",
	'308': "Permanent Redirect",
	'400': "Bad Request",
	'401': "Unauthorized",
	'402': "Payment Required",
	'403': "Forbidden",
	'404': "Not Found",
	'405': "Method Not Allowed",
	'406': "Not Acceptable",
	'407': "Proxy Authentication Required",
	'408': "Request Timeout",
	'409': "Conflict",
	'410': "Gone",
	'411': "Length Required",
	'412': "Precondition Failed",
	'413': "Payload Too Large",
	'414': "Request-URI Too Long",
	'415': "Unsupported Media Type",
	'416': "Requested Range Not Satisfiable",
	'417': "Expectation Failed",
	'418': "I'm a teapot",
	'421': "Misdirected Request",
	'422': "Unprocessable Entity",
	'423': "Locked",
	'424': "Failed Dependency",
	'426': "Upgrade Required",
	'428': "Precondition Required",
	'429': "Too Many Requests",
	'431': "Request Header Fields Too Large",
	'444': "Connection Closed Without Response",
	'451': "Unavailable For Legal Reasons",
	'499': "Client Closed Request",
	'500': "Internal Server Error",
	'501': "Not Implemented",
	'502': "Bad Gateway",
	'503': "Service Unavailable",
	'504': "Gateway Timeout",
	'505': "HTTP Version Not Supported",
	'506': "Variant Also Negotiates",
	'507': "Insufficient Storage",
	'508': "Loop Detected",
	'510': "Not Extended",
	'511': "Network Authentication Required",
	'599': "Network Connect Timeout Error"
}
var exports = module.exports = {};
var http = require('http');
var request = require('request');
exports.trigger = function(options,fn){
	
	if(!options || typeof(options)!="object"){
		fn(null,"Error: options is not defined or not an object");
		return;
	}
	if(!options.hasOwnProperty("module") || !options.module || typeof(options.module)!="string"){
		fn(null,"Error: options.module is not defined or not a string "+options.module);
		return;
	}
	if(!options.hasOwnProperty("user") || !options.user || typeof(options.user)!="string"){
		fn(null,"Error: options.user is not defined or not a string");
		return;
	}
	if(!options.hasOwnProperty("authorization_bearer") || !options.authorization_bearer || typeof(options.authorization_bearer)!="string"){
		fn(null,"Error: options.authorization_bearer is not defined or not a string");
		return;
	}
	
	if(options.hasOwnProperty("variables") && options.variables && typeof(options.variables)!="object"){
		fn(null,"Error: options.variables must be an object or not defined");
		return;
	}

	var apiUrl = "https://talkbot.io:6446/api/call/module";
	var formData = {
		module: options.module,
		userID: options.user
	};
	if(options.variables){
		formData["variable"] = JSON.stringify(options.variables);	
	}
	var headers = {"Authorization":'Bearer '+options.authorization_bearer};
	
	request.post({
		url: apiUrl,
		formData: formData,
		headers: headers
	}, function optionalCallback(err, httpResponse, body) {
		if (err) {
			fn(null,"Error: something weird happened");
			return;
		}
		
		try
		{
			var response = JSON.parse(body);
			if(response["error"]){
				fn(null,"Error: "+response["error"]);
			} else {
				fn(response,null);
			}
		} catch(e){
			fn(null,"Error: something weird happened");
		}
	});
}
exports.listen = function(options,fn) {
	if(!options || typeof(options)!="object"){
		fn(null,"Error: options is not defined or not an object");
		return;
	}
	if(!options.hasOwnProperty("port") || !options.port || isNaN(options.port)){
		fn(null,"Error: options.port is not defined or not a number");
		return;
	}
	var requestsPort = options.port;
	function handleRequest(request, response){
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Request-Method', '*');
		response.setHeader('Access-Control-Allow-Methods', 'POST');
		response.setHeader('Access-Control-Allow-Headers', '*');
		if(request.method == 'POST'){
			var body = '';
			request.on('data', function (data) {
				body += data;
			});
			request.on('end', function () {
				try
				{
					processResponse(JSON.parse(body));
				} catch(e){
					fn(null,"Error: something weird happened");
				}
			});
			var processResponse = function(data){
				fn(data,null);
			}
		}
	}
	var server = http.createServer(handleRequest);
	server.listen(requestsPort, function(){ });
	server.on('error', function (e) {
	  fn(null,e);
	});
};
var Talkbot = require("./");
var fs = require("fs");

//CALL A MODULE OF YOUR BOT
var options_trigger = {module:"YOUR_MODULE_ID",user:"YOUR_USER_ID",authorization_bearer:"YOUR_AUTH_BEARER_CODE"};
Talkbot.trigger(options_trigger,function(message,error){
	if(error){
		console.log(error);
	}
	if(message){
		console.log(message);
	}
});

//LISTEN YOUR BOT FOR A TRIGGER
var options = {
  key: fs.readFileSync('/path/to/key', 'utf8'),
  ca: fs.readFileSync('/path/to/cert', 'utf8'),
  cert: fs.readFileSync('/path/to/cert', 'utf8')
};
var port = "YOUR_PORT_TO_LISTEN"
var options_listen = {port:port,https:true,server_options:options};
Talkbot.listen(options_listen,function(message,error){
	if(error){
		console.log(error);
	}
	if(message){
		console.log(message);
	}
});
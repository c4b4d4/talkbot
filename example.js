var Talkbot = require("./");

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

//START LISTENING TO RECEIVE CALLS FROM YOUR BOT
var options_listen = {port:"YOUR_PORT_TO_LISTEN"};
Talkbot.listen(options_listen,function(message,error){
	if(error){
		console.log(error);
	}
	if(message){
		console.log(message);
	}
});
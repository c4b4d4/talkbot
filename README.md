# Talkbot

This package lets you communicate with Talkbot's API (https://talkbot.io)

### Installation
Install from terminal
```bash
$ npm install talkbot
```

### Usage

Get your credentials and parameters at https://talkbot.io. Read the docs: https://talkbot.io/docs

##### trigger(options,callback);
Call a module of your bot from your server

```bash
var Talkbot = require("./");
var options_trigger = {module:"YOUR_MODULE_ID",user:"YOUR_USER_ID",authorization_bearer:"YOUR_AUTH_BEARER_CODE"};
Talkbot.trigger(options_trigger,function(message,error){
	if(error){ console.log(error); }
	if(message){
	    //Do something with the data
		console.log(message);
	}
});

```

##### options
* `module` - String: Identifier of the module to be triggered.
* `user` - String: Identifier of the user receive the trigger.
* `authorization_bearer` - String: Secret authorization bearer token of your bot.

##### callback
Two parameters function, *message* and *callback*. You can find under the key *message* the data received from Talkbot's API.

#### listen(options,callback);
Listen for requests of your bot

```bash
var Talkbot = require("./");
var options_listen = {port:"YOUR_PORT_TO_LISTEN"};
Talkbot.listen(options_listen,function(message,error){
	if(error){
		console.log(error);
	}
	if(message){
		console.log(message);
	}
});
```

##### options
* `port` - Number: The port where your server is going to be listening.
* 
##### callback
Two parameters function, *message* and *callback*. You can find under the key *message* the data received from Talkbot's API.

### Todos

 - Send messages directly to users
 - Send broadcasts

License
----
**Free**


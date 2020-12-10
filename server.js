const Discord = require("discord.js");

const botmongus = new Discord.Client();

var idChannel = "YOUR_VOICE_CHANNEL_ID";
var botToken = "YOUR_YOUR_BOT_TOKEN";
var webPort = 8888;
var players = [];
var deadplayers = [];
var now = new Date();
var lastUTC = now.getTime();

botmongus.on('ready', () => {
console.log(`Logged in as ${botmongus.user.tag}!`);
});


botmongus.login(botToken);


var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require("path");
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'www')));

app.post('/endgame',function(req, res){
	if(lastUTC<req.body.utc){
		lastUTC=req.body.utc;
		var voiceChannel = botmongus.channels.cache.get(idChannel);
		deadplayers = [];
		voiceChannel.members.forEach(member  => {
			member.voice.setDeaf(false);
			member.voice.setMute(false);
			
		});
		console.log("New Game");
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}
	
});

app.post('/getplayers',function(req, res){
	if(lastUTC<req.body.utc){
		lastUTC=req.body.utc;
		var voiceChannel = botmongus.channels.cache.get(idChannel);

		console.log("\n----------------------- \n GET PLAYERS REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());

		res.setHeader('Content-Type', 'application/json');

		var i = 0;
		if (!players[0]){
		voiceChannel.members.forEach((values, keys) => {
			if (voiceChannel.members.get(keys).nickname == null){
				players.push(voiceChannel.members.get(keys).user.username);
			}
			else{
				players.push(voiceChannel.members.get(keys).nickname);
			}
		});
		}
		console.log("Players = "+players);
		

		
		res.send(JSON.stringify({
			p1: players[0] || null,
			p2: players[1]  || null,
			p3: players[2] || null,
			p4: players[3]  || null,
			p5: players[4] || null,
			p6: players[5]  || null,
			p7: players[6] || null,
			p8: players[7]  || null,
			p9: players[8] || null,
			p10: players[9]  || null
		}));

	
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}
});

app.post('/dead',function(req, res){
	if(lastUTC<req.body.utc){	
		lastUTC=req.body.utc;
		console.log("\n----------------------- \n DEAD REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());

		var voiceChannel = botmongus.channels.cache.get(idChannel);
		voiceChannel.members.forEach(member  => {
			if(member.nickname==players[req.body.dead] || member.user.username==players[req.body.dead]){
				mute(member);
				if (member.nickname==null){
					console.log(member.user.username+" is dead");
				}
				else{
					console.log(member.nickname+" is dead");
				}
			}
		});

		if(deadplayers.indexOf(players[req.body.dead]) == -1){
			deadplayers.push(players[req.body.dead]);
		}
		console.log("\nDead Players = "+deadplayers);
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}
});

app.post('/revive',function(req, res){
	if(lastUTC<req.body.utc){
		lastUTC=req.body.utc;
		console.log("\n----------------------- \n REVIVE REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());

		var voiceChannel = botmongus.channels.cache.get(idChannel);
		voiceChannel.members.forEach(member  => {
			if(member.nickname==players[req.body.revive] || member.user.username==players[req.body.revive]){
				unmute(member);
				if (member.nickname==null){
					console.log(member.user.username+" is revived");
				}
				else{
					console.log(member.nickname+" is revived");
				}
			}
		});
		if(deadplayers.indexOf(players[req.body.revive]) != -1){
			deadplayers.splice(deadplayers.indexOf(req.body.revive), 1);
		}
		console.log("\nDead Players = "+deadplayers);
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}
});

app.post('/mute',function(req, res){
	if(lastUTC<req.body.utc){
		lastUTC=req.body.utc;
		console.log("\n----------------------- \n MUTE REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());

		var voiceChannel = botmongus.channels.cache.get(idChannel);
		muteAll(voiceChannel);
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}


});

app.post('/unmute',function(req, res){
	if(lastUTC<req.body.utc){
		lastUTC=req.body.utc;
		console.log("\n----------------------- \n UNMUTE REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());

		var voiceChannel = botmongus.channels.cache.get(idChannel);
		unmuteAll(voiceChannel);
	}
	else
	{
		console.log("\n----------------------- \n REJECTED REQUEST");
		console.log("IP "+req.body.sip);
		console.log("Date "+req.body.date.toString());
	}	
});


app.listen(webPort, function () {
  console.log('Server is running. Point your browser to: http://localhost:'+webPort.toString());
});



function muteAll(voiceChannel) {
	voiceChannel.members.forEach(member  => {
		if (member.nickname == null){
			if(deadplayers.indexOf(member.user.username) == -1){
				deaf(member);
				//mute(member);
				//console.log("muted and deafed "+member.user.username)
			}
			else{
				undeaf(member);
				unmute(member);
				//console.log("unmuted and undeafed "+member.user.username)

			}
		}
		else{
			if(deadplayers.indexOf(member.nickname) == -1){
				deaf(member);
				//mute(member);
				//console.log("muted and deafed "+member.nickname)
			}
			else{
				undeaf(member);
				unmute(member);
				//console.log("unmuted and undeafed "+member.nickname)

			}
		}
	});
}


function unmuteAll(voiceChannel) {
	voiceChannel.members.forEach(member  => {
			if (member.nickname == null){
				if(deadplayers.indexOf(member.user.username) == -1){
					//unmute(member);
					undeaf(member);
					//console.log("unmuted and undeafed "+member.user.username)
				}
				else{
					undeaf(member);
					mute(member);
					//console.log("muted and undeafed "+member.user.username)
				}
			}
			else{
				if(deadplayers.indexOf(member.nickname) == -1){
					undeaf(member);
					//unmute(member);
					//console.log("unmuted and undeafed "+member.nickname)
				}
				else{
					undeaf(member);
					mute(member);
					//console.log("muted and undeafed "+member.nickname)
				}
			}
	});

}



function mute(member) {
		member.voice.setMute(true);
		if (member.nickname==null){
			console.log("mute "+member.user.username);
		}
		else{
			console.log("mute "+member.nickname);
		} 
		
}


function deaf(member) {
		member.voice.setDeaf(true); 
		if (member.nickname==null){
			console.log("deaf "+member.user.username);
		}
		else{
			console.log("deaf "+member.nickname);
		}
		
}

function unmute(member) {
		member.voice.setMute(false); 
		if (member.nickname==null){
			console.log("unmute "+member.user.username);
		}
		else{
			console.log("unmute "+member.nickname);
		}
		
}

function undeaf(member) {
		member.voice.setDeaf(false); 
		if (member.nickname==null){
			console.log("undeaf "+member.user.username);
		}
		else{
			console.log("undeaf "+member.nickname);
		}
		
}




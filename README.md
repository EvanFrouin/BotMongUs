# BotMongUs

![alt text](https://github.com/EvanFrouin/BotMongUs/blob/main/botmongus.png)

## Needed


* [Node.Js](https://nodejs.org)
* [A Discord Bot](https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/)

## Instructions

### Setup

* Clone this repository:

````
git clone https://github.com/EvanFrouin/BotMongUs.git
````

* Run this command:

````
npm install
````

* Enter your Discord Bot Token in server.js
* Enter your Voice Channel ID in server.js

* Run this command:

````
npm start
````

* Go to: **http://localhost:8080** if you are on the server
* **OR**
* Go to: **http://YOUR_SERVER_IP:8080** if you are on the server

### During a game

* During the game, dead players can talk to each other and also hear alive players
* During the game, alive players will be deafed so they can't hear anything
* During debate time, dead players will be muted but can hear the debate
* During debate time, alive players will be unmuted and deafed

#### Features:
* **Get Players** will get all the players in your chosen discord voice channel:
* **Mute** will deaf all alive players and unmute all dead players:
* **Unmute** will undeaf all alive players and mute all dead players:
* **End** will unmute and undeaf all players as well as removing their Dead/Alive status
* **Dead Character** will mark this player as dead and mute hime
* **Alive Character** will mark this player as alive and unmute hime

### Warnings !!

* Don't send to much request at once, be gentle !
* Wait for the debate to start to set a player as dead. If done too soon, it could give hints to crewmates !




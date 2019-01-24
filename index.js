const express = require('express');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
client.friend = new Enmap({ provider: new EnmapMongo({
  name: `smashbot`,
  dbName: `smashfriend`,
  url: process.env.mongo
})
})
client.on("ready", () => {
  console.log("Fight!");
  client.user.setPresence({ game: { name: 'wip' }, status: 'online' });
});
client.on("message", (message) => {
  const array = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //code starts here lol
  
});
client.login(process.env.token);

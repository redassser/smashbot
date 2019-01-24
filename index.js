const express = require('express');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = ".";
client.friend = new Enmap({ provider: new EnmapMongo({
  name: `smashfriend`,
  dbName: `smashbot`,
  url: process.env.mongo
})
})
client.on("ready", () => {
  console.log("Fight!");
  client.user.setPresence({ game: { name: 'wip' }, status: 'online' });
});
client.on("message", (message) => {
  const array = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = array.shift();  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //code starts here lol
  
  if (command === "fclist") {
    const array = client.freind.keyArray()
    if (array.length === 0) {message.channel.send("``No friendcodes? ***aaaaaaaaa***``");return}
    message.channel.send("Friend codes are:\n``"+array.join('\n')+"``");
  }
  
});
client.login(process.env.token);

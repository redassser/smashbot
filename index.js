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
  client.user.setPresence({ game: { name: '.smash' }, status: 'online' });
});
client.on("message", (message) => {
  const array = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = array.shift();  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //code starts here lol
  if (command === "smash") {
    message.channel.send("``This is SmashBot for the HCST gaming discord``\nAdd you friendcode with ``.fcadd [name] [fc]``\nSee everyone's friendcode with ``.fclist``");
  }
  if (command === "fclist") {
    const peeps = client.friend.keyArray();
    if (peeps.length === 0) {message.channel.send("``No friendcodes? ***aaaaaaaaa***``");return}
    for (var i = 0; i < peeps.length; i++) {
      peeps[i] = "Added by: "+client.users.get(peeps[i]).username+" | "+client.friend.get(peeps[i]);
    }
    
    console.log(peeps)
    message.channel.send("Friend codes are:\n``"+peeps.join('\n')+"``");
  }
  if (command === "fcadd") {
    if (array.length < 2) {message.channel.send(".fcadd [name] [fc]"); return;}
    var name = array.shift()
    var fc = array.join("-")
    var msg = name+" | "+fc
    client.friend.set(message.author.id,msg)
    message.channel.send(msg+" added by "+name)
  }
  
});
client.login(process.env.token);

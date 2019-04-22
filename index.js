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
    let smashEmbed = new Discord.RichEmbed() 
    .setColor("#3f9cc6")
    .setTitle("This is SmashBot for the HCST gaming discord")
    .setDescription("Use this bot to view friendcodes and share your own!")
    .addField("Add your friendcode to the list with:","``.fcadd [name] [friendcode]``")
    .addField("See everyone else's friendcode with:","``.fclist``")
    message.channel.send(smashEmbed);
  }
  if (command === "fclist") {
    let listEmbed = new Discord.RichEmbed()
    .setTitle("This is a list of friendcodes from people in HT!")
    const peeps = client.friend.keyArray();
    if (peeps.length === 0) {message.channel.send("``No friendcodes? ***aaaaaaaaa***``");return}
    for (var i = 0; i < peeps.length; i++) {
      listEmbed.addField("Added by: "+client.users.get(peeps[i]).username,"client.friend.get(peeps[i])");
    }
    message.channel.send(listEmbed);
  }
  if (command === "fcadd") {
    if (array.length < 2) {message.channel.send(".fcadd [name] [fc]"); return;}
    var name = array.shift()
    var fc = array.join("-")
    var msg = name+" | "+fc
    client.friend.set(message.author.id,msg)
    message.channel.send(msg+" added by "+message.author.username)
  }
  
});
client.login(process.env.token);

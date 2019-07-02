
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
client.online = new Enmap({ provider: new EnmapMongo({
  name: `smashOnline`,
  dbName: `smashbot`,
  url: process.env.mongo1
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
    .addField("Share your stage, mii, replay or video with:","``.idadd [stage/mii/replay/video] [id]``")
    message.channel.send(smashEmbed);
  }
  if (command === "fclist") {
    const peeps = client.friend.keyArray();
    if (isNaN(array[0])) {message.channel.send("``.fclist [page number]``");return;}
    if (((array[0]*5))>(peeps.length+5)) {message.channel.send("``There aren't that many pages``");return;}
    if (!isNaN(array[0])) {
      var x = (array[0]*5)-5;
      var y = ((peeps.length)>(x+5)) ? (x+5) : peeps.length;
    }
    let listEmbed = new Discord.RichEmbed()
    .setTitle("This is a list of friendcodes from people in HT!")
    .setFooter("Page "+array[0])
    if (peeps.length === 0) {message.channel.send("``No friendcodes? ***aaaaaaaaa***``");return}
    for (var i = x; i < y; i++) {
      listEmbed.addField("Added by: "+client.users.get(peeps[i]).username,client.friend.get(peeps[i]));
    }
    message.channel.send(listEmbed);
  }
  if (command === "fcadd") {
    if (array.length < 2) {message.channel.send("``.fcadd [name] [fc]``"); return;}
    var name = array.shift()
    var fc = array.join("-")
    var msg = name+" | "+fc
    client.friend.set(message.author.id,msg)
    message.channel.send(msg+" added by "+message.author.username)
  }
  if (command === "idadd") {
    if (array.length < 3) {message.channel.send("``.idadd [type] [id] [Title]``"); return;}
    var type = array.shift(); var id = array.shift(); var desc = array.join(" ");
    if (type != "stage" || "mii" || "replay" || "video") {message.channel.send("``Please use stage, mii, replay or video``");return;}
    client.online.set(id,[message.author.id,type,desc])
  }
});
client.login(process.env.token);

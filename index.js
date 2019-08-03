
const express = require('express');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
const Discord = require("discord.js");
const client = new Discord.Client();
const fighter = require("./characterNames.json");
client.fighter = fighter;
const fs = require("fs");
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
client.mains = new Enmap({ provider: new EnmapMongo({
  name: `smashmains`,
  dbName: `smashbot`,
  url: process.env.mongo1
})
})
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.on("message", (message) => {
  const array = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = array.shift();  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //code starts here lol
  if (command === "fclist") {
    const peeps = client.friend.keyArray();
    const pages = Math.ceil(peeps.length/5)
    if (isNaN(array[0])) {message.channel.send("``.fclist [page number]``");return;}
    if (((array[0]*5))>(peeps.length+5)) {message.channel.send("``There aren't that many pages``");return;}
    if (!isNaN(array[0])) {
      var x = (array[0]*5)-5;
      var y = ((peeps.length)>(x+5)) ? (x+5) : peeps.length;
    }
    let listEmbed = new Discord.RichEmbed()
    .setTitle("This is a list of friendcodes from people in HT!")
    .setColor("#3f9cc6")
    .setFooter('Page '+array[0]+' of '+pages)
    if (peeps.length === 0) {message.channel.send("``No friendcodes? ***aaaaaaaaa***``");return}
    for (var i = x; i < y; i++) {
      listEmbed.addField("Added by: "+client.users.get(peeps[i]).username,client.friend.get(peeps[i]));
    }
    message.channel.send(listEmbed);
  }
  if (command === "idlist") {
    const ids = client.online.keyArray();
    const pages = Math.ceil(ids/5)
    if (isNaN(array[0])) {message.channel.send("``.idlist [page number]``");return;}
    if (((array[0]*5))>(ids.length+5)) {message.channel.send("``There aren't that many pages``");return;}
    if (!isNaN(array[0])) {
      var x = (array[0]*5)-5;
      var y = ((ids.length)>(x+5)) ? (x+5) : ids.length;
    }
    let listEmbed = new Discord.RichEmbed()
    .setTitle("This is a list of friendcodes from people in HT!")
    .setColor("#3f9cc6")
    .setFooter("Page "+array[0]+" of "+pages)
    if (ids.length === 0) {message.channel.send("``No ids? ***aaaaaaaaa***``");return}
    for (var i = x; i < y; i++) {
      listEmbed.addField("Added by: "+client.online.get(ids[i])[1].username, '${ids[i]}'+ client.online.get(ids[i])[0]);
    }
    message.channel.send(listEmbed);
  }
  if (command === "idadd") {
    if (array.length < 3) {message.channel.send("``.idadd [type] [id] [Title]``"); return;}
    var type = array.shift(); var id = array.shift(); var desc = array.join(" ");
    if (type != "stage" && type != "mii" && type != "replay" && type != "video") {message.channel.send("``Please use stage, mii, replay or video``");return;}
    client.online.set(id,[message.author.id,type,desc])
  }
});
client.login(process.env.token);

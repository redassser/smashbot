
const express = require('express');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
const Discord = require("discord.js");
const client = new Discord.Client();
const fighter = require("./characterNames.json");
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
    .addField("See a numbered list with every fighter using","``.fighters [page 1-"+Math.ceil(Object.keys(fighter).length/15)+"]``")
    .addField("Add your friendcode to the list with:","``.fcadd [name] [friendcode]``")
    .addField("See everyone else's friendcode with:","``.fclist [page 1-"+Math.ceil(client.friend.keyArray().length/5)+"]``")
    .addField("Share your stage, mii, replay or video with:","``.idadd [stage/mii/replay/video] [id] [Title]``")
    message.channel.send(smashEmbed);
  }
  if (command === "fighters") {
    const fighters = Object.keys(fighter)
    if (isNaN(array[0])) {message.channel.send("``.fighters [page number]``");return;}
    if (((array[0]*15))>(fighters.length+15)) {message.channel.send("``There aren't that many pages``");return;}
    const pages = Math.ceil(fighters.length/15)
    if (!isNaN(array[0])) {
      var x = (array[0]*15)-15;
      var y = ((fighters.length)>(x+15)) ? (x+15) : fighters.length;
    }
    let em = new Discord.RichEmbed()
    .setTitle("List of every fighter in Smash!")
    .setFooter('Page '+array[0]+' of '+pages)
    .setDescription("Use the associated numbers to set your characters in ``!setup``\nEchoes are at the end of the pages")
    for (var i = x; i < y; i++) {
      em.addField(fighter[fighters[i]],fighters[i],true);
    }
    message.channel.send(em);
  }
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
    .setFooter('Page '+array[0]+' of '+pages)
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
  if (command === "setup") {
    if (!client.mains.has(message.author.id)) {client.mains.set(message.author.id,{"mains":[],"seconds":[],"pockets":[]})}
    if (array.length < 2) {message.channel.send("``.setup [mains|seconds|pockets] [character number (find in .fighters) to add, or remove if the number is already present]``");return;}
    const v = array.shift();
    switch (v) {
      case "mains":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          if (array[i] in client.mains.get(message.author.id)["mains"] {client.mains.remove(message.author.id,array[i],"mains");return}
          client.mains.push(message.author.id,array[i],"mains")
        }
        message.channel.send("Your mains are "+client.mains.get(message.author.id)["mains"].join(" | '))
        break;
      case "seconds":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          client.mains.push(message.author.id,array[i],"seconds")
        }
        break;
      case "pockets":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          client.mains.push(message.author.id,array[i],"pockets")
        }
        break;
      default:
        message.channel.send("``.setup [mains|seconds|pockets] [character number]``")
        break;
    }
  }
});
client.login(process.env.token);

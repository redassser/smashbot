exports.run = (client,message,array) => {
  const Discord = require("discord.js");
  const fighters = Object.keys(client.fighter)
    if (isNaN(array[0])) {message.channel.send("``.fighters [page number]``");return;}
    if (((array[0]*15))>(fighters.length+15)) {message.channel.send("``There aren't that many pages``");return;}
    const pages = Math.ceil(fighters.length/15)
    if (!isNaN(array[0])) {
      var x = (array[0]*15)-15;
      var y = ((fighters.length)>(x+15)) ? (x+15) : fighters.length;
    }
    let em = new Discord.RichEmbed()
    .setTitle("List of every fighter in Smash!")
    .setURL("https://www.smashbros.com/en_US/fighter/index.html")
    .setFooter('Page '+array[0]+' of '+pages)
    .setColor("#3f9cc6")
    .setDescription("Use the associated numbers to set your characters in ``!setup``\nEchoes are at the end of the pages")
    for (var i = x; i < y; i++) {
      em.addField(fighter[fighters[i]],fighters[i],true);
    }
    message.channel.send(em);
}

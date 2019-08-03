exports.run = (client,message,array) => {
  const Discord = require("discord.js");
  var mention = message.mentions.members.first();	
    if (message.isMentioned(mention)) {mention = mention.user}
    else {mention = message.author}
    if (!client.mains.has(mention.id)){message.channel.send(mention+" probably wants to do .setup");return;}
    console.log(mention, mention.id)
    var arraym = [];var arrays = [];var arrayp = [];
    let arrayall = new Discord.RichEmbed()
    .setTitle("These are the mains, secondaries and pockets for "+mention.username)
    .setColor("#3f9cc6")
    .setFooter("Use .setup to change them")
    for (var i=0;i<client.mains.get(mention.id)["mains"].length;i++) {
      const num = client.mains.get(mention.id)["mains"][i]
      arraym.push(client.fighter[num])
    }
    var mval = client.mains.get(mention.id)["mains"].join(" | ");
    if (arraym.length===0) {mval = ("No Mains")}
    arrayall.addField("Mains: "+arraym.join(", "),mval)	    
    for (var i=0;i<client.mains.get(mention.id)["seconds"].length;i++) {
      const num = client.mains.get(mention.id)["seconds"][i]
      arrays.push(client.fighter[num])
    }
    var sval = client.mains.get(mention.id)["seconds"].join(" | ");
    if (arrays.length===0) {sval = ("No Secondaries")}
    arrayall.addField("Secondaries: "+arrays.join(", "),sval)	    
    for (var i=0;i<client.mains.get(mention.id)["pockets"].length;i++) {
      const num = client.mains.get(mention.id)["pockets"][i]
      arrayp.push(client.fighter[num])
    }
    var pval = client.mains.get(mention.id)["pockets"].join(" | ");
    if (arrayp.length===0) {pval=("No pockets")}
    arrayall.addField("Pockets: "+arrayp.join(", "),pval)	    
    message.channel.send(arrayall)
}

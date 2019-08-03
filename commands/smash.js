exports.run = (client,message,array) => {
  const Discord = require("discord.js");
  let smashEmbed = new Discord.RichEmbed() 
    .setColor("#3f9cc6")
    .setTitle("This is SmashBot for the HCST gaming discord")
    .setDescription("Use this bot to view friendcodes and share your own!")
    .addField("See a numbered list with every fighter using","``.fighters [page 1-"+Math.ceil(Object.keys(fighter).length/15)+"]``")
    .addField("Set up your list of Mains, Secondaries, and Pockets with","``.setup [mains|seconds|pockets] [fighter number]``")
    .addField("Take a look at your (or someone else's!) Mains, Secondaries, and Pockets with","``.mains [optional ping]``")
    .addField("Add your friendcode to the list with:","``.fcadd [name] [friendcode]``")
    .addField("See everyone else's friendcode with:","``.fclist [page 1-"+Math.ceil(client.friend.keyArray().length/5)+"]``")
    .addField("Share your stage, mii, replay or video with:","``.idadd [stage/mii/replay/video] [id] [Title]``")
  message.channel.send(smashEmbed);
}

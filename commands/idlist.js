exports.run = (client,message,array) => {
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

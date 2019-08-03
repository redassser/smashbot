exports.run = (client,message,array) => {
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

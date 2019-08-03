exports.run = (client,message,array) => {
  if (array.length < 2) {message.channel.send("``.fcadd [name] [fc]``"); return;}
    var name = array.shift()
    var fc = array.join("-")
    var msg = name+" | "+fc
    client.friend.set(message.author.id,msg)
    message.channel.send(msg+" added by "+message.author.username)
}

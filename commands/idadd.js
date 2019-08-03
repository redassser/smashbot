exports.run = (client,message,array) => {
  if (array.length < 3) {message.channel.send("``.idadd [type] [id] [Title]``"); return;}
    var type = array.shift(); var id = array.shift(); var desc = array.join(" ");
    if (type != "stage" && type != "mii" && type != "replay" && type != "video") {message.channel.send("``Please use stage, mii, replay or video``");return;}
    client.online.set(id,[message.author.id,type,desc])
}

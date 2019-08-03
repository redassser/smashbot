exports.run = (client,message,arary) => {
  if (!client.mains.has(message.author.id)) {client.mains.set(message.author.id,{"mains":[],"seconds":[],"pockets":[]})}
    if (array.length < 2) {message.channel.send("``.setup [mains|seconds|pockets] [character number (find in .fighters) to add, or remove if the number is already present]``");return;}
    const v = array.shift();
    switch (v) {
      case "mains":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in client.fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          if ((client.mains.get(message.author.id)["mains"]).includes(array[i])) {client.mains.remove(message.author.id,array[i],"mains");}
          else {client.mains.push(message.author.id,array[i],"mains")}
        }
        message.channel.send("Your mains are "+client.mains.get(message.author.id)["mains"].join(" | "))
        break;
      case "seconds":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in client.fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          if ((client.mains.get(message.author.id)["seconds"]).includes(array[i])) {client.mains.remove(message.author.id,array[i],"seconds");}
          else {client.mains.push(message.author.id,array[i],"seconds")}
        }
        message.channel.send("Your secondaries are "+client.mains.get(message.author.id)["seconds"].join(" | "))
        break;
      case "pockets":
        for (var i = 0;i<array.length;i++) {
          if (!(array[i] in client.fighter)) {message.channel.send("``Please use a number corresponding to a fighter!``");return;}
          if ((client.mains.get(message.author.id)["pockets"]).includes(array[i])) {client.mains.remove(message.author.id,array[i],"pockets");}
          else {client.mains.push(message.author.id,array[i],"pockets")}
        }
        message.channel.send("Your pockets are "+client.mains.get(message.author.id)["pockets"].join(" | "))
        break;
      default:
        message.channel.send("``.setup [mains|seconds|pockets] [character number]``")
        break;
    }
}

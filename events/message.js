module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(".") !== 0) return;

  const array = message.content.slice(1).trim().split(/ +/g);
  const command = array.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, array);
};

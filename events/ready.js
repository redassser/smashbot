module.exports = (client,message,aarray) => {
  console.log("Fight!");
  client.user.setPresence({ game: { name: '.smash' }, status: 'online' });
}

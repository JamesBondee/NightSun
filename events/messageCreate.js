module.exports.run = async (client, message) => {


  if (message.author.bot || !message.guild) return;


  if (!message.content.startsWith(client.config.prefix)) return;



  if (!message.member) message.guild.fetchMembers(message);


  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);



 
  const cmd = args.shift().toLowerCase();



  if (cmd.length === 0) return;


  let command = client.commands.get(cmd)



  if (!command) command = client.commands.get(client.aliases.get(cmd))
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.me.voice.channelId;

  if (!command) return

  
    if (command.inVc && !memberChannel) {
      return message.channel.send('Вы должны быть на голосовом канале, чтобы использовать эту команду!')
    }

  if (command.sameVc && player && botChannel !== memberChannel) {

    return message.channel.send('Вы должны быть на том же голосовом канале, что и я!')


  }



  if (command.player && !player) {
    return (`Непроигривается музыка в этой гильдии`)
  }
    if (command.current && !player.currentTrack){
message.channel.send("Сейчас ничего не играет!")}

 
  if (command.args && !args.length) {
    return message.channel.send(`Вы не указали какие либо аргументы!`)
  }
  if (command.owner) {
    if (message.author.id !== "") return;
  }
  if (command) command.run(client, message, args)





}
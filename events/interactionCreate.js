module.exports.run = async (client, interaction) => {


    if (interaction.isCommand()) {
  
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'Что то пошло не так, если проблема не решится в тячения некоторого времени сообщите разработчику!' });
if (!command) return

  const player = client.poru.players.get(interaction.guild.id);
  const memberChannel = interaction.member.voice.channelId;
  const botChannel = interaction.guild.me.voice.channelId;


   
    if (command.inVc && !memberChannel) {
      return interaction.reply('Вы должны быть на голосовом канале, чтобы использовать эту команду!')
    }
  
  if (command.sameVc && player && botChannel !== memberChannel) {

    return interaction.reply('Вы должны быть на том же голосовом канале, что и я!')


  }
  
  if (command.player && !player) {
    return  interaction.reply(`Сейчас ничего непроигрывается!`)
  }
    if (command.current && !player.currentTrack){
interaction.followUp("Сейчас ничего не играет!")
    }



       
        try {

            command.run(client, interaction)

        } catch (e) {

            interaction.reply({ content: e.message });


        }

    }


}
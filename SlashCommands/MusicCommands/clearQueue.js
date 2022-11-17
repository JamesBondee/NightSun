const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "clear",
  description: "Почисть очередь",
  inVc: true,
  sameVc: true,
  player: true,
  
  run: async (client, interaction, args) => {
 
    const memberChannel = interaction.member.voice.channel.id

    const player = client.poru.players.get(interaction.guild.id)

    if(!player.queue.length){
      interaction.reply({ embeds: [{
      color: '#2F3136',
      description: `Очередь пустая`
    }]})
    }
    
    let queueLength = player.queue.length

    player.queue.clear();

    interaction.reply({ embeds: [{
      color: '#2F3136',
      description: `Очищено \`${queueLength}\` из очереди`
    }]})
  }
} 
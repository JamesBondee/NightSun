const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "pause",
  description: "Приостанови песню",
  inVc: true,
  sameVc: true,
  player: true,
  
  run: async (client, interaction, args) => {
    const player = client.poru.players.get(interaction.guild.id);
    if(player.isPaused) {
      return interaction.reply({ embeds: [{
        color: "#2F3136",
        title: 'Песня приостановлена'
      }]
         })
    }
      player.pause(true);
    return interaction.reply({ embeds: [{
        color: "#2F3136",
        title: 'Песня приостановлена теперь'
      }] 
     })

  }} // try it 
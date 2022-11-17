const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "resume",
  description: "Возобнови песню",
  inVc: true,
  sameVc: true,
  player: true,
  
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

    if (!player.isPaused) {
      player.pause(false)
      interaction.reply({ embeds: [{
        color: '#2F3136',
        title: `Песня  возобновлена`
      }]})
    }
    else {
      if (player.isPaused) {
      player.pause(false)
      return interaction.reply({ embeds: [{
        color: '#2F3136',
        title: `Песня возобновлена теперь`
      }]})
    }
    }
    
  }
} // try it 

  
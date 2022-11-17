const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "skip",
  description: "Пропусти песню",
  inVc: true,
  sameVc: true,
  player: true,
  
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
    player.stop()
    interaction.reply( { color: '#2F3136', description: 'Пропущена текущая песня!'});
  }
} 
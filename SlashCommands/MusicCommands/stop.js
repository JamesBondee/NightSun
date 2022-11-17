const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "stop",
  description: "Остановить воспроизведение трека",
  inVc: true,
  sameVc: true,
  player:true,
  run: async (client, interaction, args) => {
  const player = client.poru.players.get(interaction.guild.id);
  player.destroy();
  return interaction.reply({ embeds: [{ color: '#2F3136', description: 'Отключаюсь!'}]})  
  }
}

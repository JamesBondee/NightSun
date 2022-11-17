const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "volume",
  description: "Посмотри или поменяй громкость",
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'громкость',
      description: 'Громкость, которую вы хотите установить',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);

   const volume = interaction.options.getNumber('громкость', true);
   player.setVolume(volume);

   const embed = new MessageEmbed()
     .setColor('#2F3136')
     .setDescription(`Громкость установлена ​​на **${volume}%**.`);

   interaction.reply({
     embeds: [embed],
   });
 },
};
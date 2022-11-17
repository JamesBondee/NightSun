const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "remove",
  description: "Удали песню из очереди",
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: 'трек',
      description: 'Удалить трек из очереди',
      type: ApplicationCommandOptionType.Number,
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
   const track = interaction.options.getNumber('трек');

    if (track > player.queue.length) {
      const embed = new MessageEmbed()
        .setColor('#2F3136')
        .setDescription('Трек не найден');

      return interaction.reply({ embeds: [embed] });
    }

    player.queue.remove(track - 1);

    const embed = new MessageEmbed()
      .setColor('#2F3136')
      .setDescription('Удален трек из очереди');

    return interaction.reply({ embeds: [embed] });
  },
};
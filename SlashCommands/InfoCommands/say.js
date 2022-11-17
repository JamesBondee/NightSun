const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "say",
  description: "Написать сообщения от имени бота",
  options: [
    {
      name: 'текст',
      description: 'Укажите свой текст',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction, args) => {



    interaction.reply({ content: interaction.options.getString("текст")})

  }
}
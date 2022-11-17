const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "avatar",
  description: "Паказывает аватар участника",
  options: [
    {
      name: 'участник',
      description: 'Укажите пользователя',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser('участник')
    const row = new MessageActionRow()
    .addComponents(
       new MessageButton()
    .setLabel(`Посмотреть в браузере`)
    .setStyle("LINK")
    .setURL(`${user.avatarURL({ format: 'png' })}`)
 );
    const embed = new MessageEmbed()
    .setTitle(`Аватар:frame_photo:  ${user.username}`)
    .setColor('#2F3136')
    .setImage(user.displayAvatarURL({
        dynamic: true,
        size: 1024
    }))
    .setTimestamp()
    
    return interaction.reply({
        embeds: [embed], components: [row],
    });
  },
};

const Discord = require("discord.js");
const { developerID, support, bot } = require("../../config.json")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "invite",
  description: "Пригласить бота к себе!",
  
  run: async (client, interaction, args) => {
    let button1 = new MessageButton()
    .setLabel(`Инвайт`)
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=274889493568&scope=bot%20applications.commands`);

    let button2 = new MessageButton()
    .setLabel(`Сервер поддержки`)
    .setStyle("LINK")
    .setURL(`${support}`)
    .setDisabled(true);


 let row = new MessageActionRow()
 .addComponents(button1, button2);



    const embed = new MessageEmbed()
    .setTitle(`Пригласить к вам ${bot}`)
    .setColor('#2F3136')
    .setDescription(`*Выберите кнопку ниже, чтобы перенаправить*`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()

      await interaction.reply({
        embeds: [embed], components: [row],
    });

  },
};
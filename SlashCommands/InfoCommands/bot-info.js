const { MessageEmbed } = require('discord.js');
const { developerID, support, bot } = require("../../config.json")
module.exports = {
  name: 'bot-info',
  description: "Показывает информацию о боте",
  category: 'Info',
  run: async (client, interaction, args) => {
    const message = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: 'Пожалуйста подождите идет сбор данных...',
            iconURL: 'https://cdn.discordapp.com/attachments/1019621865347612723/1031232713472098344/amalie-steiness.gif'
          })
          .setColor('#2F3136')
      ],
      fetchReply: true
    });
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor('#2F3136')
          .setTitle(`Информация о NightShine`)
          .setDescription(`**Простой музыкальный бот со всякими функциями**.
           Обновляется часто для технического обслуживания или добавить новые функции!`)
          .addField('Задержка API:', `${Math.round(client.ws.ping)} мс`)
          .addField('Задержка сообщения:', `${message.createdTimestamp - Date.now()} мс`)
          .addField('Бот запустился:', `<t:${(Date.now() / 1000 - client.uptime / 1000).toFixed(0)}:R>`, false)
          .setFooter({ text: `Разработчик:  James Bond © 2022`, iconURL: `https://cdn.discordapp.com/avatars/577908968458944512/8950992494b6dbd0ff809cea0b7cfadb.webp?size=1024` })
          .setThumbnail(client.user.displayAvatarURL())       
      ]
    });
  }
};
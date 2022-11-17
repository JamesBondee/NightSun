
const discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, player) => {
  let button = new MessageButton()
  .setLabel(`Спасибо что изпользуюте меня!`)
  .setStyle("SECONDARY")
  .setCustomId(`thanks`)
  .setDisabled(true);

  
  const embed = new discord.MessageEmbed()
  .setColor("#2F3136")
  .setTitle('Очередь завершена')
  .setTimestamp()
  let row = new MessageActionRow()
    .addComponents(button);
 
  
  await player.textChannel.send({ embeds: [embed], components: [row]});
  player.destroy();
}
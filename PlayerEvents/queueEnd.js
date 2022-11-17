
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
  .setAuthor('Очередь завершена','https://cdn.discordapp.com/attachments/1018893750522621964/1042806573589868554/record1.gif')
  .setTimestamp()
  let row = new MessageActionRow()
    .addComponents(button);
 
  
  await player.textChannel.send({ embeds: [embed], components: [row]});
  player.destroy();
}
const { MessageEmbed } = require('discord.js')
const { ApplicationCommandOptionType } = require('discord-api-types/v9');

module.exports = {
  name: "loop",
  description: "Установи песню в режим повтора!",
  inVc: true,
  sameVc: true,
  player: true,
  options: [
    {
      name: "повтор",
      description: "Выберите повтор текущего трека или очереди.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "трека",
          value: "track"
        },
        {
          name: "очереди",
          value: "queue"
        },
        {
        name: "выключить",
        value: "off"
        }
      ]
    }
  ],
  run: async (client, interaction, args) => {
   const player = client.poru.players.get(interaction.guild.id);
   const input = interaction.options.getString("повтор");
   
   if (input === "track") {
    player.TrackRepeat();
    interaction.reply( { embeds: [{
      color: '#2F3136',
      description: `Повтор трека включен`
    }]})
   } else if (input === "queue") {
    player.QueueRepeat();
    interaction.reply( { embeds: [{
      color: '#2F3136',
      description: `Повтор очереди включен`
      }]})
   } else if (input === "off") {
      player.DisableRepeat();
      interaction.reply( { embeds: [{
        color: '#2F3136',
        description: `Повтор выключен`
      }]})
    }
  }
} 
